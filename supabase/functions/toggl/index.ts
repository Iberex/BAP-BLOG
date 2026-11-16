// Receives the webhooks of Toggl Track and keeps the tables "timers" and "sessies" in sync.
// Every team member has their own Toggl webhook pointing to .../functions/v1/toggl?wie=Ibe
// (or Tjorven, Senne). The secret of that webhook is stored in the table "toggl_bronnen".
// Deploy with "Verify JWT" switched off: Toggl cannot send a Supabase login.
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const reply = (status: number, body: unknown = { ok: status < 300 }) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Toggl signs the raw body: "sha256=" + hex HMAC-SHA256 with the webhook secret.
async function signed(body: string, header: string | null, secret: string) {
  if (!header) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected =
    "sha256=" +
    [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("");
  const received = header.trim();
  if (received.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++)
    diff |= received.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async request => {
  if (request.method !== "POST") return reply(405);
  const wie = new URL(request.url).searchParams.get("wie");
  const body = await request.text();

  const { data: bron } = await db
    .from("toggl_bronnen")
    .select("geheim, project_id")
    .eq("wie", wie)
    .maybeSingle();
  if (!bron) return reply(404, { error: "onbekende persoon" });
  if (!(await signed(body, request.headers.get("x-webhook-signature-256"), bron.geheim)))
    return reply(401, { error: "handtekening klopt niet" });

  const event = JSON.parse(body);

  // Test event from Toggl. While the webhook is new, it carries a code we must send back.
  if (event.payload === "ping")
    return reply(200, event.validation_code ? { validation_code: event.validation_code } : { ok: true });

  const action = String(event.metadata?.action ?? "");
  const entry = event.payload ?? {};
  const id = Number(entry.id ?? event.metadata?.time_entry_id);
  if (!id) return reply(200, { ok: true, skipped: "geen time entry" });

  const remove = async () => {
    await db.from("timers").delete().eq("toggl_id", id);
    await db.from("sessies").delete().eq("toggl_id", id);
  };

  // Deleted in Toggl, or not (or no longer) in the project "BAP": not BAP work.
  const inProject = !bron.project_id || Number(entry.project_id) === Number(bron.project_id);
  if (action === "deleted" || !inProject || !entry.start) {
    await remove();
    return reply(200);
  }

  const wat = String(entry.description ?? "").slice(0, 200);
  const running = !entry.stop || Number(entry.duration) < 0;

  if (running) {
    await db.from("sessies").delete().eq("toggl_id", id);
    const { error } = await db
      .from("timers")
      .upsert({ wie, sinds: entry.start, wat, toggl_id: id }, { onConflict: "wie" });
    if (error) return reply(500, { error: error.message });
  } else {
    await db.from("timers").delete().eq("toggl_id", id);
    if (Date.parse(entry.stop) <= Date.parse(entry.start)) {
      await remove();
      return reply(200);
    }
    const { error } = await db
      .from("sessies")
      .upsert(
        { wie, van: entry.start, tot: entry.stop, wat, toggl_id: id },
        { onConflict: "toggl_id" }
      );
    if (error) return reply(500, { error: error.message });
  }
  return reply(200);
});

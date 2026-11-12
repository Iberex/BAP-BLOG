// Editor only: reads a post through TinaCMS, so the editor can show unsaved changes.
import { requestWithMetadata } from "@tinacms/astro/data";
import client from "../../tina/__generated__/client";

export const getPost = (file: string) =>
  requestWithMetadata(client.queries.post({ relativePath: `${file}.md` }), {
    priority: "primary",
  });

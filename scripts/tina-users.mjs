// Creates the first TinaCMS logins (content/users/index.json) while Netlify builds
// the editor. The start password comes from the Netlify secret TINA_START_PASSWORD,
// so no password ends up in this public repository. Everyone must choose their own
// password at the first login; Tina keeps users in its database, not in Git.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const FILE = "content/users/index.json";
const password = process.env.TINA_START_PASSWORD;

if (existsSync(FILE)) {
  console.log(`tina-users: ${FILE} already exists`);
} else if (!password) {
  console.log("tina-users: no TINA_START_PASSWORD, no users created");
} else {
  const user = (username, name) => ({
    username,
    name,
    password: { value: password, passwordChangeRequired: true },
  });
  mkdirSync("content/users", { recursive: true });
  writeFileSync(
    FILE,
    JSON.stringify(
      { users: [user("ibe", "Ibe"), user("tjorven", "Tjorven"), user("senne", "Senne")] },
      null,
      2
    )
  );
  console.log("tina-users: created logins ibe, tjorven, senne");
}

// Editor only: reads a post through TinaCMS, so the editor can show unsaved changes.
// databaseClient reads straight from the Tina database (local files or Redis).
import { requestWithMetadata } from "@tinacms/astro/data";
import databaseClient from "../../tina/__generated__/databaseClient";

export const getPost = (file: string) =>
  requestWithMetadata(
    databaseClient.queries.post({ relativePath: `${file}.md` }),
    { priority: "primary" }
  );

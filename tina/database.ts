// TinaCMS database. Locally (npm run cms) it reads the files on disk.
// Online (Netlify) it saves to GitHub and uses Upstash Redis as index/cache.
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import * as upstash from "upstash-redis-level";

// CommonJS package: Vite (editor pages) and esbuild (Netlify function) expose it differently.
const { RedisLevel } = (
  "RedisLevel" in upstash ? upstash : (upstash as { default: typeof upstash }).default
) as typeof upstash;

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const branch = process.env.GITHUB_BRANCH || "main";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner: process.env.GITHUB_OWNER || "Iberex",
        repo: process.env.GITHUB_REPO || "BAP-BLOG",
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
        commitMessage: "Post bijgewerkt via TinaCMS",
      }),
      databaseAdapter: new RedisLevel<string, Record<string, unknown>>({
        redis: {
          url: process.env.KV_REST_API_URL!,
          token: process.env.KV_REST_API_TOKEN!,
        },
        debug: process.env.DEBUG === "true",
      }),
      namespace: branch,
    });

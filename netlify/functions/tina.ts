// TinaCMS backend on Netlify (based on tinacms/tina-self-hosted-static-demo).
// /api/tina/*            content: read, save as a commit on GitHub, log in
// /api/cloudinary/media  uploads (pictures, files) to Cloudinary, logged-in users only
import express from "express";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";
import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";
import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import databaseClient from "../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const authProvider = isLocal
  ? LocalBackendAuthProvider()
  : AuthJsBackendAuthProvider({
      authOptions: TinaAuthJSOptions({
        databaseClient,
        secret: process.env.NEXTAUTH_SECRET!,
      }),
    });

const tinaBackend = TinaNodeBackend({ authProvider, databaseClient });

const mediaHandler = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  authorized: async (req, res) =>
    (await authProvider.isAuthorized(req as never, res as never)).isAuthorized,
});

const app = express();
app.use(cookieParser());

// Uploads read the raw body themselves: before the body parsers below.
app.all("/api/cloudinary/media*", (req, res) => {
  mediaHandler(req as never, res as never);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.all("/api/tina/*", (req, res) => {
  tinaBackend(req, res);
});

export const handler = ServerlessHttp(app);

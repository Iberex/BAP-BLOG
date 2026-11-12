// Editor only (/tina-island/[name]): Tina posts here on every keystroke.
import type { APIRoute } from "astro";
import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import { islands } from "./islands";

export const prerender = false;
export const ALL: APIRoute = experimental_createIslandRoute(islands);

// Editor only: the parts of a page Tina re-renders while you type.
import type { IslandRegistry } from "@tinacms/astro/experimental";
import PostBody from "@components/blokken/PostBody.astro";
import { getPost } from "./data";

export const islands: IslandRegistry = {
  post: {
    fetch: (_request, params) => getPost(params.get("file") ?? ""),
    component: PostBody,
    wrapper: { tag: "div" },
    propsFromData: result => ({
      data: (result as { data?: { post?: unknown } }).data?.post,
    }),
  },
};

import type { CollectionEntry } from "astro:content";

// Only "Nog niet publiceren" hides a post. Pages CMS stores the local time with a
// "Z" (UTC) suffix, so a time-based filter would hide fresh posts for an hour.
const postFilter = ({ data }: CollectionEntry<"blog">) => !data.draft;

export default postFilter;

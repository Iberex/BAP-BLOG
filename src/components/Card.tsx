import { LOCALE } from "@config";
import { slugifyStr } from "@utils/slugify";
import { pijlerLabel } from "@utils/pijlers";
import { fragments } from "@utils/fragments";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

// One compact row: date, title, pillars and type. No excerpt, so a list stays easy to scan.
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, pijlers, soort, author } = frontmatter;
  const Heading = secHeading ? "h2" : "h3";
  const date = new Date(pubDatetime);
  const found = fragments(frontmatter);
  const tagged = found.flatMap(f => f.tags);

  return (
    <li
      className="post-row border-b border-skin-line last:border-b-0"
      data-pijlers={[...pijlers.map(p => slugifyStr(p)), ...tagged].join(" ")}
      data-soort={[soort ? slugifyStr(soort) : "", ...tagged].join(" ")}
    >
      <a
        href={href}
        className="group grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-3 sm:grid-cols-[4.5rem_1fr_auto]"
      >
        <time
          dateTime={date.toISOString()}
          className="text-sm tabular-nums opacity-60"
        >
          {date.toLocaleDateString(LOCALE.langTag, {
            day: "numeric",
            month: "short",
          })}
        </time>
        <Heading className="font-medium group-hover:underline group-hover:underline-offset-4">
          {title}
          {author && (
            <span className="ml-2 text-sm font-normal opacity-50">
              {author}
            </span>
          )}
        </Heading>
        <span className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-3 sm:justify-end">
          {pijlers.map(p => (
            <span key={p} className={`pill pill-${slugifyStr(p)}`}>
              {pijlerLabel(p)}
            </span>
          ))}
          {soort && <span className="pill pill-soort">{soort}</span>}
        </span>
      </a>
      {/* Tagged paragraphs ("#dev"), shown by the filter on the posts page. */}
      {found.map(fragment => (
        <a
          key={fragment.id}
          href={`${href}#${fragment.id}`}
          className="fragment mb-3 ml-[5.5rem] hidden border-l-2 border-skin-line pl-3 text-sm opacity-70 hover:opacity-100"
          data-tags={fragment.tags.join(" ")}
        >
          <span className="font-medium">{fragment.label}</span>{" "}
          <span className="line-clamp-2">{fragment.text}</span>
        </a>
      ))}
    </li>
  );
}

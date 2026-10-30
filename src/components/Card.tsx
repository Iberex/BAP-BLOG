import { LOCALE } from "@config";
import { slugifyStr } from "@utils/slugify";
import { pijlerLabel } from "@utils/pijlers";
import { SOORTEN } from "@utils/soorten";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

// One compact row: date, title, pillars and type. No excerpt, so a list stays easy to scan.
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const {
    title,
    pubDatetime,
    pijlers,
    soort,
    author,
    fragments,
    onderwerpen,
    beelden,
  } = frontmatter;
  const Heading = secHeading ? "h2" : "h3";
  const date = new Date(pubDatetime);

  return (
    <li
      className="post-row border-b border-skin-line last:border-b-0"
      data-pijlers={onderwerpen.join(" ")}
      data-soort={soort ? slugifyStr(soort) : ""}
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
        <Heading className="flex items-center gap-3 font-medium group-hover:underline group-hover:underline-offset-4">
          {beelden[0] && (
            <img
              src={beelden[0].src!}
              alt=""
              loading="lazy"
              className="h-9 w-12 shrink-0 rounded border border-skin-line object-cover"
            />
          )}
          <span>
            {title}
            {author && (
              <span className="ml-2 text-sm font-normal opacity-50">
                {author}
              </span>
            )}
          </span>
        </Heading>
        <span className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-3 sm:justify-end">
          {soort && (
            <span className={`type soort-${slugifyStr(soort)}`}>
              {SOORTEN[soort]?.label ?? soort}
            </span>
          )}
          {pijlers.map(p => (
            <span key={p} className={`pill pill-${slugifyStr(p)}`}>
              {pijlerLabel(p)}
            </span>
          ))}
        </span>
      </a>
      {/* Paragraphs about the active pillar, shown by the filter on the posts page. */}
      {fragments.map(fragment => (
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

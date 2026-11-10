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

export default function Card({ href, frontmatter }: Props) {
  const {
    title,
    pubDatetime,
    soort,
    onderwerpen,
    beelden,
    fragments,
    samenvatting,
    author,
  } = frontmatter;
  const date = new Date(pubDatetime);

  return (
    <li
      className="post-row card"
      data-pijlers={onderwerpen.join(" ")}
      data-soort={soort ? slugifyStr(soort) : ""}
    >
      <a href={href} className="card__link">
        {beelden[0] ? (
          <img src={beelden[0].src!} alt="" loading="lazy" />
        ) : (
          <span className="card__blank" />
        )}
        <p className="card__date">
          {soort && (
            <span className="card__soort">
              {SOORTEN[soort]?.label ?? soort}
            </span>
          )}
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString(LOCALE.langTag, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          {author && <span>{author}</span>}
        </p>
        <h4 className="card__title">{title}</h4>
        <p className="card__text">{samenvatting}</p>
      </a>
      {(fragments.length > 0 || samenvatting) && (
        <div className="card__fragments" hidden>
          <p className="card__fragments-head" />
          {samenvatting && (
            <a href={href} className="fragment card__summary" hidden>
              <span className="fragment__text">{samenvatting}</span>
            </a>
          )}
          {fragments.map(fragment => (
            <a
              key={fragment.id}
              href={`${href}#${fragment.id}`}
              className="fragment"
              data-tags={fragment.tags.join(" ")}
              hidden
            >
              <span className="fragment__label">
                {fragment.label}
                {fragment.tags.map(tag => (
                  <span key={tag} className={`fragment__tag pill-${tag}`}>
                    {pijlerLabel(tag)}
                  </span>
                ))}
              </span>
              <span className="fragment__text">{fragment.text}</span>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

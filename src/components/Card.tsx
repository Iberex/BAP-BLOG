import { LOCALE } from "@config";
import { slugifyStr } from "@utils/slugify";
import { pijlerLabel } from "@utils/pijlers";
import { SOORTEN } from "@utils/soorten";
import { iconSvg, pijlerIconSvg } from "@utils/icons";
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
    soorten,
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
      data-soort={soorten.map(s => slugifyStr(s)).join(" ")}
    >
      <a href={href} className="card__link">
        {beelden[0] ? (
          <img src={beelden[0].src!} alt="" loading="lazy" />
        ) : (
          // No image: a faint scribble on paper, turned differently per post.
          <span className="card__blank">
            <span
              className="card__scribble"
              style={{
                maskImage: `url(${import.meta.env.BASE_URL}krabbel.png)`,
                WebkitMaskImage: `url(${import.meta.env.BASE_URL}krabbel.png)`,
                transform: `rotate(${[...title].reduce((n, c) => n + c.charCodeAt(0), 0) % 360}deg)`,
              }}
            />
          </span>
        )}
        <p className="card__tags">
          {soorten.map(soort => (
            <span className="tag" key={soort}>
              <span
                className="tag-icon"
                dangerouslySetInnerHTML={{ __html: iconSvg("tag") }}
              />
              {SOORTEN[soort]?.label ?? soort}
            </span>
          ))}
        </p>
        <h4 className="card__title">{title}</h4>
        <p className="card__text">{samenvatting}</p>
        <p className="card__date">
          {author && (
            <span className="post-author">
              {["Ibe", "Tjorven", "Senne"].includes(author) && (
                <img
                  src={`${import.meta.env.BASE_URL}team/${author.toLowerCase()}.jpg`}
                  alt=""
                  className="post-avatar"
                />
              )}
              {author}
            </span>
          )}
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString(LOCALE.langTag, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </p>
      </a>
      {(fragments.length > 0 || samenvatting) && (
        <div className="card__fragments" hidden>
          <p className="card__fragments-head" />
          {samenvatting && (
            <a href={href} className="fragment card__summary" hidden>
              <span className="fragment__text">{samenvatting}</span>
            </a>
          )}
          {fragments.map((fragment, i) => (
            <a
              key={`${fragment.id}-${i}`}
              href={`${href}#${fragment.id}`}
              className="fragment"
              data-tags={fragment.tags.join(" ")}
              hidden
            >
              <span className="fragment__label">
                {fragment.label}
                {fragment.tags.map(tag => (
                  <span key={tag} className="fragment__tag">
                    <span
                      className="tag-icon"
                      dangerouslySetInnerHTML={{ __html: pijlerIconSvg(tag) }}
                    />
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

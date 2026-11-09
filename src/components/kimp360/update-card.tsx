import { ArrowRight, CalendarDays, Lightbulb, RefreshCw } from "lucide-react";
import Image from "next/image";

import type { PostCard } from "@/lib/wp/queries";

import "./kimp360.css";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** WordPress returns dates without a zone; they are the site's local time, shown as-is (like live). */
export const formatPostDate = (date: string) => dateFmt.format(new Date(`${date}Z`));

/**
 * One KIMP360 update (a WordPress post): square featured image, date, title
 * (plain text, not a heading, as on live) and "Learn More". Used by the
 * /kimp360-platform/ "latest updates" row and the /kimp360-product-updates/ list.
 */
export function UpdateCard({
  post,
  more,
  latest = false,
  tag,
  priority = false,
}: {
  post: PostCard;
  more: string;
  /** Pulsing "Latest" badge on the newest post. */
  latest?: boolean;
  /** Live tag badge ("Update" / "Pro Tip"). */
  tag?: string;
  priority?: boolean;
}) {
  const TagIcon = tag === "Pro Tip" ? Lightbulb : RefreshCw;
  return (
    <a
      href={post.link}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-2 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(15_118_110/0.4)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-surface">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            priority={priority}
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {(latest || tag) && (
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            {latest ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
                <span className="k360-live size-2 rounded-full bg-brand" /> Latest
              </span>
            ) : (
              <span />
            )}
            {tag && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-brand px-3 py-1 text-xs font-bold text-white shadow-sm">
                <TagIcon className="size-3.5" aria-hidden="true" />
                {tag}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pt-5 pb-5">
        <time dateTime={post.date} className="flex items-center gap-1.5 text-sm font-semibold text-ink/45">
          <CalendarDays className="size-4" aria-hidden="true" />
          {formatPostDate(post.date)}
        </time>
        <p className="mt-2 flex-1 text-lg leading-snug font-bold break-words text-ink">{post.title}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-bold text-brand">
          {more}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

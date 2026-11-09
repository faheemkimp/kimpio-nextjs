import { BLOG } from "@/content/home-sections";
import { getLatestBlogPosts, type BlogPostCard } from "@/lib/wp/queries";

import { BlogCarousel } from "./blog-carousel";
import { SectionHeading } from "./section-heading";

/**
 * Latest posts from the kimp.io WordPress blog: heading and controls on the
 * left, a carousel bleeding off the right edge. Fetched at render (cached,
 * revalidated on publish); if WordPress is unreachable only the heading and
 * the "Visit the blog" link remain.
 */
export async function BlogSection() {
  let posts: BlogPostCard[] = [];
  try {
    posts = await getLatestBlogPosts(BLOG.count, BLOG.excludeCategories);
  } catch (err) {
    console.error("[home] latest blog posts unavailable", err);
  }
  return (
    <section aria-labelledby="blog-title" className="relative isolate overflow-hidden py-20 sm:py-24">
      <BlogCarousel
        posts={posts}
        more={BLOG.more}
        cta={BLOG.cta}
        header={
          <SectionHeading
            id="blog-title"
            eyebrow={BLOG.eyebrow}
            title={BLOG.title}
            intro={BLOG.intro}
            align="left"
            titleClassName="sm:text-[2.6rem] lg:text-[2.75rem]"
          />
        }
      />
    </section>
  );
}

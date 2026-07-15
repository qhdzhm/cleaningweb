import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Cleaning Advice for Hobart Homes & Businesses | NaturePure",
  description:
    "Straight answers on cleaning in Hobart — what it costs, what a bond clean actually involves, and how to get a better result.",
  alternates: { canonical: "https://naturepurecleaning.com.au/blog" },
  openGraph: {
    title: "Cleaning Advice for Hobart Homes & Businesses",
    description: "Straight answers on cleaning in Hobart — what it costs and what's actually involved.",
    url: "https://naturepurecleaning.com.au/blog",
    type: "website",
  },
};

const DATE_FMT = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default function BlogIndex() {
  const posts = allPosts();

  return (
    <section className="blog-index">
      <div className="container">
        <div className="eyebrow">Advice</div>
        <h1 className="section-title">Cleaning advice for Hobart</h1>
        <p className="blog-intro">
          No fluff and no sales pitch — just the things people actually ask us before they book.
        </p>

        <div className="post-list">
          {posts.map((post) => (
            <article className="post-card" key={post.slug}>
              <div className="post-meta">
                <time dateTime={post.date}>{DATE_FMT.format(new Date(post.date))}</time>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

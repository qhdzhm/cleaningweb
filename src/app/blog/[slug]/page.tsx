import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/components/PostBody";
import { allPosts, getPost } from "@/lib/posts";

const SITE = "https://naturepurecleaning.com.au";
const DATE_FMT = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" });

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE}/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.description },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "NaturePure Cleaning", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "NaturePure Cleaning",
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` },
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Advice", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <article className="post">
        <div className="container post-inner">
          <nav className="post-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Advice</Link>
          </nav>

          <h1>{post.title}</h1>
          <div className="post-meta">
            <time dateTime={post.date}>{DATE_FMT.format(new Date(post.date))}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <div className="post-body">
            <PostBody blocks={post.body} />
          </div>

          <Link className="text-link post-back" href="/blog">
            ← All advice
          </Link>
        </div>
      </article>
    </>
  );
}

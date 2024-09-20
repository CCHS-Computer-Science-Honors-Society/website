import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";
import { getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const DATA = {
  url:
    env.NODE_ENV == "production"
      ? "https://creekcshs.org/"
      : "http://localhost:3000",
};

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://creekcshs.org/posts/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="overflow-hidden bg-white shadow-xl dark:bg-gray-800">
          <CardContent className="p-8">
            <section id="blog">
              <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.metadata.title,
                    datePublished: post.metadata.publishedAt,
                    dateModified: post.metadata.publishedAt,
                    description: post.metadata.summary,
                    image: post.metadata.image
                      ? `${DATA.url}${post.metadata.image}`
                      : `${DATA.url}/og?title=${post.metadata.title}`,
                    url: `${DATA.url}/blog/${post.slug}`,
                    author: {
                      "@type": "Person",
                      name: "CSHS ",
                    },
                  }),
                }}
              />
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {post.metadata.title}
              </h1>
              <div className="mb-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <Suspense fallback={<p className="h-5" />}>
                  <p className="font-medium">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </Suspense>
              </div>
              <Separator className="my-8" />
              <article
                className="prose dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none"
                dangerouslySetInnerHTML={{ __html: post.source }}
              ></article>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <section>
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <div key={post.slug}>
              <Link
                className="mb-4 flex flex-col space-y-1"
                href={`/post/${post.slug}`}
              >
                <div className="flex w-full flex-col">
                  <p className="tracking-tight">{post.metadata.title}</p>
                  <p className="h-6 text-xs text-muted-foreground">
                    {post.metadata.publishedAt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </section>
    </div>
  );
}

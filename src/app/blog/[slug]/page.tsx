'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
import { blogPosts } from '@/data/blog';

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen pb-20 pt-32 md:pt-40">
        <div className="mx-auto max-w-[650px] px-6 text-center">
          <h1 className="mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent hover:underline">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 pt-32 md:pt-40">
      <article className="mx-auto max-w-[650px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to blog
          </Link>

          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-muted">{post.date}</span>
              <span className="text-sm text-muted">·</span>
              <span className="text-sm text-muted">{post.readTime}</span>
            </div>
            <h1 className="mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bubble px-3 py-1 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert">
            <p className="lead">{post.excerpt}</p>
            <p>
              This is a placeholder for the full blog post content. In a real
              implementation, you would fetch the content from a CMS, markdown
              files, or a database.
            </p>
            <h2>Getting Started</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <h2>Key Takeaways</h2>
            <ul>
              <li>First important point about the topic</li>
              <li>Second insight that readers should remember</li>
              <li>Third actionable tip they can apply</li>
            </ul>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>
        </motion.div>
      </article>
    </main>
  );
}

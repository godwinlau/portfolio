'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { blogPosts } from '@/data/blog';

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl bg-bubble p-6 transition-all hover:bg-bubble/80"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs text-muted">{post.date}</span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{post.readTime}</span>
            </div>
            <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-accent md:text-2xl">
              {post.title}
            </h2>
            <p className="text-base text-muted">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg transition-transform group-hover:translate-x-1">
            <ArrowRight size={18} weight="bold" className="text-muted" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pb-20 pt-32 md:pt-40">
      <div className="mx-auto max-w-[650px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4">Blog</h1>
          <p className="text-lg text-muted">
            Thoughts on design, development, and building products.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

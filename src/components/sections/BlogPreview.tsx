'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { SectionHeader } from '@/components/ui';
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
        className="group block rounded-2xl bg-bubble p-5 transition-all hover:bg-bubble/80"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-xs text-muted">{post.date}</span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{post.readTime}</span>
            </div>
            <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="text-sm text-muted line-clamp-2">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg px-2 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg transition-transform group-hover:translate-x-1">
            <ArrowRight size={16} weight="bold" className="text-muted" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogPreview() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[650px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >
          <SectionHeader
            title="Latest thoughts"
            subtitle="Writing about design, code, and everything in between."
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            View all posts
            <ArrowRight size={16} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

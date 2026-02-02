'use client';

import { motion } from 'framer-motion';

export function About() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[650px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-6 block text-xs font-medium uppercase tracking-widest text-muted">
            About
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[640px] space-y-5"
        >
          <p className="text-lg">
            Product engineer based in the Philippines, working remotely with
            teams worldwide.
          </p>
          <p className="text-base text-muted">
            I specialize in taking products from concept to production —
            handling both design and frontend development. This means faster
            iteration, fewer handoff issues, and interfaces that actually match
            the vision.
          </p>
          <p className="text-base text-muted">
            My background spans MVP design, UX engineering, and Shopify theme
            development. I'm most useful when speed and quality both matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

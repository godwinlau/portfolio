'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { skillCategories } from '@/data/skills';

export function StackGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[650px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="I've got your back with..."
            subtitle="Products that look great and actually work — design to code."
          />
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <div key={category.title}>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
                {category.title}
              </p>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-1">
                {category.items.map((skill) => (
                  <li
                    key={skill}
                    className="border-b-dashed pb-3 text-base"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { SectionHeader, ProjectRow } from '@/components/ui';
import { projects } from '@/data/projects';

export function CaseStudies() {
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
            title="A closer look"
            subtitle="Products I've taken from concept to production — design and code, one workflow."
          />
        </motion.div>

        {/* Project list */}
        <div className="border-t border-border">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectRow project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

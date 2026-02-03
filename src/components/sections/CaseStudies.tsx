'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui';
import { projects } from '@/data/projects';

function ProjectBento({ project, index }: { project: typeof projects[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Link href={project.link} className="block">
        <div className={`grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 ${isEven ? '' : 'md:direction-rtl'}`}>
          {/* Large box - main image */}
          <div className={`md:col-span-2 ${!isEven ? 'md:order-2' : ''}`}>
            <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-bubble p-6 md:h-[440px]">
              <div className="relative rotate-2 transition-transform duration-300 hover:scale-105">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={350}
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Right column - two stacked boxes */}
          <div className={`flex flex-col gap-3 md:col-span-1 md:gap-4 ${!isEven ? 'md:order-1' : ''}`}>
            {/* Top box - project info */}
            <div className="flex flex-1 flex-col justify-start rounded-2xl bg-bubble p-5 transition-all group-hover:bg-bubble/80">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">{project.number}</span>
              <h3 className="mt-2 text-xl font-bold md:text-2xl">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
            </div>

            {/* Bottom box - tags */}
            <div className="flex flex-col justify-center rounded-2xl bg-bubble p-5 transition-all group-hover:bg-bubble/80">
              <span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-bg px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CaseStudies() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1024px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SectionHeader
            title="A closer look"
            subtitle="Products I've taken from concept to production — design and code, one workflow."
          />
        </motion.div>

        {/* Project bentos */}
        <div className="flex flex-col gap-8 md:gap-12">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectBento key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

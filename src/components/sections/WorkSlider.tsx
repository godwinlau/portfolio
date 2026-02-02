'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, ProjectCard } from '@/components/ui';
import { projects } from '@/data/projects';

export function WorkSlider() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1024px] px-6">
        <SectionHeader title="A few things I've built" showIcon variant="label" />
      </div>

      {/* Marquee container */}
      <div
        className="relative mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient masks for smooth edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-bg to-transparent md:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-bg to-transparent md:w-32" />

        {/* Scrolling track */}
        <div
          className="flex gap-4 md:gap-6 w-fit animate-marquee"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              className="shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover hint */}
      <p className="mt-6 text-center text-xs text-muted opacity-60">
        Hover to pause
      </p>
    </section>
  );
}

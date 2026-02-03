'use client';

import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui';

export function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[900px] px-6">
        {/* Section 1: Photos left, text right */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Photo collage - 2 polaroids */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center -space-x-6 md:-space-x-8"
          >
            <Polaroid
              src="/godwin/Linkedin New Profile.jpeg"
              alt="Godwin"
              rotate="-rotate-3"
              label="that's me 👋"
              scribble="circle"
              scribblePosition="top-left"
            />
            <Polaroid
              src="/godwin/IMG_3025.jpeg"
              alt="Work"
              rotate="rotate-3"
              label="building stuff"
              scribble="star"
              scribblePosition="top-right"
              objectPosition="bottom"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              About
            </span>
            <p className="text-lg leading-relaxed">
              Product engineer based in the Philippines, working remotely with
              teams worldwide.
            </p>
            <p className="text-base leading-relaxed text-muted">
              When I'm not building products, you'll find me exploring coffee shops,
              gaming, or diving into random YouTube rabbit holes. I believe great
              work comes from staying curious and having fun along the way.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-dashed border-border md:my-16" />

        {/* Section 2: Text left, photos right */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 space-y-4 md:order-1"
          >
            <p className="text-lg leading-relaxed">
              I'm passionate about crafting experiences that feel intuitive and
              look beautiful — bridging design and code in one workflow.
            </p>
            <p className="text-base leading-relaxed text-muted">
              My background spans MVP design, UX engineering, and Shopify theme
              development. I'm most useful when speed and quality both matter.
            </p>
          </motion.div>

          {/* Polaroid photos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 flex items-center justify-center -space-x-6 md:order-2 md:-space-x-8"
          >
            <Polaroid
              src="/projects/image copy.png"
              alt="Snapshot"
              rotate="rotate-2"
              label="side projects"
              scribble="arrow"
              scribblePosition="top-left"
            />
            <Polaroid
              src="/projects/image.png"
              alt="Snapshot"
              rotate="-rotate-3"
              label="explorations"
              scribble="underline"
              scribblePosition="bottom-right"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

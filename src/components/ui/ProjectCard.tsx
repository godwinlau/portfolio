'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const cardClasses = cn(
    'group relative block h-[200px] md:h-[500px] w-auto shrink-0 overflow-hidden rounded-xl shadow-sm',
    project.link && 'cursor-pointer',
    className
  );

  const cardContent = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </>
  );

  if (project.link) {
    return (
      <Link
        href={project.link}
        className={cardClasses}
        {...(project.isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
}

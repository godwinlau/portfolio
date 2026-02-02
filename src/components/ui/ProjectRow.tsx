'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ArrowUpRight } from '@/components/icons';
import { Tag } from './Tag';
import type { Project } from '@/types';

interface ProjectRowProps {
  project: Project;
  className?: string;
}

export function ProjectRow({ project, className }: ProjectRowProps) {
  const rowClasses = cn(
    'group flex flex-col gap-3 border-b border-border py-6 transition-colors md:flex-row md:items-start md:gap-6',
    project.link && 'cursor-pointer',
    className
  );

  const rowContent = (
    <>
      {/* Number */}
      <span className="shrink-0 font-mono text-xs text-muted">
        {project.number}
      </span>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-xl font-medium transition-colors group-hover:text-accent md:text-2xl">
          {project.title}
        </h3>
        <p className="max-w-lg text-sm text-muted">{project.description}</p>

        {/* Tags - visible on mobile below description */}
        <div className="mt-2 flex flex-wrap gap-2 md:hidden">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      {/* Tags - hidden on mobile */}
      <div className="hidden shrink-0 flex-wrap gap-2 md:flex">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Arrow */}
      {project.link && (
        <ArrowUpRight className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      )}
    </>
  );

  if (project.link) {
    return (
      <Link
        href={project.link}
        className={rowClasses}
        {...(project.isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {rowContent}
      </Link>
    );
  }

  return <div className={rowClasses}>{rowContent}</div>;
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { ArrowUpRight } from '@/components/icons';
import { Tag } from '@/components/ui';
import { projects } from '@/data/projects';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Godwin Laureto`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1024px] px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowUpRight className="rotate-[-135deg]" size={14} />
          Back to home
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <span className="mb-2 block font-mono text-xs text-muted">
            {project.number}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Placeholder for case study content */}
        <div className="rounded-2xl border border-border bg-bubble p-8 text-center">
          <p className="text-muted">
            Case study content coming soon. Add your project details,
            screenshots, and process documentation here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

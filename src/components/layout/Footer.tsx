import Link from 'next/link';
import { socialLinks, email } from '@/data/socials';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-[1024px] px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Left side - CTA */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted">
              Open to remote roles and select projects.
            </p>
            <a
              href={`mailto:${email}`}
              className="font-serif text-2xl transition-colors hover:text-accent md:text-3xl"
            >
              {email}
            </a>
          </div>

          {/* Right side - Social links */}
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.name}
                </Link>
                {index < socialLinks.length - 1 && (
                  <span className="ml-4 text-muted">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-12 text-xs text-muted opacity-50">
          © {currentYear} Godwin Laureto
        </p>
      </div>
    </footer>
  );
}

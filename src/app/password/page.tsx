'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Incorrect password');
        setPassword('');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bubble border border-border text-small text-muted mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Under Construction
          </div>
          <h1 className="text-h3 font-bold mb-2">Welcome</h1>
          <p className="text-muted text-body">
            This site is currently under development. Enter the password to preview.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-bubble border border-border text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-small text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full px-4 py-3 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Checking...' : 'Enter Site'}
          </button>
        </form>

        <p className="text-xs text-muted text-center mt-8">
          Need access? Contact me for the password.
        </p>
      </div>
    </div>
  );
}

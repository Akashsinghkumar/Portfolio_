"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, CheckCircle, Key } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [notRegistered, setNotRegistered] = useState(false);

  // Check query params for success notification
  useEffect(() => {
    if (searchParams.get('registered') === 'success') {
      const timer = setTimeout(() => {
        setSuccessMsg('Registration successful! Please sign in with your credentials.');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    if (requires2FA && !code.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          code: requires2FA ? code : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.requires2FA) {
          setRequires2FA(true);
        } else {
          // Redirect to dashboard
          router.push('/admin');
          router.refresh();
        }
      } else {
        const data = await response.json();
        if (response.status === 404 && data.requiresRegistration) {
          setNotRegistered(true);
          setError(data.error || 'Admin account not registered.');
        } else {
          setError(data.error || 'Invalid credentials. Please try again.');
        }
      }
    } catch {
      setError('An error occurred during sign-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Alert */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-green-950/20 border border-green-500/30 text-green-400 text-xs md:text-sm rounded-xl flex items-start gap-2.5"
        >
          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-red-950/20 border border-red-500/30 text-red-400 text-xs md:text-sm rounded-xl flex items-start gap-2.5 flex-col"
        >
          <div className="flex items-start gap-2.5 w-full">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
          {notRegistered && (
            <a
              href="/admin/register"
              className="mt-3 inline-flex justify-center w-full text-center text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 text-absolute-dark py-2.5 rounded-lg transition-colors"
            >
              CREATE ADMIN ACCOUNT
            </a>
          )}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {!requires2FA ? (
            <motion.div
              key="password-step"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Username Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3.5 rounded-xl text-xs md:text-sm text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3.5 rounded-xl text-xs md:text-sm text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-absolute-dark px-6 py-4 rounded-xl transition-all duration-300 w-full cursor-pointer disabled:cursor-not-allowed mt-4 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20"
              >
                {isSubmitting ? "CHECKING CREDENTIALS..." : "NEXT STEP"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="2fa-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-1.5 text-gold-500 justify-center mb-2">
                  <Key className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">2FA Authorization Required</span>
                </div>
                <p className="text-center text-xs text-text-secondary leading-relaxed mb-4">
                  Enter the 6-digit verification code from your authenticator app.
                </p>
                
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-dark-card border border-dark-border px-4 py-3.5 rounded-xl text-center text-sm font-bold tracking-widest text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRequires2FA(false);
                    setCode('');
                  }}
                  className="flex-1 text-xs font-bold tracking-widest border border-dark-border text-dark-muted py-4 rounded-xl hover:border-text-secondary hover:text-text-secondary transition-all cursor-pointer"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-absolute-dark py-4 rounded-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-gold-500/10"
                >
                  {isSubmitting ? "VERIFYING..." : "SIGN IN"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-dark-surface/50 border border-dark-border p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-md relative z-10"
      >
        {/* Branding header */}
        <div className="text-center mb-6">
          <span className="font-display font-black text-2xl tracking-wider text-text-main">
            AKASH <span className="text-gold-500">KUMAR</span>
          </span>
          <p className="text-xs text-dark-muted mt-2 tracking-widest uppercase">
            Admin Panel Login
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-gold-500 border-dark-border rounded-full animate-spin" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[10px] font-bold text-dark-muted hover:text-gold-500 transition-colors uppercase tracking-widest"
          >
            &larr; Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

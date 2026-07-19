"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Briefcase, 
  Key, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  
  // Wizard steps: 1 = Details, 2 = OTP, 3 = 2FA
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profession, setProfession] = useState('Full Stack Developer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP Verification
  const [otpCode, setOtpCode] = useState('');
  
  // 2FA Details
  const [totpSecret, setTotpSecret] = useState('');
  const [qrSvg, setQrSvg] = useState('');
  const [totpCode, setTotpCode] = useState('');

  // Fetch 2FA secret and QR code on transition to step 3
  const init2FA = async () => {
    try {
      const response = await fetch(`/api/auth/2fa?username=${encodeURIComponent(username)}`);
      if (response.ok) {
        const data = await response.json();
        setTotpSecret(data.secret);
        setQrSvg(data.qrSvg);
      } else {
        setError('Failed to generate 2FA credentials. Please try again.');
        setStep(2);
      }
    } catch {
      setError('A connection error occurred while generating 2FA.');
      setStep(2);
    }
  };

  // Step 1 Submit: Account validation & send email OTP
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client validation
    if (!name.trim() || !email.trim() || !mobile.trim() || !profession.trim() || !username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    
    // Strong password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccess(`Verification code sent to ${email}`);
        setStep(2);
      } else {
        setError(data.error || 'Failed to send OTP code.');
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2 Submit: Verify Email OTP
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Email address successfully verified.');
        await init2FA();
        setStep(3);
      } else {
        setError(data.error || 'Invalid or expired OTP code.');
      }
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3 Submit: Verify 2FA & Complete registration
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!totpCode.trim() || totpCode.trim().length !== 6) {
      setError('Please enter a 6-digit Authenticator code.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          mobile,
          profession,
          username,
          password,
          totpSecret,
          totpCode
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to login page with success notification
        router.push('/admin/login?registered=success');
        router.refresh();
      } else {
        setError(data.error || 'Failed to complete registration.');
      }
    } catch {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Accent Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-dark-surface/50 border border-dark-border p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-md relative z-10"
      >
        {/* Registration Header */}
        <div className="text-center mb-8">
          <span className="font-display font-black text-2xl tracking-wider text-text-main">
            AKASH <span className="text-gold-500">KUMAR</span>
          </span>
          <p className="text-xs text-dark-muted mt-2 tracking-widest uppercase">
            Admin Account Configuration Wizard
          </p>
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`w-8 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gold-500' : 'bg-dark-border'}`} />
            <span className={`w-8 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gold-500' : 'bg-dark-border'}`} />
            <span className={`w-8 h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-gold-500' : 'bg-dark-border'}`} />
          </div>
        </div>

        {/* Global Notifications */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-950/20 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-green-950/20 border border-green-500/30 text-green-400 text-xs rounded-xl flex items-start gap-2.5"
          >
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        {/* Wizard Form Stages */}
        <div className="overflow-hidden relative min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Admin Profile Details */}
            {step === 1 && (
              <motion.form
                key="step-1"
                onSubmit={handleStep1Submit}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><User className="w-4 h-4" /></span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Profession */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Profession</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><Briefcase className="w-4 h-4" /></span>
                      <input
                        type="text"
                        required
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="Profession"
                        className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><Mail className="w-4 h-4" /></span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><Phone className="w-4 h-4" /></span>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-dark-border/40 my-2" />

                {/* Credentials block */}
                <div className="space-y-4">
                  {/* Username */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Choose Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><User className="w-4 h-4" /></span>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="admin_username"
                        className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Secret Password</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><Lock className="w-4 h-4" /></span>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-dark-muted font-bold tracking-wider uppercase">Confirm Password</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted"><Lock className="w-4 h-4" /></span>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-dark-card border border-dark-border pl-11 pr-4 py-3 rounded-xl text-xs text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-absolute-dark px-6 py-3.5 rounded-xl transition-all duration-300 w-full cursor-pointer disabled:cursor-not-allowed mt-4 shadow-lg shadow-gold-500/10"
                >
                  {isSubmitting ? "SENDING CODE..." : "SEND VERIFICATION CODE"}
                </button>
              </motion.form>
            )}

            {/* Step 2: Email OTP Code Verification */}
            {step === 2 && (
              <motion.form
                key="step-2"
                onSubmit={handleStep2Submit}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-gold-500 justify-center mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Verify Your Email</span>
                  </div>
                  <p className="text-center text-xs text-text-secondary leading-relaxed mb-4">
                    Enter the 6-digit verification code sent to <strong className="text-text-main">{email}</strong>. 
                    If you don&apos;t receive it, verify your SMTP settings or check the development console logs.
                  </p>
                  
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-dark-card border border-dark-border px-4 py-3.5 rounded-xl text-center text-sm font-bold tracking-widest text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="flex-1 text-xs font-bold tracking-widest border border-dark-border text-dark-muted py-3.5 rounded-xl hover:border-text-secondary hover:text-text-secondary transition-all cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-absolute-dark py-3.5 rounded-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-gold-500/10"
                  >
                    {isSubmitting ? "VERIFYING..." : "VERIFY OTP"}
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 3: 2FA Setup */}
            {step === 3 && (
              <motion.form
                key="step-3"
                onSubmit={handleStep3Submit}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-3 text-left text-center">
                  <div className="flex items-center gap-1.5 text-gold-500 justify-center">
                    <Key className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Configure Two-Factor Auth</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Scan the QR code below using your authenticator app (Google Authenticator, Authy, etc.) to set up 2FA protection.
                  </p>
                  
                  {/* QR SVG Container */}
                  {qrSvg ? (
                    <div 
                      className="mx-auto my-4 bg-white p-3 rounded-2xl w-[224px] h-[224px] flex items-center justify-center shadow-lg border border-dark-border"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] mx-auto my-4 border border-dashed border-dark-border flex items-center justify-center rounded-2xl text-xs text-dark-muted">
                      Loading QR Code...
                    </div>
                  )}

                  {/* Backup Code Key */}
                  <div className="bg-dark-card border border-dark-border p-3.5 rounded-xl text-center">
                    <span className="text-[9px] text-dark-muted font-bold tracking-wider uppercase block mb-1">Manual Setup Key</span>
                    <code className="text-xs font-mono font-bold text-gold-500 tracking-wider select-all">{totpSecret}</code>
                  </div>

                  <p className="text-[11px] text-dark-muted leading-relaxed mt-4">
                    After scanning, enter the 6-digit Authenticator code below to complete setup:
                  </p>

                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full bg-dark-card border border-dark-border px-4 py-3 rounded-xl text-center text-sm font-bold tracking-widest text-text-main placeholder-dark-muted focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="flex-1 text-xs font-bold tracking-widest border border-dark-border text-dark-muted py-3.5 rounded-xl hover:border-text-secondary hover:text-text-secondary transition-all cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-widest bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-absolute-dark py-3.5 rounded-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-gold-500/10"
                  >
                    {isSubmitting ? "COMPLETING..." : "REGISTER ACCOUNT"}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        <div className="text-center mt-6">
          <a
            href="/admin/login"
            className="text-[10px] font-bold text-dark-muted hover:text-gold-500 transition-colors uppercase tracking-widest"
          >
            Back to Sign In
          </a>
        </div>
      </motion.div>
    </main>
  );
}
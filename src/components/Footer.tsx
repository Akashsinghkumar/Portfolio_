"use client";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#cdebf7] border-t border-slate-300/60 py-12 px-6 md:px-12 relative transition-colors duration-300 text-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-display font-black text-xl tracking-wider text-slate-900 uppercase">
            AKASH <span className="text-[#d69f10]">KUMAR</span>
          </span>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1.5 uppercase">
            Freelance Software Developer
          </p>
        </div>
      </div>

      {/* Copyright, Socials, Legal Row */}
      <div className="max-w-7xl mx-auto border-t border-slate-300/60 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-bold gap-4">
        <p className="order-3 md:order-1 text-slate-600">
          © {new Date().getFullYear()} Akash Kumar. All rights reserved.
        </p>

        {/* Center/Right: Socials & legal links */}
        <div className="flex items-center gap-6 order-1 md:order-2">
          {/* Social icons */}
          <div className="flex items-center space-x-3.5">
            <a
              href="https://github.com/akash-kumar02"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#d69f10] transition-colors p-2 border border-slate-300 rounded-full hover:border-[#d69f10]"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/akash-kumar02"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#d69f10] transition-colors p-2 border border-slate-300 rounded-full hover:border-[#d69f10]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#d69f10] transition-colors p-2 border border-slate-300 rounded-full hover:border-[#d69f10]"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#d69f10] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d69f10] transition-colors">Terms & Conditions</a>
            <a href="/admin/login" className="hover:text-[#d69f10] transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>

      {/* Persistent Pulsing Floating WhatsApp Button positioned in place of the scroll button */}
      <a
        href="https://wa.me/917004454992"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl transition-all hover:scale-110 cursor-pointer flex items-center justify-center border border-emerald-400/50 animate-bounce"
        title="Chat on WhatsApp"
      >
        <WhatsappIcon className="w-5 h-5 fill-current" />
      </a>
    </footer>
  );
}

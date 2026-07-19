"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowUpRight, Plus, Download, Contact } from "lucide-react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-[#cdebf7] text-slate-900 transition-colors duration-300">
      
      {/* Background Video - Starts below header and covers to the bottom */}
      <div className="absolute inset-x-0 bottom-0 top-[75px] z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-top opacity-100"
        >
          <source src="/hii_akash_kumar.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Audio Button */}
      <button
        onClick={toggleAudio}
        className="fixed top-28 right-6 md:right-12 z-40 p-3 bg-white/85 backdrop-blur-md border border-slate-200 rounded-full text-[#d69f10] hover:border-[#d69f10] transition-all cursor-pointer shadow-md group"
        aria-label="Toggle Background Sound"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-slate-600 group-hover:text-[#d69f10]" />
        ) : (
          <Volume2 className="w-5 h-5 text-[#d69f10] animate-pulse" />
        )}
      </button>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto text-left">
        
        {/* Headline & Bio */}
        <div className="space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-xs"
          >
            <span className="text-[10px] font-extrabold tracking-widest text-[#69f10] uppercase">
              Hi, I&apos;m Akash Kumar
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 leading-[1.15]">
              Freelance Software <br />
              <span className="text-slate-800">Developer</span>
            </h1>
            
            <h2 className="text-[#d69f10] font-display font-extrabold text-xl sm:text-2xl tracking-wide uppercase">
              Full Stack MERN Developer
            </h2>
            
            <p className="text-sm sm:text-base text-slate-700 font-light max-w-xl leading-relaxed">
              I help startups, businesses, and personal brands build modern, responsive, and high-performance web applications that deliver real results.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="px-6 py-3.5 bg-[#e5ad19] hover:bg-[#d69f10] text-[#1e1e1e] font-extrabold text-xs tracking-widest rounded-full transition-all uppercase inline-flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              CONTACT ME <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              className="px-6 py-3.5 bg-white/80 hover:bg-white border border-slate-300 text-slate-900 font-extrabold text-xs tracking-widest rounded-full transition-all uppercase inline-flex items-center gap-1.5 cursor-pointer backdrop-blur-sm shadow-xs"
            >
              VIEW PROJECTS <Plus className="w-4 h-4 text-[#d69f10]" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-white/80 hover:bg-white border border-slate-300 text-slate-900 font-extrabold text-xs tracking-widest rounded-full transition-all uppercase inline-flex items-center gap-1.5 cursor-pointer backdrop-blur-sm shadow-xs"
            >
              DOWNLOAD RESUME <Download className="w-4 h-4 text-[#d69f10]" />
            </a>
          </motion.div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-12 border-t border-slate-300/50 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-700 font-bold gap-4">
        <span>© AKASH KUMAR PORTFOLIO</span>
        <span className="font-mono text-[#d69f10] uppercase tracking-widest">SCROLL TO DISCOVER ↓</span>
      </div>

    </section>
  );
}

"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "ABOUT", href: "#about" },
    { name: "PROJECTS", href: "#projects" },
    { name: "SERVICES", href: "#services" },
    { name: "PROCESS", href: "#process" },
  ];

  const moreLinks = [
    { name: "WHY WORK WITH ME", href: "#why-me" },
    { name: "TESTIMONIALS", href: "#testimonials" },
    { name: "FAQS", href: "#faqs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[76px] px-6 md:px-12 bg-[#cdebf7] border-b border-slate-300 shadow-md flex items-center">
      
      {/* Embedded Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e5ad19] origin-left"
      />

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Logo (Left Side) */}
        <a href="#" className="font-display font-black text-2xl tracking-wider text-slate-900 uppercase">
          AKASH <span className="text-[#d69f10]">KUMAR</span>
        </a>

        {/* Desktop Navigation (Right Side) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold tracking-wider text-slate-900 uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#d69f10] transition-colors py-1"
            >
              {link.name}
            </a>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              onMouseEnter={() => setIsMoreOpen(true)}
              className="hover:text-[#d69f10] transition-colors py-1 inline-flex items-center gap-1 cursor-pointer"
            >
              MORE <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-[#d69f10]' : ''}`} />
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseLeave={() => setIsMoreOpen(false)}
                  className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200/80 rounded-2xl p-2 shadow-xl backdrop-blur-md flex flex-col space-y-1"
                >
                  {moreLinks.map((mLink) => (
                    <a
                      key={mLink.name}
                      href={mLink.href}
                      onClick={() => setIsMoreOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-900 hover:text-[#d69f10] transition-colors"
                    >
                      {mLink.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-900 hover:text-[#d69f10] transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 mt-4 px-6 py-6 space-y-4 text-left shadow-2xl rounded-2xl"
          >
            <div className="flex flex-col space-y-3 text-xs font-bold tracking-widest text-slate-900 uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#d69f10] transition-colors py-2 border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              {moreLinks.map((mLink) => (
                <a
                  key={mLink.name}
                  href={mLink.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#d69f10] transition-colors py-2 border-b border-slate-100 text-slate-600"
                >
                  {mLink.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

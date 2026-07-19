"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Shield, BookOpen, Bot, Network, X, Laptop, Tablet, Smartphone, Code } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  features: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const featuredProjects = [
    {
      title: "Bottle Brand Website",
      description: "Premium product showcase website with modern UI and smooth animations.",
      detailedDescription: "A custom promotional and visual commerce experience for an artisanal bottle manufacturer. Built with fluid layouts, WebGL canvas transitions, user-interactive showcase modules, and smooth scrolling capabilities.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Three.js", "Framer Motion"],
      features: [
        "WebGL bottle preview with rotation control.",
        "Smooth page transition offsets.",
        "Interactive variant styling and liquid fill simulation.",
        "Lighthouse 100 SEO score optimization."
      ],
      image: "/project_bottle.png",
      demoUrl: "https://bottle.example.com",
      githubUrl: "https://github.com/akash-kumar02/bottle-brand",
      category: "Creative Frontend",
      icon: Code,
    },
    {
      title: "Cosmetic Brand Website",
      description: "Elegant cosmetic brand website with premium product presentation.",
      detailedDescription: "A luxurious brand experience designed for an organic skincare product line. Restructures product navigation, filters, and checkout stages with custom animations and fluid design tokens.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Lenis Scroll", "GSAP"],
      features: [
        "Custom product showcase grid with parallax reveals.",
        "Micro-interactions on ingredient details.",
        "Secure checkout form layout validation.",
        "Smooth scroll and custom transition curves."
      ],
      image: "/project_cosmetic.png",
      demoUrl: "https://cosmetics.example.com",
      githubUrl: "https://github.com/akash-kumar02/skincare-cosmetics",
      category: "E-Commerce Design",
      icon: Code,
    },
    {
      title: "Urban Garden",
      description: "Modern landscaping and gardening website with service and gallery.",
      detailedDescription: "An online platform built for an urban gardening agency. Incorporates real-time service booking, service categorization, design moodboards, and testimonials synced with database controllers.",
      tech: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      features: [
        "Dynamic catalog display based on local seasonality.",
        "Consultation scheduling dashboard.",
        "Static JSON backup failover configuration.",
        "Responsive photo grid with modal gallery preview."
      ],
      image: "/project_garden.png",
      demoUrl: "https://garden.example.com",
      githubUrl: "https://github.com/akash-kumar02/urban-garden",
      category: "Full Stack App",
      icon: Code,
    },
    {
      title: "Rahul Custom Motorcycles",
      description: "Luxury motorcycle website with custom bike showcases and services.",
      detailedDescription: "A visual showcase portfolio designed for a bespoke custom chopper design garage. Includes interactive customization blueprints, gallery, custom bike features, and parts assembly details.",
      tech: ["Next.js", "Tailwind CSS", "Node.js", "Framer Motion", "MongoDB"],
      features: [
        "Interactive blueprint customizer dashboard.",
        "Immersive media galleries.",
        "Stateless sessions for inquiries inbox management.",
        "Responsive device frames matching Desktop/Tablet/Mobile viewports."
      ],
      image: "/project_motorcycle.png",
      demoUrl: "https://motorcycles.example.com",
      githubUrl: "https://github.com/akash-kumar02/custom-motorcycles",
      category: "Bespoke Portfolio",
      icon: Code,
    },
  ];

  const otherProjects = [
    {
      title: "CyberSecNexus",
      description: "Cybersecurity Dashboard",
      icon: Shield,
      tech: ["React", "Chart.js"],
    },
    {
      title: "Learning Portal",
      description: "Online Learning Platform",
      icon: BookOpen,
      tech: ["Next.js", "Express"],
    },
    {
      title: "AI Question Answering Bot",
      description: "AI Powered Chat Assistant",
      icon: Bot,
      tech: ["FastAPI", "VectorDB"],
    },
    {
      title: "Intrusion Detection System",
      description: "Network Security System",
      icon: Network,
      tech: ["Python", "TensorFlow"],
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-[#cdebf7] text-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Featured Projects Header */}
        <div className="flex flex-col items-start text-left">
          <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-wide uppercase">
            Featured Client <span className="text-[#d69f10]">Projects</span>
          </h3>
          <p className="text-xs text-slate-600 font-bold tracking-widest mt-2 uppercase">
            Hand-Crafted High Fidelity Case Studies
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-white/85 border border-slate-200/60 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#d69f10]/40 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              {/* Image Preview */}
              <div 
                className="relative h-44 w-full bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 border border-slate-200/80 px-2 py-0.5 rounded-md text-[8px] font-bold tracking-wider text-[#d69f10] uppercase">
                  {project.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <h4 
                    className="font-display font-black text-base text-slate-900 group-hover:text-[#d69f10] transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Tech stack badge list */}
                  <div className="text-[10px] font-mono text-slate-500 flex flex-wrap gap-1 border-t border-slate-200/40 pt-2">
                    <span className="font-bold text-slate-600">Tech:</span>
                    <span>{project.tech.slice(0, 3).join(", ")}</span>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2 w-full pt-1">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 text-center py-2 bg-[#e5ad19] hover:bg-[#d69f10] text-[#1e1e1e] font-extrabold text-[10px] tracking-widest rounded-lg transition-colors uppercase cursor-pointer"
                    >
                      Live Demo
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 border border-slate-300 hover:border-slate-400 text-slate-800 font-extrabold text-[10px] tracking-widest rounded-lg transition-colors uppercase inline-flex justify-center items-center gap-1 cursor-pointer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col items-start text-left">
            <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase">
              Other <span className="text-[#d69f10]">Projects</span>
            </h3>
            <p className="text-[10px] text-slate-600 font-bold tracking-widest mt-1 uppercase">
              Additional Experiments & Security Blueprints
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProjects.map((project, idx) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-white/85 border border-slate-200/60 p-4 rounded-xl flex items-center gap-3.5 text-left shadow-xs hover:border-[#d69f10]/40 transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="p-2.5 bg-slate-100 border border-slate-200/40 rounded-xl text-[#d69f10]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-black text-xs text-slate-900 truncate">
                      {project.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-light truncate mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Case Study Mockups Dialog Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 text-left space-y-8 shadow-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="space-y-1">
                <span className="px-3 py-1 bg-[#e5ad19]/10 border border-[#e5ad19]/30 text-[#d69f10] rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 mt-2">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Mockup switcher */}
              <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2">
                  Interactive Preview
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      previewDevice === "desktop"
                        ? "bg-[#e5ad19] text-[#1e1e1e] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice("tablet")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      previewDevice === "tablet"
                        ? "bg-[#e5ad19] text-[#1e1e1e] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" /> Tablet
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      previewDevice === "mobile"
                        ? "bg-[#e5ad19] text-[#1e1e1e] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile
                  </button>
                </div>
              </div>

              {/* Screen Mockup Frame */}
              <div className="w-full flex items-center justify-center py-4 bg-slate-50 border border-slate-200/50 rounded-2xl overflow-hidden">
                <div
                  className={`transition-all duration-500 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md relative ${
                    previewDevice === "desktop"
                      ? "w-full h-80"
                      : previewDevice === "tablet"
                      ? "w-[480px] h-[340px]"
                      : "w-[260px] h-[380px]"
                  }`}
                >
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Specifications details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <h4 className="font-display font-black text-sm text-slate-900 uppercase">Project Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {selectedProject.detailedDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display font-black text-sm text-slate-900 uppercase">Key Features & Engineering</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d69f10] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display font-black text-sm text-slate-900 uppercase">Technologies & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((item: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-mono text-[#d69f10]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#e5ad19] text-[#1e1e1e] font-extrabold text-xs tracking-widest rounded-full hover:bg-[#d69f10] transition-colors uppercase inline-flex items-center gap-1.5"
                >
                  LIVE DEMO PREVIEW <ArrowUpRight className="w-4 h-4" />
                </a>
                
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-950 font-extrabold text-xs tracking-widest rounded-full transition-colors uppercase inline-flex items-center gap-1.5"
                  >
                    GITHUB REPOSITORY <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

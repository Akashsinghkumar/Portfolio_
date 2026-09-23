"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  User, 
  FileText, 
  ShoppingCart, 
  LayoutDashboard, 
  Code2, 
  Link, 
  RefreshCw, 
  Zap 
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Business Website",
      icon: Briefcase,
      description: "Custom-designed corporative websites to showcase your brand, offerings, values, and client testimonials.",
    },
    {
      title: "Portfolio Website",
      icon: User,
      description: "Premium, highly tailored visual portfolio sites for creators, developers, designers, and executives.",
    },
    {
      title: "Landing Page",
      icon: FileText,
      description: "High-conversion standalone pages focused on promoting specific marketing campaigns or digital products.",
    },
    {
      title: "E-commerce Website",
      icon: ShoppingCart,
      description: "Secure head-less store setups equipped with automated catalog syncing and frictionless payment checkouts.",
    },
    {
      title: "Admin Dashboard",
      icon: LayoutDashboard,
      description: "Zero-code control consoles to monitor analytics, manage collections, and handle data synchronization.",
    },
    {
      title: "MERN Stack Web Apps",
      icon: Code2,
      description: "Full-scale dynamic web applications engineered with MongoDB, Express, React, and Node.js.",
    },
    {
      title: "API Integration",
      icon: Link,
      description: "Seamless connection of external services, authentication APIs, payment processors, and webhooks.",
    },
    {
      title: "Website Redesign",
      icon: RefreshCw,
      description: "Complete UI/UX design and code refactoring to modern standards to boost user retention.",
    },
    {
      title: "Performance Optimization",
      icon: Zap,
      description: "Optimization audits to achieve sub-second page loads, SEO placement, and maximum Lighthouse scores.",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#cdebf7] text-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left">
          <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-wide uppercase">
            Freelancing <span className="text-[#d69f10]">Services</span>
          </h3>
          <p className="text-xs text-slate-600 font-bold tracking-widest mt-2 uppercase">
            Tailored Engineering & Design Solutions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white/85 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between text-left space-y-4 shadow-xs backdrop-blur-md transition-all group hover:border-[#d69f10]/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 rounded-2xl text-[#d69f10] w-fit border border-slate-200/40">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-black text-lg text-slate-900 group-hover:text-[#d69f10] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

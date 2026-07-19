"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Code, CheckSquare, Rocket, HeartHandshake, ArrowRight } from "lucide-react";

export default function Process() {
  const steps = [
    { name: "Discovery", icon: Compass },
    { name: "Design", icon: PenTool },
    { name: "Development", icon: Code },
    { name: "Testing", icon: CheckSquare },
    { name: "Launch", icon: Rocket },
    { name: "Support", icon: HeartHandshake },
  ];

  return (
    <div className="space-y-8 bg-white/80 border border-slate-200/60 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xs h-full text-left">
      <div className="flex flex-col items-start">
        <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase">
          Development <span className="text-[#d69f10]">Process</span>
        </h3>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">
          How I Bring Your Ideas To Life
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 pt-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex items-center gap-2 group sm:flex-col sm:items-center sm:text-center sm:flex-1 min-w-[90px]">
              
              {/* Circle container */}
              <div className="relative">
                <motion.div
                  className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#d69f10] group-hover:border-[#d69f10]/40 transition-colors shadow-xs"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                
                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white border border-slate-200 text-[9px] font-bold text-slate-600 rounded-full flex items-center justify-center font-mono">
                  {idx + 1}
                </div>
              </div>

              {/* Step name */}
              <div className="sm:mt-2 text-left sm:text-center">
                <span className="font-display font-black text-xs text-slate-800 group-hover:text-[#d69f10] transition-colors uppercase">
                  {step.name}
                </span>
              </div>

              {/* Connecting arrow (hidden on last step and mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center text-slate-300 absolute" style={{ left: `${(idx + 1) * 16.6 - 3}%`, top: '25px' }}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

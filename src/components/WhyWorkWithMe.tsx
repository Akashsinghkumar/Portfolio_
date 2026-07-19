"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Clock, 
  Smartphone, 
  Search, 
  Layers, 
  MessageSquare, 
  DollarSign, 
  HeartHandshake 
} from "lucide-react";

export default function WhyWorkWithMe() {
  const benefits = [
    { title: "Clean Code", icon: Sparkles },
    { title: "On-Time Delivery", icon: Clock },
    { title: "Mobile Responsive", icon: Smartphone },
    { title: "SEO Friendly", icon: Search },
    { title: "Scalable Solutions", icon: Layers },
    { title: "Clear Communication", icon: MessageSquare },
    { title: "Affordable Pricing", icon: DollarSign },
    { title: "Lifetime Support", icon: HeartHandshake },
  ];

  return (
    <div className="space-y-8 bg-white/80 border border-slate-200/60 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xs h-full text-left">
      <div className="flex flex-col items-start">
        <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase">
          Why Work <span className="text-[#d69f10]">With Me</span>
        </h3>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">
          Value I Deliver To Clients
        </p>
      </div>

      {/* Benefits Grid (2x4) */}
      <div className="grid grid-cols-2 gap-4">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={idx}
              className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex items-center gap-3 transition-colors hover:border-[#d69f10]/30"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 bg-white border border-slate-200 text-[#d69f10] rounded-xl shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-display font-black text-xs text-slate-800 uppercase">
                {benefit.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
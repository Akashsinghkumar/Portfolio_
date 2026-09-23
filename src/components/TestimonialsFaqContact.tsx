"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";

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

export default function TestimonialsFaqContact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const faqs = [
    {
      question: "How long does a project take?",
      answer: "Timelines depend on the project complexity. A standard landing page takes 3-7 days, while full MERN stack applications or dashboards can take 2-4 weeks.",
    },
    {
      question: "Do you provide support after delivery?",
      answer: "Yes, I provide 30 days of free support and maintenance after the final delivery to monitor performance and resolve any bugs.",
    },
    {
      question: "How do we start a project?",
      answer: "Simply use the contact form to message me. We will set up a quick discovery call to discuss requirements, wireframes, and milestones.",
    },
    {
      question: "What is your payment process?",
      answer: "Typically, I work on a milestone basis: 30% upfront initiation deposit, 40% after prototype approval, and 30% upon final delivery.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: "error", text: "Please fill out all fields." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage({ type: "success", text: "Your message has been sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setStatusMessage({ type: "error", text: data.error || "Failed to send the message." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "An error occurred while sending the message." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-details" className="py-24 px-6 md:px-12 bg-[#cdebf7] text-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: FAQ (Spans 6/12) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-col items-start">
              <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase">
                FAQ
              </h3>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white/80 border border-slate-200/60 rounded-2xl overflow-hidden shadow-xs backdrop-blur-md"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="font-display font-black text-[11px] text-slate-800 uppercase tracking-tight">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#d69f10] rotate-180 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-3.5 pt-1 text-[11px] text-slate-600 leading-relaxed font-light border-t border-slate-200/30">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Contact Me (Spans 6/12) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-col items-start">
              <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase">
                Contact <span className="text-[#d69f10]">Me</span>
              </h3>
            </div>

            <div className="bg-white/80 border border-slate-200/60 p-5 md:p-6 rounded-3xl shadow-xs backdrop-blur-md flex flex-col gap-6">
              
              {/* Row of circular icon links (at the top of the box) */}
              <div className="flex items-center justify-center gap-4 border-b border-slate-200/40 pb-5">
                {/* Email */}
                <a
                  href="mailto:akashkumar.dev@gmail.com"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#d69f10] hover:text-[#d69f10]/80 hover:border-[#d69f10]/50 transition-all shadow-xs"
                  title="Email: akashkumar.dev@gmail.com"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918709734221"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#d69f10] hover:text-[#d69f10]/80 hover:border-[#d69f10]/50 transition-all shadow-xs"
                  title="WhatsApp: +91 87097 34221"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* Github */}
                <a
                  href="https://github.com/akash-kumar02"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#d69f10] hover:text-[#d69f10]/80 hover:border-[#d69f10]/50 transition-all shadow-xs"
                  title="GitHub: /akash-kumar02"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/akash-kumar02"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#d69f10] hover:text-[#d69f10]/80 hover:border-[#d69f10]/50 transition-all shadow-xs"
                  title="LinkedIn: /in/akash-kumar02"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                {/* Location */}
                <a
                  href="https://maps.google.com/?q=Bihar,India"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#d69f10] hover:text-[#d69f10]/80 hover:border-[#d69f10]/50 transition-all shadow-xs"
                  title="Location: Bihar, India"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>

              {/* Message form stacked directly below the icons */}
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {statusMessage && (
                    <div className={`p-2.5 rounded-xl text-[10px] font-bold text-left ${
                      statusMessage.type === "success" 
                        ? "bg-green-950/10 border border-green-500/20 text-green-700" 
                        : "bg-red-950/10 border border-red-500/20 text-red-700"
                    }`}>
                      {statusMessage.text}
                    </div>
                  )}

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:border-[#d69f10] focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:border-[#d69f10] focus:outline-none transition-colors"
                  />
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message"
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:border-[#d69f10] focus:outline-none transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#e5ad19] hover:bg-[#d69f10] disabled:bg-[#e5ad19]/50 text-[#1e1e1e] font-extrabold text-xs tracking-widest rounded-xl transition-all uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Award, CheckCircle, Smile, Code2, Database, Terminal, Layers, Monitor, Play } from "lucide-react";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const isPercent = value.includes("%");
  const isPlus = value.includes("+");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        ref.current.textContent = `${rounded}${isPercent ? "%" : ""}${isPlus ? "+" : ""}`;
      }
    });
  }, [springValue, isPercent, isPlus]);

  return <span ref={ref}>0{isPercent ? "%" : ""}{isPlus ? "+" : ""}</span>;
}

export default function About() {
  const stats = [
    { value: "3+", label: "Years Experience", icon: Award },
    { value: "20+", label: "Projects Completed", icon: CheckCircle },
    { value: "15+", label: "Happy Clients", icon: Smile },
    { value: "100%", label: "Client Satisfaction", icon: Code2 },
  ];

  // Inline premium tech SVGs
  const htmlIcon = (
    <svg className="w-5 h-5 text-[#e34f26]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm10.5 4.5H6.6l.3 3.5H12V11H7.1l.3 3.5h4.6v3.2l-3.3-.9-.2-2.3H5.1l.4 5.3 6.5 1.8 6.5-1.8.6-6.8H12V11h4.7l.4-4.5H12V4.5z" />
    </svg>
  );

  const cssIcon = (
    <svg className="w-5 h-5 text-[#1572b6]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm10.5 4.5H6.6l.3 3.5H12V11H7.1l.3 3.5h4.6v3.2l-3.3-.9-.2-2.3H5.1l.4 5.3 6.5 1.8 6.5-1.8.6-6.8H12V11h4.7l.4-4.5H12V4.5z" transform="scale(-1, 1) translate(-24, 0)" />
    </svg>
  );

  const jsIcon = (
    <svg className="w-5 h-5 text-[#f7df1e]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm20.3 16.9c-.8-.8-1.7-1.3-3.2-1.3-1.4 0-2.2.7-2.2 1.6 0 .9.5 1.4 1.7 1.9l.9.4c2 .8 2.9 1.7 2.9 3.5 0 2.2-1.8 3.7-4.5 3.7-2.6 0-4.2-1.2-5-3h2.6c.5.9 1.4 1.4 2.4 1.4 1.3 0 2-.6 2-1.5 0-.9-.5-1.3-1.6-1.8l-1-.4c-1.9-.8-3-1.8-3-3.5 0-2 1.6-3.4 4.2-3.4 2.2 0 3.8 1.1 4.5 2.6h-2.4zm-10.7-3.8H12v10.3c0 1.9-.9 2.9-2.9 2.9-1.8 0-2.8-1-3.2-2.4h2.5c.3.7.7 1 1.2 1 .7 0 1-.4 1-1.3V13.1z" />
    </svg>
  );

  const reactIcon = (
    <svg className="w-5 h-5 text-[#61dafb]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 10.9c0-.4-.3-.8-.8-.9-1.9-.4-4-.4-6 0-.6-1.5-1.4-3.1-2.4-4.5.4-.5.8-1.2.9-1.9.1-.5-.2-1-.7-1.1-.5-.1-1.1.2-1.2.7-.4 1-1 2.2-1.7 3.5-1.4-1-3-1.7-4.5-2.2-.5-.1-1.1.2-1.2.7-.1.5.2 1 .7 1.2 1.5.4 3.1 1.1 4.5 2.1-1 1.3-1.7 2.8-2.3 4.4-1.9-.4-4-.4-6 0-.5.1-.8.5-.8.9s.3.8.8.9c1.9.4 4 .4 6 0 .6 1.5 1.4 3.1 2.4 4.5-.4.5-.8 1.2-.9 1.9-.1.5.2 1 .7 1.1.5.1 1-.2 1.2-.7.4-1 1-2.2 1.7-3.5 1.4 1 3 1.7 4.5 2.2.5.1 1.1-.2 1.2-.7.1-.5-.2-1-.7-1.2-1.5-.4-3.1-1.1-4.5-2.1 1-1.3 1.7-2.8 2.3-4.4 1.9.4 4 .4 6 0 .5-.1.8-.5.8-.9zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z" />
    </svg>
  );

  const nextjsIcon = (
    <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17.5l-5.644-7.234h-.9v7.234h-1.23v-9.5h1.23l5.312 6.84v-6.84h1.232v9.5z" />
    </svg>
  );

  const tailwindIcon = (
    <svg className="w-5 h-5 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );

  const nodejsIcon = (
    <svg className="w-5 h-5 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L2.3 5.6v12.8L12 24l9.7-5.6V5.6L12 0zm-1.2 20.3l-5.6-3.2v-6.3l5.6 3.2v6.3zm1.2-7.8l-5.6-3.2 5.6-3.2 5.6 3.2-5.6 3.2zm5.6 4.6l-5.6 3.2v-6.3l5.6-3.2v6.3z" />
    </svg>
  );

  const mongodbIcon = (
    <svg className="w-5 h-5 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.193 11.232c-.318-1.503-1.14-3.18-2.464-5.03-1.5-2.095-2.73-3.955-2.73-3.955s-1.23 1.86-2.73 3.955c-1.324 1.85-2.146 3.527-2.464 5.03-.496 2.34-.147 4.542.923 6.136.932 1.388 2.353 2.193 3.935 2.28a.333.333 0 0 0 .336-.333v-1.637c-.012-.08-.035-.158-.094-.216-1.597-1.597-1.428-4.225.263-5.916.27-.27.608-.432.96-.532V3.064c0-.214.238-.344.417-.225l.003.002c1.47 1.05 2.672 2.766 2.672 4.41v4.062c.352.1.69.262.96.532 1.69 1.69 1.86 4.318.262 5.916a.33.33 0 0 0-.094.216v1.637c0 .184.15.333.336.333 1.582-.087 3.003-.892 3.935-2.28 1.07-1.594 1.42-3.796.923-6.136z" />
    </svg>
  );

  const figmaIcon = (
    <svg className="w-5 h-5 text-[#f24e1e]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 1.93 1.09 3.6 2.69 4.45C8.09 12.3 7 13.97 7 16c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.03-1.09-3.7-2.69-4.55C15.91 10.6 17 8.93 17 7c0-2.76-2.24-5-5-5zm-2.5 5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zm2.5 6.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );

  const skillsCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML", renderIcon: htmlIcon },
        { name: "CSS", renderIcon: cssIcon },
        { name: "JS", renderIcon: jsIcon },
        { name: "React", renderIcon: reactIcon },
        { name: "Next.js", renderIcon: nextjsIcon },
        { name: "Tailwind", renderIcon: tailwindIcon },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", renderIcon: nodejsIcon },
        { name: "Express.js", renderIcon: <Layers className="w-5 h-5 text-slate-800" /> },
        { name: "REST API", renderIcon: <Terminal className="w-5 h-5 text-slate-700" /> },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", renderIcon: mongodbIcon },
        { name: "MySQL", renderIcon: <Database className="w-5 h-5 text-[#00758f]" /> },
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "VS Code", renderIcon: <Monitor className="w-5 h-5 text-[#007acc]" /> },
        { name: "Postman", renderIcon: <Play className="w-5 h-5 text-[#ff6c37]" /> },
        { name: "Figma", renderIcon: figmaIcon },
      ]
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#cdebf7] text-slate-900 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: About Me Bio & Stats Counters Row */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
              <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-tight uppercase">
                About <span className="text-[#d69f10]">Me</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-light">
                I&apos;m Akash Kumar, a B.Tech Computer Science graduate and Freelance Software Developer specializing in MERN Stack development. I enjoy creating fast, responsive, and visually appealing websites and web applications that solve real-world problems. My goal is to build high-quality digital products while maintaining clean, efficient, and scalable code.
              </p>
            </div>

            {/* Stats row integrated at the bottom of the About column */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    className="bg-white/85 border border-slate-200/60 p-4 rounded-2xl flex flex-col justify-between shadow-xs backdrop-blur-md"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="text-slate-500 mb-2">
                      <Icon className="w-4 h-4 text-[#d69f10]" />
                    </div>
                    <div>
                      <div className="font-display font-black text-xl text-slate-900 tracking-tight">
                        <Counter value={stat.value} />
                      </div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Skills & Technologies Categories */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 tracking-tight uppercase">
              Skills & <span className="text-[#d69f10]">Technologies</span>
            </h3>

            <div className="space-y-6">
              {skillsCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#d69f10] uppercase">
                    {category.title}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        className="bg-white/85 border border-slate-200/60 p-3 rounded-xl flex items-center gap-3 shadow-xs backdrop-blur-md"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: (catIdx * 3 + sIdx) * 0.03 }}
                        whileHover={{ y: -2, borderColor: "rgba(214, 159, 16, 0.4)" }}
                      >
                        <div className="shrink-0 p-1.5 bg-slate-100 rounded-lg border border-slate-200/50">
                          {skill.renderIcon}
                        </div>
                        <span className="font-extrabold text-xs text-slate-800">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

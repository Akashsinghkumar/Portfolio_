import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import TestimonialsFaqContact from "@/components/TestimonialsFaqContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        
        {/* Development Process & Why Work With Me side-by-side container */}
        <section id="why-me" className="py-12 px-6 md:px-12 bg-[#cdebf7] text-slate-900 relative transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6">
              <Process />
            </div>
            <div className="lg:col-span-6">
              <WhyWorkWithMe />
            </div>
          </div>
        </section>

        <TestimonialsFaqContact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

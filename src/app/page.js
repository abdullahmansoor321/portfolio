"use client";
import { useState, useEffect } from "react";
import AnimatedBg from "@/components/AnimatedBg";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import MissionControl from "@/components/MissionControl";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const syncViewportState = () => {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    };

    const rafId = requestAnimationFrame(syncViewportState);
    const settleId = window.setTimeout(syncViewportState, 220);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(settleId);
    };
  }, [loading]);

  return (
    <>
      <Loader onFinished={() => setLoading(false)} />
      
      {!loading && (
        <div style={{ animation: "fadeIn 1s forwards" }}>
          <ScrollProgress />
          <CustomCursor />
          <AnimatedBg />
          <Navbar />
          <MissionControl />
          <main style={{ position: "relative", zIndex: 1 }}>
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Education />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

const EXPERIENCES = [
  {
    chapter: "01",
    role: "Software Engineer — Intern",
    company: "ARYTECH",
    period: "Sep 2024 – Present",
    color: "#00f5d4",
    desc: "Spearheaded the design and solo development of an internal HRMS, managing the entire lifecycle from ERD architecture to cloud VM deployment.",
    details: [
      "Engineered automated attendance systems with geo-verified check-ins.",
      "Optimized production CMS interfaces for improved editorial usability.",
      "Developed a secure NestJS authentication boilerplate to standardize microservices."
    ],
    tech: ["MERN", "React", "Next.js", "NestJS", "PostgreSQL", "Prisma"]
  },
  {
    chapter: "02",
    role: "Apprentice Software Engineer",
    company: "Grayhat Developers",
    period: "Sep 2023 – May 2024",
    color: "#8b5cf6",
    desc: "Core contributor to ActorDB — an AI-powered video indexing tool for semantic content retrieval.",
    details: [
      "Built multi-modal video analysis pipelines using WhisperX and CLIP.",
      "Integrated facial recognition clustering into a Dockerized GUI.",
      "Optimized data streaming for real-time video processing."
    ],
    tech: ["Python", "WhisperX", "CLIP", "Docker", "PyTorch"]
  },
  {
    chapter: "03",
    role: "Machine Learning Intern",
    company: "NCL",
    period: "Mar 2024 – Apr 2024",
    color: "#f59e0b",
    desc: "Applied computer vision research focused on real-time object detection systems.",
    details: [
      "implemented YOLOv8 pipelines for automated surveillance monitoring.",
      "Maximized model precision through rigorous data augmentation sets.",
      "Streamlined training cycles using hyperparameter optimization."
    ],
    tech: ["YOLOv8", "OpenCV", "Scikit-Learn", "Matplotlib"]
  },
  {
    chapter: "04",
    role: "IT Intern",
    company: "KDA",
    period: "Aug 2023 – Sep 2023",
    color: "#f43f5e",
    desc: "Systems analyst mapping departmental workflows for digital transformation.",
    details: [
      "Audited manual data workflows across multiple government departments.",
      "Proposed a strategic roadmap for cross-departmental automation.",
      "Identified critical IT infrastructure gaps for modernization."
    ],
    tech: ["System Analysis", "Workflow Mapping", "Documentation"]
  }
];

function ExpCard({ exp, isActive, isCompact }) {
  const cardRef = useRef(null);
  const compactTransform = isActive ? "translateY(-8px) scale(1.02)" : "translateY(6px) scale(0.96)";

  return (
    <div
      ref={cardRef}
      className="exp-card"
      style={{
        padding: "clamp(1.1rem, 3vw, 3rem)",
        marginBottom: isCompact ? 0 : "6rem",
        background: isActive ? "rgba(7,11,24,0.9)" : "rgba(7,11,24,0.4)",
        border: `1px solid ${isActive ? exp.color : "rgba(255,255,255,0.1)"}`,
        borderRadius: "20px",
        backdropFilter: "blur(16px)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isCompact ? compactTransform : (isActive ? "scale(1.02) translateX(10px)" : "scale(0.98) translateX(0)"),
        opacity: isCompact ? (isActive ? 1 : 0.78) : (isActive ? 1 : 0.6),
        position: "relative",
        boxShadow: isActive ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${exp.color}15` : "none",
      }}
    >
      {/* Diagnostic Mini-HUD */}
      <div style={{
        position: isCompact ? "relative" : "absolute",
        top: isCompact ? "auto" : "1.5rem",
        right: isCompact ? "auto" : "1.5rem",
        display: "flex", alignItems: "center", gap: "10px",
        fontFamily: "var(--font-mono)",
        fontSize: isCompact ? "0.72rem" : "0.62rem",
        color: exp.color,
        opacity: isCompact ? 0.95 : (isActive ? 0.8 : 0.2),
        transition: "all 0.5s ease",
        letterSpacing: isCompact ? "0.08em" : "0.15em",
        textTransform: "uppercase",
        marginBottom: isCompact ? "0.9rem" : 0,
        padding: isCompact ? "0.35rem 0.55rem" : 0,
        borderRadius: isCompact ? "999px" : 0,
        border: isCompact ? `1px solid ${exp.color}66` : "none",
        background: isCompact ? "rgba(0,0,0,0.35)" : "transparent",
        width: isCompact ? "fit-content" : "auto",
      }}>
        <span style={{
          width: isCompact ? 7 : 8,
          height: isCompact ? 7 : 8,
          borderRadius: "50%",
          background: exp.color,
          boxShadow: isActive ? `0 0 10px ${exp.color}` : "none",
          animation: isActive ? "pulse 2s ease-in-out infinite" : "none"
        }} />
        <span>[0x0{exp.chapter} // {isCompact ? exp.company : exp.company.slice(0, 4)}]</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)", fontWeight: 800, color: isActive ? "#fff" : "var(--text-sub)", lineHeight: 1.2 }}>{exp.role}</h3>
          <p style={{ color: exp.color, fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, marginTop: "0.2rem" }}>
            {exp.company}
          </p>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap", paddingTop: "0.3rem" }}>
          {exp.period}
        </div>
      </div>

      <p style={{ color: "var(--text-sub)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{exp.desc}</p>

      <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
        {exp.details.map((d, i) => (
          <li key={i} style={{ display: "flex", gap: "0.8rem", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem", opacity: isActive ? 1 : 0.7 }}>
            <span style={{ color: exp.color }}>▸</span> {d}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {exp.tech.map(t => (
          <span key={t} style={{
            fontSize: "0.7rem", fontFamily: "var(--font-mono)", fontWeight: 700, padding: "0.32rem 0.62rem", border: `1px solid ${isActive ? exp.color : "rgba(255,255,255,0.28)"}`,
            background: isActive ? `${exp.color}1f` : "rgba(255,255,255,0.1)", borderRadius: "4px", color: isActive ? exp.color : "var(--text-sub)"
          }}>{t}</span>
        ))}
      </div>

      {/* Side Accent */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3,
        background: exp.color, borderRadius: "0 4px 4px 0",
        boxShadow: `0 0 15px ${exp.color}`,
        transform: isActive ? "scaleY(1)" : "scaleY(0)",
        transition: "transform 0.5s",
      }} />
    </div>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const expContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimer = useRef(null);

  const handleInteraction = () => {
    setIsInteracting(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setIsInteracting(false), 8000);
  };

  useEffect(() => {
    if (!isMobile || !expContainerRef.current || isInteracting) return;
    const interval = setInterval(() => {
      const container = expContainerRef.current;
      if (!container) return;
      const cards = container.querySelectorAll(".exp-card");
      const nextIdx = (activeIndex + 1) % cards.length;
      const nextCard = cards[nextIdx];
      if (nextCard) {
        container.scrollTo({
          left: nextCard.offsetLeft - (container.offsetWidth - nextCard.offsetWidth) / 2,
          behavior: "smooth"
        });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile, activeIndex, isInteracting]);

  useEffect(() => {
    const syncMobile = () => setIsMobile(window.innerWidth <= 992);
    syncMobile();
    window.addEventListener("resize", syncMobile, { passive: true });
    return () => window.removeEventListener("resize", syncMobile);
  }, []);

  // Sync activeIndex during scroll on mobile
  useEffect(() => {
    if (!isMobile || !expContainerRef.current) return;
    const container = expContainerRef.current;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".exp-card");
      let current = 0;
      let minDiff = Infinity;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(containerCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          current = i;
        }
      });
      setActiveIndex(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !expContainerRef.current) return;
    const container = expContainerRef.current;
    const cards = container.querySelectorAll(".exp-card");
    const firstCard = cards[0];
    setActiveIndex(0);

    const rafId = requestAnimationFrame(() => {
      if (!firstCard) return;
      container.scrollTo({
        left: firstCard.offsetLeft - (container.offsetWidth - firstCard.offsetWidth) / 2,
        behavior: "auto",
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  // Desktop Scroll Observer
  useEffect(() => {
    if (isMobile) return;
    const s = () => {
      const cards = document.querySelectorAll(".exp-container > div");
      let current = 0;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.top < window.innerHeight / 1.5) current = i;
      });
      setActiveIndex(current);
    };
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, [isMobile]);

  return (
    <section id="experience" ref={sectionRef} style={{ background: "var(--void)", padding: isMobile ? "2.5rem 0" : "6rem 0", position: "relative" }}>
      <div className="container">
        {/* Unified Header */}
        <p className="section-eyebrow">05 — Experience</p>
        <h2 className="section-title" style={{ marginBottom: isMobile ? "2rem" : "4rem", fontSize: isMobile ? "2.2rem" : "3.5rem" }}>Career <em>Logbook</em></h2>

        <div className="experience-layout" style={{ display: "flex", gap: "4rem", flexDirection: isMobile ? "column" : "row" }}>
          
          {isMobile && (
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.14em",
              color: "var(--cyan)",
              opacity: 0.8,
              marginTop: "-1rem",
              marginBottom: "1.5rem"
            }}>
              SWIPE_TO_SWAP ⟹
            </div>
          )}

          {/* Left - Sticky Navigation (Desktop Only) */}
          {!isMobile && (
            <div className="experience-side" style={{ flex: "0 0 280px", position: "sticky", top: "10rem", height: "fit-content" }}>
              <div className="experience-nav" style={{ paddingLeft: "1.5rem", borderLeft: "1px solid var(--border)", position: "relative" }}>
                <div style={{
                  position: "absolute", left: -1, top: `${activeIndex * 25}%`, height: "25%", width: 2, background: EXPERIENCES[activeIndex].color,
                  boxShadow: `0 0 10px ${EXPERIENCES[activeIndex].color}`, transition: "all 0.5s"
                }} />
                {EXPERIENCES.map((e, i) => (
                  <div key={i} style={{ 
                    height: "60px", display: "flex", alignItems: "center", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
                    color: activeIndex === i ? e.color : "var(--text-muted)", transition: "color 0.4s", cursor: "pointer",
                    fontWeight: activeIndex === i ? 700 : 400
                  }}>
                    {e.chapter}::{e.company.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Right - Scrolling Cards */}
        <div 
          className="exp-container" 
          ref={expContainerRef} 
          style={{ flex: 1, minWidth: 0 }}
        >
          {EXPERIENCES.map((exp, i) => (
            <ExpCard key={i} exp={exp} isActive={activeIndex === i} isCompact={isMobile} />
          ))}
        </div>
      </div>
    </div>

      {/* Background Animated Path */}
      <svg style={{ position: "absolute", right: "5%", top: 0, height: "100%", width: 200, zIndex: 0, pointerEvents: "none", opacity: 0.1 }}>
        <path d="M100 0 V4000" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="10 10" style={{ animation: "data-flow 20s linear infinite" }} />
      </svg>

      {/* Mobile swipe-deck view */}
      <style>{`
        @keyframes data-flow { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
        @media (max-width: 992px) {
          .experience-layout { flex-direction: column !important; gap: 1.5rem !important; }
          .experience-side { position: relative !important; top: 0 !important; flex: 1 !important; text-align: center; }
          .experience-title { font-size: clamp(1.8rem, 7vw, 2.5rem) !important; margin-bottom: 1rem !important; }
          .exp-container { 
            overflow-x: auto !important; 
            display: flex !important; 
            gap: 1.25rem !important; 
            scroll-snap-type: x mandatory !important; 
            scrollbar-width: none !important; 
            margin: 0 -1.5rem !important; 
            padding: 1rem 1.5rem 2rem !important; 
            flex-direction: row !important; 
          }
          .exp-container::-webkit-scrollbar { display: none; }
          .exp-container .exp-card { 
            flex: 0 0 calc(86vw - 3rem) !important; 
            scroll-snap-align: center !important; 
            margin-bottom: 0 !important; 
            min-height: 320px !important; 
          }
          .experience-nav { display: none !important; }
        }
      `}</style>
    </section>
  );
}

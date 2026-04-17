"use client";
import { useEffect, useRef, useState } from "react";

const TERMINAL_SCRIPT = [
  {
    cmd: "cat about.json",
    lines: [
      { text: "{", color: "var(--text-sub)" },
      { text: '  "name": "Abdullah Mansoor",', color: "#50fa7b" },
      { text: '  "role": "System Architect & Full-Stack Builder",', color: "#50fa7b" },
      { text: '  "location": "Karachi, PK",', color: "#50fa7b" },
      { text: '  "education": "B.E. Computer Systems (NED) - 2025",', color: "#50fa7b" },
      { text: '  "internships": ["ARY", "Grayhat", "NCL", "KDA"],', color: "#50fa7b" },
      { text: '  "open_to_work": true,', color: "#ff79c6" },
      { text: '  "specialty": "MERN & Applied AI Pipelines"', color: "#50fa7b" },
      { text: "}", color: "var(--text-sub)" },
    ],
  },
  {
    cmd: "ls skills/",
    lines: [
      { text: "mongodb/  express/  react/  next.js/", color: "#50fa7b" },
      { text: "node.js/  javascript/  typescript/  python/", color: "#50fa7b" },
      { text: "nestjs/  docker/  postgresql/", color: "#50fa7b" },
    ],
  },
  {
    cmd: "mission status --live",
    lines: [
      { text: "[ OK ] pipeline integrity: stable", color: "var(--cyan)" },
      { text: "[ OK ] deploy readiness: true", color: "var(--cyan)" },
      { text: "[ OK ] orchestration layer: nominal", color: "var(--cyan)" },
    ],
  },
];

function Terminal() {
  const [scriptIdx, setScriptIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [clearFlash, setClearFlash] = useState(false);
  const [clock, setClock] = useState("");
  const [history, setHistory] = useState([]);
  const [pulseTick, setPulseTick] = useState(0);

  const active = TERMINAL_SCRIPT[scriptIdx];

  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseTick((n) => (n + 1) % 1000);
    }, 220);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let timer;

    if (phase === "typing") {
      if (typedLen < active.cmd.length) {
        timer = setTimeout(() => setTypedLen((n) => n + 1), 42);
      } else {
        timer = setTimeout(() => setPhase("printing"), 350);
      }
    } else if (phase === "printing") {
      if (visibleLines < active.lines.length) {
        timer = setTimeout(() => setVisibleLines((n) => n + 1), 170);
      } else {
        timer = setTimeout(() => setPhase("hold"), 1100);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("reset"), 700);
    } else if (phase === "reset") {
      setClearFlash(true);
      setHistory((prev) => {
        const next = [
          ...prev,
          {
            id: `${Date.now()}-${scriptIdx}`,
            cmd: active.cmd,
            status: "OK",
          },
        ];
        return next.slice(-5);
      });
      setScriptIdx((i) => (i + 1) % TERMINAL_SCRIPT.length);
      setTypedLen(0);
      setVisibleLines(0);
      setPhase("typing");
      timer = setTimeout(() => setClearFlash(false), 120);
    }

    return () => clearTimeout(timer);
  }, [phase, typedLen, visibleLines, active.cmd.length, active.lines.length]);

  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleLines, typedLen, history.length]);

  return (
    <div className="about-terminal" style={{
      background: "#050810",
      border: "1px solid rgba(0,245,212,0.15)",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "var(--font-mono)",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,245,212,0.05)",
      position: "relative",
    }}>
      {/* Title bar */}
      <div style={{
        background: "rgba(0,245,212,0.04)",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid rgba(0,245,212,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
        <span style={{ color: "var(--text-muted)", fontSize: "0.7rem", letterSpacing: "0.1em", marginLeft: "auto" }}>
          abdullah@portfolio ~
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.58rem", color: "var(--cyan)", marginLeft: "0.8rem", opacity: 0.9 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", animation: "pulse 1.4s ease-in-out infinite" }} />
          LIVE
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.58rem", marginLeft: "0.65rem", letterSpacing: "0.08em" }}>
          {clock}
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.45rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(0,245,212,0.02)",
      }}>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {["SYS", "NET", "AI"].map((mode, i) => {
            const activeMode = i === scriptIdx;
            return (
              <span
                key={mode}
                style={{
                  fontSize: "0.56rem",
                  letterSpacing: "0.09em",
                  padding: "0.14rem 0.4rem",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: activeMode ? "rgba(0,245,212,0.45)" : "rgba(255,255,255,0.12)",
                  color: activeMode ? "var(--cyan)" : "var(--text-muted)",
                  background: activeMode ? "rgba(0,245,212,0.08)" : "transparent",
                }}
              >
                {mode}
              </span>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 10 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{
                width: 2,
                height: `${4 + ((pulseTick + i * 3) % 7)}px`,
                background: "var(--cyan)",
                opacity: 0.75,
                borderRadius: 1,
                transition: "height 0.2s linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div 
        className="about-terminal-body" 
        ref={bodyRef}
        style={{ 
          padding: "1.25rem 1.5rem", 
          fontSize: "0.78rem", 
          lineHeight: 1.8, 
          height: 300, 
          overflowY: "auto", 
          display: "flex",
          flexDirection: "column",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style jsx>{`
          .about-terminal-body::-webkit-scrollbar { display: none; }
        `}</style>

        {history.length > 0 && (
          <div style={{ marginBottom: "0.6rem", opacity: 0.55 }}>
            {history.map((entry) => (
              <div key={entry.id} style={{ display: "flex", gap: "0.45rem", fontSize: "0.6rem", lineHeight: 1.4, marginBottom: "0.2rem" }}>
                <span style={{ color: "var(--text-muted)" }}>$</span>
                <span style={{ color: "var(--text-muted)" }}>{entry.cmd}</span>
                <span style={{ marginLeft: "auto", color: "var(--cyan)" }}>[{entry.status}]</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ color: "var(--cyan)" }}>~$</span>
          <span style={{ color: "var(--amber)" }}>{active.cmd.slice(0, typedLen)}</span>
          <span style={{
            display: "inline-block",
            width: 7,
            height: "1em",
            background: "var(--cyan)",
            animation: "blink 1s step-end infinite",
            verticalAlign: "text-bottom",
          }} />
        </div>
        <div style={{ paddingLeft: "0.8rem", marginTop: "0.35rem", flex: 1 }}>
          {active.lines.slice(0, visibleLines).map((line, i) => (
            <div key={`${scriptIdx}-${i}`} style={{ color: line.color || "var(--text-sub)", animation: "terminalLineIn 0.2s ease-out forwards", marginBottom: "0.1rem" }}>
              {line.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", opacity: 0.8, marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--cyan)" }}>~$</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
            [{phase === "typing" ? "parsing command" : phase === "printing" ? "streaming output" : "awaiting next instruction"}]
          </span>
          {(phase === "typing" || phase === "printing") && (
            <span style={{ color: "var(--cyan)", letterSpacing: "0.2em", marginLeft: "0.2rem" }}>...</span>
          )}
        </div>

        <div style={{ marginTop: "auto", height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
          <div
            style={{
              height: "100%",
              width:
                phase === "typing"
                  ? `${(typedLen / Math.max(active.cmd.length, 1)) * 45}%`
                  : phase === "printing"
                  ? `${45 + (visibleLines / Math.max(active.lines.length, 1)) * 45}%`
                  : phase === "hold"
                  ? "96%"
                  : "100%",
              background: "linear-gradient(90deg, var(--cyan), var(--purple))",
              boxShadow: "0 0 12px rgba(0,245,212,0.45)",
              transition: "width 0.18s ease",
            }}
          />
        </div>
      </div>

      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent, rgba(0,245,212,0.55), transparent)",
        animation: "terminalSweep 3.4s linear infinite",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.12) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.004), rgba(0, 255, 0, 0.002), rgba(0, 0, 255, 0.004))",
        backgroundSize: "100% 2px, 3px 100%",
        pointerEvents: "none",
      }} />

      {clearFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,245,212,0.12)",
            pointerEvents: "none",
            animation: "clearFlashAnim 0.12s ease-out forwards",
          }}
        />
      )}
    </div>
  );
}

const TRAITS = [
  { icon: "🚀", label: "Production Mindset", desc: "I ship features that work reliably at scale. Security, performance, and correctness are non-negotiable." },
  { icon: "🧠", label: "Systems Thinking", desc: "Architecture before code. I design clean data models and system boundaries that survive growth." },
  { icon: "🔬", label: "Applied AI", desc: "Bridging the gap between ML research and production systems — from CLIP to Whisper in real pipelines." },
];

export default function About() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTrait, setActiveTrait] = useState(0);
  const traitsRef = useRef(null);
  const scrollFrameRef = useRef(null);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 768);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
            setTimeout(() => el.classList.add("in-view"), i * 100);
          });
        }
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile || !traitsRef.current) return;
    const container = traitsRef.current;

    const syncActive = () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = requestAnimationFrame(() => {
      const cards = container.querySelectorAll(".about-trait-card");
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

      setActiveTrait((prev) => (prev === current ? prev : current));
      });
    };

    const cards = container.querySelectorAll(".about-trait-card");
    const firstCard = cards[0];
    setActiveTrait(0);
    const rafId = requestAnimationFrame(() => {
      if (!firstCard) return;
      container.scrollTo({
        left: firstCard.offsetLeft - (container.offsetWidth - firstCard.offsetWidth) / 2,
        behavior: "auto",
      });
      syncActive();
    });

    container.addEventListener("scroll", syncActive, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
      container.removeEventListener("scroll", syncActive);
    };
  }, [isMobile]);

  return (
    <section id="about" ref={sectionRef} style={{ background: "var(--deep)", padding: isMobile ? "1.3rem 0 2.5rem" : "6rem 0" }}>
      <div className="container">
        <p className="section-eyebrow reveal">02 — About</p>
        <h2 className="section-title reveal">
          The human <em>behind</em> the code
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: isMobile ? "2rem" : "3rem",
          alignItems: "start",
          marginBottom: "3rem",
        }}>
          {/* Terminal */}
          <div className="reveal-left">
            <Terminal />
          </div>

          {/* Text side */}
          <div className="reveal-right">
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}>
              Building things that{" "}
              <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,245,212,0.4)" }}>scale</span>
            </h3>
            <p style={{ color: "var(--text-sub)", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.92rem" }}>
              I am a <strong style={{color:"#fff"}}>Computer Systems Engineer</strong> from NED University (Batch &apos;25), focused on <strong style={{color:"var(--cyan)"}}>Autonomous System Design</strong> and high-performance, full-stack architectures.
            </p>
            <p style={{ color: "var(--text-sub)", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.92rem" }}>
              I build for scale, design for autonomy, and engineer systems where <strong style={{color:"#fff"}}>Full-Stack Development</strong> and intelligent logic are the foundations.
            </p>

            {/* Stats grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              {[
                { num: "04",   label: "Industry Roles" },
                { num: "10+",  label: "Projects Shipped" },
                { num: "MERN", label: "Core Expertise" },
                { num: "AI",   label: "Applied Research" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  style={{
                    borderLeft: "2px solid var(--cyan)",
                    paddingLeft: "1rem",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                  }}
                >
                  <span style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    color: "var(--cyan)",
                    textShadow: "0 0 20px rgba(0,245,212,0.4)",
                    lineHeight: 1.1,
                  }}>{num}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                  }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div
          ref={traitsRef}
          style={{
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: isMobile ? "none" : "repeat(3, minmax(0, 1fr))",
            overflowX: isMobile ? "auto" : "visible",
            scrollSnapType: isMobile ? "x mandatory" : "none",
            scrollbarWidth: isMobile ? "none" : "auto",
            marginLeft: isMobile ? "-1.5rem" : 0,
            marginRight: isMobile ? "-1.5rem" : 0,
            paddingLeft: isMobile ? "2.5rem" : 0,
            paddingRight: isMobile ? "2.5rem" : 0,
            paddingBottom: isMobile ? "1.5rem" : 0,
            paddingTop: isMobile ? "1.5rem" : 0,
            gap: "1.25rem",
            alignItems: "stretch",
          }}
        >
          {TRAITS.map((t, i) => {
            const isActive = isMobile ? (activeTrait === i) : true;
            return (
              <div
                key={t.label}
                className={`card reveal delay-${i + 1} about-trait-card`}
                style={{
                  padding: "1.5rem",
                  width: isMobile ? "min(86vw, 320px)" : "100%",
                  flexShrink: isMobile ? 0 : 1,
                  scrollSnapAlign: isMobile ? "center" : "none",
                  transform: isMobile ? (isActive ? "translateY(-8px) scale(1.02)" : "translateY(6px) scale(0.96)") : "none",
                  opacity: isMobile ? (isActive ? 1 : 0.8) : 1,
                  borderColor: isMobile && isActive ? "rgba(0,245,212,0.5)" : undefined,
                  boxShadow: isMobile && isActive ? "0 18px 40px rgba(0,0,0,0.45), 0 0 20px rgba(0,245,212,0.2)" : undefined,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "rgba(0,245,212,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{t.icon}</div>
                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--text)",
                }}>{t.label}</h4>
                <p style={{ color: "var(--text-sub)", fontSize: "0.85rem", lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes terminalLineIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes terminalSweep {
          0% { transform: translateY(0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(430px); opacity: 0; }
        }
        @keyframes clearFlashAnim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .about-terminal-body {
            font-size: 0.72rem !important;
            line-height: 1.7 !important;
            padding: 1.05rem !important;
            min-height: 250px !important;
          }
          .about-trait-card::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
}

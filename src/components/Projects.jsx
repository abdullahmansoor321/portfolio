"use client";
import { useEffect, useRef, useState } from "react";

/* Animated canvas art for each project */
function ProjectCanvas({ type, color = "#00f5d4" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();

    const draw = () => {
      const w = c.width, h = c.height;
      const t = Date.now() * 0.001;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#070b18";
      ctx.fillRect(0, 0, w, h);

      if (type === "neural") {
        const layers = [3, 5, 5, 3];
        const lx = layers.map((_, i) => (w * (i + 1)) / (layers.length + 1));
        layers.forEach((n, li) => {
          const ys = Array.from({ length: n }, (_, k) => h * (k + 1) / (n + 1));
          if (li < layers.length - 1) {
            const nextYs = Array.from({ length: layers[li + 1] }, (_, k) => h * (k + 1) / (layers[li + 1] + 1));
            ys.forEach((y) => nextYs.forEach((ny) => {
              ctx.beginPath(); ctx.moveTo(lx[li], y); ctx.lineTo(lx[li + 1], ny);
              ctx.strokeStyle = `rgba(0,245,212,${0.05 + 0.02 * Math.sin(t + y / 10)})`; ctx.lineWidth = 0.5; ctx.stroke();
            }));
          }
          ys.forEach((y, ni) => {
            const pulse = 1 + 0.15 * Math.sin(t * 2 + li + ni);
            ctx.beginPath(); ctx.arc(lx[li], y, 3.5 * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,245,212,${0.6 * pulse})`; ctx.fill();
          });
        });
      } else if (type === "bars") {
        const count = 12;
        const bw = (w - 40) / count;
        for (let i = 0; i < count; i++) {
          const bh = (0.2 + 0.7 * Math.abs(Math.sin(t + i * 0.4))) * (h - 40);
          ctx.fillStyle = i % 2 === 0 ? "rgba(139,92,246,0.3)" : "rgba(0,245,212,0.3)";
          ctx.fillRect(20 + i * bw, h - 15 - bh, bw - 3, bh);
        }
      } else if (type === "chat") {
        for (let i = 0; i < 3; i++) {
          const bh = 20, bw = 80, bx = 20 + i * 15, by = 25 + i * 35;
          ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 4); 
          ctx.fillStyle = "rgba(0,245,212,0.1)"; ctx.fill();
          ctx.strokeStyle = "rgba(0,245,212,0.3)"; ctx.stroke();
        }
      } else if (type === "wave") {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 5) {
          const y = h/2 + Math.sin(x/30 + t) * 15 + Math.cos(x/20 - t*1.2) * 10;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(245,158,11,0.5)"; ctx.lineWidth = 2; ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [type]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", opacity: 0.7 }} />;
}

const PROJECTS = [
  {
    id: "actordb",
    name: "ActorDB",
    category: "AI / ML",
    color: "#EE4C2C",
    subtitle: "AI Video Semantic Search Engine",
    desc: "Multi-modal AI tool for semantic video indexing and intelligent content retrieval.",
    longDesc: "ActorDB indexes large-scale video archives for semantic and visual search. It bridges the gap between raw video data and intelligent querying using deep learning benchmarks.",
    highlights: [
      "Integrated WhisperX for diarized audio transcription and NLP dialogue search.",
      "Used CLIP and face recognition for visual scene and actor-based indexing.",
      "Deployed as a Dockerized container with both CLI and React-based GUI interfaces."
    ],
    stack: ["WhisperX", "CLIP", "Python", "ChromaDB", "Docker"],
    canvasType: "neural",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "hrms",
    name: "Enterprise HRMS",
    category: "Full Stack",
    color: "#00f5d4",
    subtitle: "Cloud Workforce Platform",
    desc: "Production-grade HR management system from architecture to cloud transition.",
    longDesc: "A complete HR automation suite developed for ARY Group, managing thousands of audit logs and employee records with precision.",
    highlights: [
      "Led end-to-end development: from ERD design to cloud VM deployment.",
      "Engineered geo-verified check-in/out attendance with administrative mapping.",
      "Implemented comprehensive RBAC and automated payroll reporting systems."
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    canvasType: "bars",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "cipherchat",
    name: "CipherChat",
    category: "Full Stack",
    color: "#8b5cf6",
    subtitle: "Secure Messaging Protocol",
    desc: "Real-time chat system with advanced security auditing and live presence tracking.",
    longDesc: "A robust real-time communication platform built on the MERN stack, prioritizing data integrity and security features.",
    highlights: [
      "Implemented low-latency WebSocket communication with Socket.io presence tracking.",
      "Integrated Arcjet WAF protection for bot mitigation and security headers.",
      "Optimized media delivery via Cloudinary CDN for real-time asset sharing."
    ],
    stack: ["MERN", "Socket.io", "Arcjet", "JWT", "Cloudinary"],
    canvasType: "chat",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "contentflow",
    name: "ContentFlow CMS",
    category: "Full Stack",
    color: "#f59e0b",
    subtitle: "Headless Content Management",
    desc: "A high-performance CMS engine for media outlets and digital publishing.",
    longDesc: "Designed for news agencies, this CMS manages complex publishing workflows and editorial permissions for high-traffic environments.",
    highlights: [
      "Built multi-level RBAC for editors, authors, and administrative oversight.",
      "Auto-generated API documentation using Swagger for seamless integration.",
      "Implemented JWT refresh token rotation for secure session management."
    ],
    stack: ["Node.js", "Express", "Firebase Auth", "Swagger", "PostgreSQL"],
    canvasType: "wave",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "nestjs-bp",
    name: "NestJS Secure Auth",
    category: "Backend",
    color: "#f43f5e",
    subtitle: "Enterprise RBAC Protocol",
    desc: "Production-grade API boilerplate featuring JWT rotation and token revocation logic.",
    longDesc: "A hardened NestJS architecture that implements professional-grade security: JWT refresh-token rotation, device-specific revocation, and Prisma-backed MongoDB integration.",
    highlights: [
      "Engineered refresh-token rotation with secure revocation (single/all device logout).",
      "Built multi-layer RBAC (USER/ADMIN) with strict guard-level protection.",
      "Integrated hardened security middleware: Helmet, CORS allowlist, and Throttling."
    ],
    stack: ["NestJS", "Prisma", "MongoDB", "Swagger", "TypeScript"],
    canvasType: "bars",
    github: "https://github.com/abdullahmansoor321/nest-auth-boilerplate"
  },
  {
    id: "salary-pred",
    name: "Salary Predictor ML",
    category: "AI / ML",
    color: "#10b981",
    subtitle: "Data-Driven Compensation Pipeline",
    desc: "End-to-end machine learning model for salary estimation using market data.",
    longDesc: "A complete data science pipeline that moves from raw data collection to a functional predictive interface.",
    highlights: [
      "Performed NLP feature engineering on raw job posting descriptions.",
      "Trained and optimized a Random Forest regressor for salary estimation.",
      "Developed an interactive dashboard for model visualization using Streamlit."
    ],
    stack: ["Python", "Scikit-Learn", "Pandas", "Streamlit", "Matplotlib"],
    canvasType: "neural",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "task-tracker",
    name: "Task Tracker Lite",
    category: "Full Stack",
    color: "#3b82f6",
    subtitle: "Productivity Engine",
    desc: "Personal task management with secure accounts and real-time status syncing.",
    longDesc: "A streamlined MERN application focused on high-speed task manipulation and secure user state management.",
    highlights: [
      "Secured REST API with JWT-based authentication using http-only cookies.",
      "Implemented smart filtering by status (Pending, Overdue, Completed).",
      "Used Zustand for efficient, zero-boilerplate client-side state management."
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Zustand"],
    canvasType: "bars",
    github: "https://github.com/abdullahmansoor321"
  },
  {
    id: "react-job-board",
    name: "React Job Board",
    category: "Frontend",
    color: "#6366f1",
    subtitle: "Modern Career Portal",
    desc: "Responsive career hunting interface with seamless data loading patterns.",
    longDesc: "A high-fidelity frontend project demonstrating modern React patterns and responsive UI architecture.",
    highlights: [
      "Built with React Router v7 using the modern data loader pattern.",
      "Engineered flexible grid layouts with TailwindCSS and custom utility sets.",
      "Developed complex frontend CRUD logic for real-time listing updates."
    ],
    stack: ["React", "TailwindCSS", "Vite", "JSON Server", "React Router"],
    canvasType: "wave",
    github: "https://github.com/abdullahmansoor321"
  }
];

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend", "AI / ML"];

const projectTagBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  borderRadius: "999px",
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  letterSpacing: "0.05em",
  lineHeight: 1,
  textShadow: "0 0 10px rgba(0,0,0,0.35)",
};

function getProjectTagStyle(color, variant = "stack") {
  if (variant === "category") {
    return {
      ...projectTagBase,
      fontSize: "0.6rem",
      padding: "0.35rem 0.66rem",
      border: `1px solid ${color}99`,
      color,
      background: `linear-gradient(135deg, ${color}2f, rgba(0,0,0,0.65))`,
      boxShadow: `0 8px 18px rgba(0,0,0,0.35), inset 0 0 0 1px ${color}33`,
      backdropFilter: "blur(6px)",
    };
  }

  return {
    ...projectTagBase,
    fontSize: "0.64rem",
    padding: "0.32rem 0.62rem",
    border: `1px solid ${color}77`,
    color,
    background: `linear-gradient(135deg, ${color}22, rgba(255,255,255,0.06))`,
    boxShadow: `inset 0 0 0 1px ${color}2a, 0 2px 10px rgba(0,0,0,0.2)`,
  };
}

function ProjectModal({ project, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 768);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "0.75rem" : "2rem", paddingTop: isMobile ? "calc(var(--nav-h) + 0.75rem)" : "calc(var(--nav-h) + 2rem)", background: "rgba(3,4,10,0.94)", backdropFilter: "blur(24px)", animation: "fadeIn 0.3s forwards",
      overflowY: "auto"
    }}>
      <div style={{
        width: "100%", maxWidth: 820, background: "var(--surface)", border: `1px solid ${project.color}40`,
        borderRadius: isMobile ? "10px" : "16px", overflow: "hidden", position: "relative", animation: "fadeUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        boxShadow: `0 30px 100px rgba(0,0,0,0.8), 0 0 50px ${project.color}15`,
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: "absolute", top: isMobile ? "0.75rem" : "1.5rem", right: isMobile ? "0.75rem" : "1.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50%", width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, color: "var(--text-sub)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
          transition: "all 0.2s",
        }} onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>✕</button>

        <div style={{ display: "flex", flexWrap: "wrap", minHeight: isMobile ? 0 : 480 }}>
          {/* Left Panel - Visuals */}
          <div style={{ flex: "1 1 360px", background: "#050812", position: "relative", minHeight: isMobile ? 190 : 280 }}>
            <ProjectCanvas type={project.canvasType} color={project.color} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent, var(--surface) 95%)` }} />
            <div style={{ position: "absolute", bottom: isMobile ? "1rem" : "2rem", left: isMobile ? "1rem" : "2rem" }}>
              <span style={{ fontSize: "0.6rem", color: project.color, fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}>INTEL_CORE://{project.id.toUpperCase()}</span>
              <h2 style={{ fontSize: isMobile ? "1.5rem" : "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{project.name}</h2>
              <p style={{ color: project.color, fontSize: "0.82rem", fontWeight: 600, marginTop: "0.4rem" }}>{project.subtitle}</p>
            </div>
          </div>

          {/* Right Panel - Data */}
          <div style={{ flex: "1 1 360px", padding: isMobile ? "1.15rem" : "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", background: "rgba(12,17,36,0.2)" }}>
            <div>
              <h4 style={{ color: project.color, fontSize: "0.55rem", fontFamily: "var(--font-mono)", marginBottom: "0.5rem", letterSpacing: "0.15em" }}>__OBJECTIVE</h4>
              <p style={{ color: "#fff", lineHeight: 1.7, fontSize: "0.88rem", opacity: 0.85 }}>{project.longDesc}</p>
            </div>

            <div>
              <h4 style={{ color: project.color, fontSize: "0.55rem", fontFamily: "var(--font-mono)", marginBottom: "0.6rem", letterSpacing: "0.15em" }}>__ENGINEERING_DETAILS</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {project.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.8rem", color: "var(--text-sub)", lineHeight: 1.5 }}>
                    <span style={{ color: project.color, flexShrink: 0 }}>▸</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: project.color, fontSize: "0.6rem", fontFamily: "var(--font-mono)", marginBottom: "1rem", letterSpacing: "0.15em" }}>__TECH_MANIFEST</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.stack.map(s => (
                  <span key={s} style={getProjectTagStyle(project.color, "stack")}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, boxShadow: `0 0 12px ${project.color}` }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "auto", display: "flex", gap: "1rem", flexDirection: isMobile ? "column" : "row" }}>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>View Source</a>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Eject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("impact");
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id || null);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth <= 768);
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (isMobile && filter !== "All") {
      setFilter("All");
    }
  }, [isMobile, filter]);

  // Auto-scroll loop for mobile
  useEffect(() => {
    if (!isMobile || !wrapperRef.current) return;
    const interval = setInterval(() => {
      const container = wrapperRef.current;
      if (!container) return;
      const cardWidth = container.offsetWidth * 0.85; // rough estimate
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isMobile, filter, query, sortMode]);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = PROJECTS.filter((p) => {
    const categoryOk = filter === "All" || p.category === filter;
    if (!normalizedQuery) return categoryOk;
    const haystack = `${p.name} ${p.subtitle} ${p.desc} ${p.category} ${p.stack.join(" ")}`.toLowerCase();
    return categoryOk && haystack.includes(normalizedQuery);
  });

  const scored = [...filtered].sort((a, b) => {
    if (sortMode === "alpha") return a.name.localeCompare(b.name);
    const scoreA = a.highlights.length * 2 + a.stack.length;
    const scoreB = b.highlights.length * 2 + b.stack.length;
    return scoreB - scoreA;
  });

  useEffect(() => {
    if (!scored.length) {
      setActiveId(null);
      return;
    }
    if (!scored.some((p) => p.id === activeId)) {
      setActiveId(scored[0].id);
    }
  }, [activeId, scored]);

  const activeProject = scored.find((p) => p.id === activeId) || scored[0] || null;
  const categoryCounts = CATEGORIES.reduce((acc, val) => {
    acc[val] = val === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === val).length;
    return acc;
  }, {});

  const pickSurprise = () => {
    if (!scored.length) return;
    const candidate = scored[Math.floor(Math.random() * scored.length)];
    setActiveId(candidate.id);
    setSelected(candidate);
  };

  return (
    <section id="projects" style={{ padding: isMobile ? "2.5rem 0" : "7rem 0", background: "var(--void)", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <p className="section-eyebrow">05 — Projects</p>
        <h2 className="section-title">Decoded <em>Operations</em></h2>

        {/* Control Deck */}
        {!isMobile && (
          <div style={{ marginBottom: "2rem", display: "grid", gap: "0.9rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", overflowX: "auto", paddingBottom: "0.25rem", scrollbarWidth: "none" }}>
              {CATEGORIES.map((val) => {
                const count = categoryCounts[val];
                const active = filter === val;
                return (
                  <button
                    key={val}
                    onClick={() => setFilter(val)}
                    className={`btn ${active ? "btn-primary" : "btn-outline"}`}
                    style={{
                      fontSize: "0.65rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      borderColor: active ? "transparent" : "rgba(255,255,255,0.1)",
                      background: active ? "var(--cyan)" : "transparent",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span>{val}</span>
                    <span style={{
                      fontSize: "0.55rem",
                      opacity: active ? 0.75 : 0.55,
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "999px",
                      padding: "0.05rem 0.35rem",
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              display: "grid",
              gap: "0.7rem",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
            }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, stack, or domain..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--text)",
                  borderRadius: "10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.03em",
                  padding: "0.75rem 0.85rem",
                  outline: "none",
                }}
              />

              <button
                className="btn btn-outline"
                onClick={() => setSortMode((m) => (m === "impact" ? "alpha" : "impact"))}
                style={{ justifyContent: "center", fontSize: "0.62rem", minWidth: 158 }}
              >
                {sortMode === "impact" ? "SORT::IMPACT" : "SORT::A_Z"}
              </button>

              <button
                className="btn btn-primary"
                onClick={pickSurprise}
                style={{ justifyContent: "center", fontSize: "0.62rem", minWidth: 158 }}
              >
                SURPRISE_ME
              </button>
            </div>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
            }}>
              <span>VISIBLE::{scored.length.toString().padStart(2, "0")}</span>
              <span>FILTER::{filter.toUpperCase()}</span>
              {activeProject && <span>FOCUS::{activeProject.name.toUpperCase()}</span>}
            </div>
          </div>
        )}

        {/* Dynamic Project Layout */}
        <div className="projects-wrapper" ref={wrapperRef}>
          {scored.map((p) => {
            const isActive = p.id === activeId;
            return (
            <div key={p.id} className="project-card-outer">
              <div
                className="card"
                onMouseEnter={(e) => {
                  setActiveId(p.id);
                  if (isMobile) return;
                  e.currentTarget.style.borderColor = `${p.color}88`;
                  e.currentTarget.style.boxShadow = `0 22px 46px rgba(0,0,0,0.45), 0 0 20px ${p.color}33`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseMove={(e) => {
                  if (isMobile) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
                  const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
                  e.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
                }}
                onMouseLeave={(e) => {
                  if (isMobile) return;
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = isActive ? `${p.color}66` : "var(--border)";
                  e.currentTarget.style.boxShadow = isActive ? `0 18px 40px rgba(0,0,0,0.38), 0 0 14px ${p.color}25` : "";
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${isActive ? `${p.color}66` : "var(--border)"}`,
                  height: "100%",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isActive ? `0 18px 40px rgba(0,0,0,0.38), 0 0 14px ${p.color}25` : "none",
                }}
              >
                <div style={{ height: 160, background: "#050810", position: "relative", overflow: "hidden" }}>
                  <ProjectCanvas type={p.canvasType} color={p.color} />
                  <div style={{ position: "absolute", top: "1rem", left: "1.25rem" }}>
                    <span style={getProjectTagStyle(p.color, "category")}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{
                    position: "absolute",
                    right: "0.8rem",
                    top: "0.8rem",
                    color: "rgba(255,255,255,0.96)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.56rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    padding: "0.25rem 0.45rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.42)",
                    background: "rgba(0,0,0,0.62)",
                  }}>
                    {isActive ? "FOCUS" : "SCAN"}
                  </div>
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{p.name}</h3>
                  <p style={{ color: "var(--text-sub)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.5rem", flex: 1 }}>{p.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.85rem" }}>
                    {p.stack.slice(0, 4).map((tech) => (
                      <span key={tech} style={getProjectTagStyle(p.color, "stack")}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginBottom: "0.95rem", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{
                      width: isActive ? "92%" : "62%",
                      height: "100%",
                      background: `linear-gradient(90deg, ${p.color}, rgba(255,255,255,0.55))`,
                      transition: "width 0.35s ease",
                    }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
                    <button
                      onClick={() => setSelected(p)}
                      className="btn btn-outline"
                      style={{
                        width: "100%",
                        fontSize: "0.6rem",
                        justifyContent: "center",
                        padding: "0.6rem",
                        borderColor: `${p.color}66`,
                        color: isActive ? "#fff" : p.color,
                        background: isActive ? `${p.color}1f` : `${p.color}12`,
                        boxShadow: isActive ? `0 0 16px ${p.color}40` : "none",
                        animation: isActive ? "pulse 1.6s ease-in-out infinite" : "none",
                      }}
                      aria-label={`Open details for ${p.name}`}
                    >
                      {isMobile ? "TAP_TO_DECODE" : "PRESS_TO_DECODE_INTEL"}
                    </button>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.6rem 0.8rem",
                        justifyContent: "center",
                        borderColor: `${p.color}66`,
                        color: p.color,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      GIT
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
          })}

          {scored.length === 0 && (
            <div className="card" style={{ padding: "1.5rem", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.06em" }}>
                NO_MATCH_FOUND :: refine your search query or switch filter mode.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .projects-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .projects-wrapper {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 1.5rem 0;
            margin: 0 -1.5rem;
            padding-left: 2.5rem;
            padding-right: 2.5rem;
            scrollbar-width: none;
            gap: 1.25rem;
          }
          .projects-wrapper::-webkit-scrollbar { display: none; }
          .project-card-outer {
            flex: 0 0 calc(100% - 1.5rem);
            scroll-snap-align: center;
          }
        }
      `}</style>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

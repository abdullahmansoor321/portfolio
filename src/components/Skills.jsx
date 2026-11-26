"use client";
import { useEffect, useRef, useState } from "react";

/* Tech data with reliable icon URLs */
const SKILLS = [
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                    color: "#61DAFB", level: 92 },
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",                  color: "#FFFFFF", level: 90 },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",           color: "#3178C6", level: 85 },
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",                   color: "#339933", level: 88 },
  { name: "NestJS",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",                   color: "#E0234E", level: 83 },
  { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                   color: "#3776AB", level: 87 },
  { name: "PyTorch",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",                 color: "#EE4C2C", level: 75 },
  { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",           color: "#4169E1", level: 84 },
  { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",                 color: "#47A248", level: 80 },
  { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",                   color: "#2496ED", level: 82 },
  { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                         color: "#F05032", level: 90 },
  { name: "Prisma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",                   color: "#5A67D8", level: 85 },
  { name: "Socket.io",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",               color: "#FFFFFF", level: 83 },
  { name: "Supabase",    icon: "https://www.svgrepo.com/show/374111/supabase.svg",                                                color: "#3ECF8E", level: 78 },
  { name: "Vercel",      icon: "https://www.svgrepo.com/show/361653/vercel-logo.svg",                                             color: "#FFFFFF", level: 85 },
  { name: "OpenCV",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",                   color: "#5C3EE8", level: 72 },
  { name: "Tailwind",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",         color: "#06B6D4", level: 88 },
  { name: "Express.js",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",                 color: "#FFFFFF", level: 87 },
  { name: "Firebase",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",                  color: "#FFCA28", level: 78 },
  { name: "Cloudinary",  icon: "https://www.svgrepo.com/show/354046/cloudinary.svg",                                             color: "#3448C5", level: 80 },
  { name: "Jest",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",                          color: "#C21325", level: 74 },
  { name: "Vite",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",                       color: "#646CFF", level: 85 },
  { name: "Zustand",     icon: "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg", color: "#FF9B33", level: 80 },
  { name: "Swagger",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",                  color: "#85EA2D", level: 78 },
  {"name": "JavaScript", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "color": "#F7DF1E"},
  {"name": "PHP", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", "color": "#777BB4"},
  {"name": "Laravel", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", "color": "#FF2D20"},
  {"name": "MySQL", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "color": "#4479A1"},
  {"name": "React Router", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg", "color": "#CA4245"},
  {"name": "Bootstrap", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", "color": "#7952B3"},
  {"name": "DaisyUI", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%235A0EF8%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EDA%3C/text%3E%3C/svg%3E", "color": "#5A0EF8"},
  {"name": "Streamlit", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg", "color": "#FF4B4B"},
  {"name": "Mongoose", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg", "color": "#880000"},
  {"name": "ChromaDB", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FF6F00%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3ECH%3C/text%3E%3C/svg%3E", "color": "#FF6F00"},
  {"name": "pgvector", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%234169E1%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EPG%3C/text%3E%3C/svg%3E", "color": "#4169E1"},
  {"name": "JWT", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FFFFFF%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EJW%3C/text%3E%3C/svg%3E", "color": "#FFFFFF"},
  {"name": "Passport.js", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2334E27A%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EPA%3C/text%3E%3C/svg%3E", "color": "#34E27A"},
  {"name": "bcrypt", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EBC%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "Helmet", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EHE%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "Arcjet", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%238b5cf6%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EAR%3C/text%3E%3C/svg%3E", "color": "#8b5cf6"},
  {"name": "scikit-learn", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", "color": "#F7931E"},
  {"name": "Pandas", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", "color": "#150458"},
  {"name": "NumPy", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", "color": "#013243"},
  {"name": "Matplotlib", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg", "color": "#11557C"},
  {"name": "Sentence-Transformers", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FF9D00%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3ESE%3C/text%3E%3C/svg%3E", "color": "#FF9D00"},
  {"name": "Whisper", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EWH%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "CLIP", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3ECL%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "Postman", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", "color": "#FF6C37"},
  {"name": "Winston", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EWI%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "JSON Server", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EJS%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "ESLint", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg", "color": "#4B32C3"},
  {"name": "Prettier", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23F7B93E%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EPR%3C/text%3E%3C/svg%3E", "color": "#F7B93E"},
  {"name": "Husky", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%2300f5d4%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3EHU%3C/text%3E%3C/svg%3E", "color": "#00f5d4"},
  {"name": "Render", "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Ctext%20x%3D%2215%22%20y%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FFFFFF%22%20font-size%3D%2211%22%20font-family%3D%22monospace%22%3ERE%3C/text%3E%3C/svg%3E", "color": "#FFFFFF"},
];

function SkillCard({ skill, delay }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            if (cardRef.current) cardRef.current.classList.add("in-view");
            if (barRef.current && skill.level != null) barRef.current.style.width = `${skill.level}%`;
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [skill.level, delay]);

  return (
    <div
      ref={cardRef}
      className="card reveal"
      style={{
        padding: "1.4rem 1.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        cursor: "default",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.04)";
        e.currentTarget.style.borderColor = `${skill.color}60`;
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 24px ${skill.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Top glow line on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${skill.color}80, transparent)`,
        opacity: 0,
        transition: "opacity 0.3s",
      }} className="skill-top-line" />

      {/* Icon */}
      <div style={{
        width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `${skill.color}12`,
        border: `1px solid ${skill.color}25`,
        borderRadius: "10px",
        padding: "6px",
        flexShrink: 0,
      }}>
        <img
          src={skill.icon}
          alt={skill.name}
          width={30}
          height={30}
          style={{ objectFit: "contain", filter: skill.color === "#FFFFFF" ? "brightness(0.7)" : "none" }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <span style={{
          display: "none", width: 30, height: 30,
          alignItems: "center", justifyContent: "center",
          color: skill.color, fontFamily: "var(--font-mono)",
          fontSize: "0.65rem", fontWeight: 700
        }}>{skill.name.slice(0, 2).toUpperCase()}</span>
      </div>

      {/* Name */}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "var(--text)",
        letterSpacing: "0.04em",
        textAlign: "center",
        lineHeight: 1.3,
      }}>{skill.name}</span>

      {/* Level bar */}
      {skill.level != null && <div style={{
        width: "100%",
        height: 2,
        background: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
            borderRadius: 2,
            transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: `0 0 6px ${skill.color}80`,
          }}
        />
      </div>}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
          e.target.querySelectorAll(".reveal").forEach((el, i) => {
            setTimeout(() => el.classList.add("in-view"), i * 40);
          });
        }
      }),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const half = Math.ceil(SKILLS.length / 2);
  const row1 = SKILLS.slice(0, half);
  const row2 = SKILLS.slice(half);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: isMobile ? "3rem 0" : "6rem 0", background: "var(--void)", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <p className="section-eyebrow reveal">03 &mdash; Skills</p>
        <h2 className="section-title reveal">
          Tech I&apos;ve <em>worked</em> on
        </h2>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {isMobile ? (
          /* Mobile: Nonstop rotating two-row ticker */
          <>
            <div style={{
              overflow: "hidden",
              marginTop: "0.25rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.02)",
              padding: "1rem 0",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {[row1, row2].map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="skills-ticker-row"
                  style={{
                    marginBottom: rowIdx === 0 ? "0.8rem" : 0,
                    padding: "0 0.9rem",
                  }}
                >
                  <div className={`skills-ticker-track ${rowIdx === 0 ? "ticker-forward" : "ticker-reverse"}`}>
                    {[...row, ...row, ...row].map((s, i) => (
                      <div
                        key={`${s.name}-${rowIdx}-${i}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${s.color}2a`,
                          padding: "0.58rem 1.05rem",
                          borderRadius: "999px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={s.icon}
                          width={18}
                          height={18}
                          alt={s.name}
                          style={{ objectFit: "contain", filter: s.color === "#FFFFFF" ? "brightness(0.75)" : "none" }}
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <span style={{
                          fontSize: "0.82rem",
                          color: "var(--text-sub)",
                          fontFamily: "var(--font-mono)",
                        }}>
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Desktop: SkillCard grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "1.25rem", marginTop: "3rem" }}>
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} delay={i * 40} />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .skills-ticker-row {
          overflow: hidden;
          overflow-y: hidden;
          pointer-events: none;
        }

        .skills-ticker-track {
          display: flex;
          gap: 0.7rem;
          width: max-content;
          will-change: transform;
        }

        .ticker-forward {
          animation: skillsTickerForward 20s linear infinite;
        }

        .ticker-reverse {
          animation: skillsTickerReverse 20s linear infinite;
        }

        @keyframes skillsTickerForward {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes skillsTickerReverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}



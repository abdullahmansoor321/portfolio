"use client";
import { useState, useEffect } from "react";
import HireModal from "./HireModal";

const LINKS = [
  { href: "#about",      label: "About"      },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#education",  label: "Education"  },
  { href: "#contact",    label: "Contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [showHire, setShowHire] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "0 clamp(0.95rem, 2.5vw, 2rem)", height: "var(--nav-h)", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(3,4,10,0.92)" : "rgba(3,4,10,0.4)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(0,245,212,0.08)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <a href="#home" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "1rem", color: "var(--cyan)", textDecoration: "none", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "0.1rem" }}>
          <span style={{ color: "var(--text)" }}>abdullah</span><span style={{ color: "var(--purple)" }}>.</span><span>dev</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={`nav-link${active === href.slice(1) ? " active" : ""}`} style={{ padding: "0.5rem 0.85rem", fontWeight: 500 }}>
              {label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" className="btn btn-outline" style={{ padding: "0.45rem 1rem", marginLeft: "0.75rem", fontSize: "0.68rem", borderColor: "var(--purple)" }}>
            Download CV
          </a>
          <button onClick={() => setShowHire(true)} className="btn btn-primary" style={{ padding: "0.45rem 1.2rem", marginLeft: "0.5rem", fontSize: "0.72rem" }}>
            Hire Me
          </button>
        </div>

        <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} style={{ display: "none", background: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.4rem 0.6rem", cursor: "pointer", color: "var(--cyan)", flexDirection: "column", gap: "4px" }} className="hamburger">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 22, height: 2, background: "var(--cyan)", borderRadius: 2, transition: "all 0.3s", transform: open && i === 0 ? "rotate(45deg) translate(4px,4px)" : open && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none", opacity: open && i === 1 ? 0 : 1 }} />
          ))}
        </button>

        {open && (
          <div style={{ position: "fixed", top: "var(--nav-h)", left: 0, right: 0, maxHeight: "calc(100dvh - var(--nav-h))", overflowY: "auto", background: "rgba(7,11,24,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "1.25rem 1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 999 }}>
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link" style={{ fontSize: "0.94rem", padding: "0.5rem 0.25rem" }} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a href="/resume.pdf" target="_blank" className="btn btn-outline" style={{ justifyContent: "center", width: "100%" }} onClick={() => setOpen(false)}>Download CV</a>
            <button onClick={() => { setOpen(false); setShowHire(true); }} className="btn btn-primary" style={{ justifyContent: "center", width: "100%" }}>Hire Me</button>
          </div>
        )}

        <style>{` @media (max-width: 1024px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } } `}</style>
      </nav>
      {showHire && <HireModal onClose={() => setShowHire(false)} />}
    </>
  );
}

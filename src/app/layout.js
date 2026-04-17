import "./globals.css";

export const metadata = {
  title: "Abdullah Mansoor — Full-Stack Engineer & AI Systems Builder",
  description: "Portfolio of Abdullah Mansoor — Computer Systems Engineer specializing in full-stack web applications and applied AI solutions. Based in Karachi, Pakistan.",
  keywords: ["Abdullah Mansoor", "Full-Stack Developer", "AI Engineer", "React Developer", "Next.js", "Node.js", "NestJS", "Python", "Portfolio", "Karachi"],
  authors: [{ name: "Abdullah Mansoor", url: "mailto:abdullahmansoor221@gmail.com" }],
  openGraph: {
    title: "Abdullah Mansoor — Full-Stack Engineer & AI Systems Builder",
    description: "Computer Systems Engineer building full-stack applications and applied AI solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

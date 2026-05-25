"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isCaseStudy = pathname === '/appreciate' || pathname === '/hamleys' || pathname === '/contraband' || pathname === '/aava';

  // On case study pages, the header background is transparent if we have not scrolled past the hero fold AND the menu is closed.
  const isTransparent = isCaseStudy && !isScrolledPast && !isOpen;

  useEffect(() => {
    // Always reset states when pathname changes
    setIsScrolledPast(false);

    if (!isCaseStudy) {
      return;
    }

    const handleScroll = () => {
      const cur = window.scrollY;
      const threshold = window.innerHeight * 0.9;
      setIsScrolledPast(cur > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Delay the initial scroll check to allow scroll restoration/reset to finish
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname, isCaseStudy]);

  return (
    <header className={`site-header ${isTransparent ? "header-transparent" : ""}`}>
      <Link href="/" className="logo" onClick={(e) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}>
        <img
          src={`/assets/Machinga logo with text.png`}
          alt="Machinga"
          width={206}
          height={44}
          className="header-logo-img"
        />
      </Link>

      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav 
        className={`desktop-nav ${isOpen ? "open" : ""}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/#work" onClick={() => setIsOpen(false)}>Work</Link>
        <Link href="/#statement" onClick={() => setIsOpen(false)}>How We Work</Link>
        <Link href="/#about" onClick={() => setIsOpen(false)}>About</Link>
        <Link href="/#contact" className="nav-contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
      </nav>
    </header>
  );
}

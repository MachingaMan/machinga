"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isHoveredAtTop, setIsHoveredAtTop] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isCaseStudy = pathname === '/appreciate' || pathname === '/hamleys' || pathname === '/contraband' || pathname === '/aava';

  // The header should be hidden only on case study pages AND when scroll is not past threshold AND mouse is not hovered near the top AND menu is not open.
  const isHidden = isCaseStudy && !isScrolledPast && !isHoveredAtTop && !isOpen;

  useEffect(() => {
    // Always reset states when pathname changes to prevent transition/mounting flashes
    setIsScrolledPast(false);
    setIsHoveredAtTop(false);

    if (!isCaseStudy) {
      return;
    }

    const handleScroll = () => {
      const cur = window.scrollY;
      const threshold = window.innerHeight * 0.9;
      setIsScrolledPast(cur > threshold);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const curScroll = window.scrollY;
      const threshold = window.innerHeight * 0.9;
      // If we are scrolled past the fold, the header is statically visible; no hover state needed
      if (curScroll > threshold) {
        return;
      }

      // Check if mouse cursor is within top 80 pixels (height of header is 80px)
      if (e.clientY < 80) {
        setIsHoveredAtTop(true);
      } 
      // Add a buffer: if mouse moves down past 120 pixels, hide header again
      else if (e.clientY > 120) {
        setIsHoveredAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Delay the initial scroll check to allow scroll restoration/reset to finish
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [pathname, isCaseStudy]);

  return (
    <header className={`site-header ${isHidden ? "header-hidden" : ""}`}>
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

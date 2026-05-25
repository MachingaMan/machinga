"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-top">
            <Link href="/" onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}>
              <img 
                src={`/assets/Machinga logo with text.png`} 
                alt="Machinga" 
                width={288} 
                height={61} 
                className="footer-logo-img" 
              />
            </Link>
            <span className="divider">|</span>
            <h4>Think. Make. Run.</h4>
          </div>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/#statement">How we work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="newsletter">
          {!isSubscribed ? (
            <div id="newsletter-content-wrap">
              <p>Get our monthly take on what&apos;s working in content.</p>
              <p className="small-text">Unsubscribe at any time.</p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Email" required />
                <button type="submit" className="btn-gradient">Send It</button>
              </form>
            </div>
          ) : (
            <div id="newsletter-success-message" className="success-message footer-success">
              <h4>Thank you!</h4>
              <p>You&apos;ve successfully subscribed to our newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

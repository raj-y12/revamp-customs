"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Loading from "./loading";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Barlow_Condensed } from 'next/font/google';
import Image from 'next/image';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [_isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const faqItems = [
    {
      question: "Do You Ship Internationally?",
      answer: "Yes! We provide WorldWide Services regardless of your location!"
    },
    {
      question: "Section 2",
      answer: "Your answer for section 2 here."
    },
    {
      question: "Section 3",
      answer: "Your answer for section 3 here."
    }
  ];

  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={barlow.className}>
        {/* Overlay Navigation */}
        <div className={`overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop Now</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>

        <div className={`${!isLoading ? styles.fadeIn : styles.hidden} min-h-screen`} aria-hidden={isLoading}>
          {/* Hero Section */}
          <section className="hero relative w-full h-screen overflow-hidden">
            <nav className="absolute top-0 z-30 w-full flex justify-between items-center px-6 py-4" style={{ padding: "50px", color: "var(--text-inverted)" }}>
              <h1 className="text-5xl font-bold">
                <Link href="/">
                  R<span className="text-[var(--accent-danger)]">3</span>VAMP CUSTOMS
                </Link>
              </h1>
              <div className={`hamburger ${menuOpen ? "change" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </nav>

            <div className="absolute inset-0 flex items-center" style={{ padding: "70px" }}>
              <div className="max-w-xl">
                <h2 className="text-6xl font-bold mb-4 " style={{ color: "var(--text-inverted)" }}>
                  Transform Your Ride
                </h2>
                <p className="text-lg mb-6" style={{ color: "var(--text-inverted)" }}>
                  Built To Stand Out.
                </p>
                <Link href="#mainpage" className="button-primary animate-bounce">
                  Shop Now
                </Link>
              </div>
            </div>
            {/* 
            <div className="bg-[var(--background)] absolute w-full bottom-0 rounded-t-4xl text-center text-[var(--background)] overflow-hidden z-50" style={{boxShadow: '0 20px var(--background);'}}><p className="">↓</p></div>
            */}

          </section>

          {/* Brand Carousel */}
          <div id="mainpage" className="-mt-10 overflow-hidden z-50 relative rounded-t-[40px] bg-[var(--background)]">


            <div className={`${styles.main} w-[85vw] mx-auto mt-25`}>
              <main className="flex flex-col justify-center w-full pt-10" style={{paddingTop: '40px'}}>
                <h2 className="font-bold text-7xl uppercase text-center text-[var(--text-primary)] pb-2 tracking-wide">
                  Shop By Brand
                </h2>
                <h3 className="italic text-center text-base pb-5 text-[var(--text-primary)]" style={{paddingBottom: '20px'}} >
                  Customer Favourites!
                </h3>
                <div className="carousel-container relative">
                  <button className="scroll-button left" onClick={scrollLeft}>
                    &#10094;
                  </button>
                  <div className="scrolling-wrapper-flexbox" ref={carouselRef}>
                    {["audi", "bmw", "mercedes", "vw", "audi", "bmw", "mercedes", "vw"].map((brand, i) => (
                      <div key={i} className="product-tile relative flex justify-start " >
                        <Image src={`/${brand}.jpeg`} alt={brand} width={100} height={100} />
                        <div className="absolute z-10 flex flex-col top-10 left-5">
                          <h5 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-inverted)' }}>{brand.toUpperCase()}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="scroll-button right" onClick={scrollRight}>
                    &#10095;
                  </button>
                </div>

                {/* CTA Section */}
                <div className="text-center items-center" style={{padding: '50px'}}>
                  <h1 className="bap text-2xl sm:text-6xl font-extrabold">BROWSE ALL</h1>
                  <h2 className="bap texl-2xl sm:text-6xl font-extrabold -mt-4" style={{marginTop: "-0.75em"}}>PRODUCTS</h2>
                  <h3 className="text-2xl text-[var(--text-primary)]">Explore Our Vast Collection</h3>
                  <Link href="/shop" className="button-primary w-[70vw] mt-6">
                    Shop Now
                  </Link>
                </div>

                {/* FAQ Section */}
                <div style={{paddingTop: '50px', paddingBottom: '50px'}}>
                  <div className="text-center mb-10" style={{color: 'var(--text-primary'}}>
                    <h2 className="font-bold text-7xl">FAQ</h2>
                    <p className="text-lg">Frequently Asked Questions</p>
                  </div>
                  <div className="faq">
                    {faqItems.map((item, index) => (
                      <div key={index} className="mb-2">
                        <button
                          className={`accordion ${openIndexes.includes(index) ? "active" : ""}`}
                          onClick={() => toggleAccordion(index)}
                        >
                          {item.question}
                        </button>
                        <AnimatePresence initial={false}>
                          {openIndexes.includes(index) && (
                            <motion.div
                              key="content"
                              initial="collapsed"
                              animate="open"
                              exit="collapsed"
                              variants={{ open: { height: "auto", opacity: 1 }, collapsed: { height: 0, opacity: 0 } }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              style={{ overflow: "hidden", padding: "0 18px" }}
                            >
                              <div className="py-4">
                                <p>{item.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Footer */}
          <footer className={`${styles.footer} rounded-t-[40px] flex flex-col items-center bg-[var(--text-primary)]`} style={{ padding: '40px' }}>
            {/* Icons Row */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/r3vamp_customs"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-inverted)' }}
              >
                <FaInstagram size={21} />
              </a>
              <a
                href="https://www.tiktok.com/@r3vamp_customs"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-inverted)' }}
              >
                <FaTiktok size={18} />
              </a>
            </div>

            {/* Text Centered */}
            <span className="text-sm text-[var(--text-inverted)] mt-2 block select-none text-center">
              &copy; {new Date().getFullYear()} R3VAMP CUSTOMS. All rights reserved.
            </span>
          </footer>

        </div>
      </div>
    </>
  );
}
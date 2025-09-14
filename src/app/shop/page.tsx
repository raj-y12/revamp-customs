"use client";

import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Loading from "../loading";
import "../globals.css";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Barlow_Condensed } from 'next/font/google';

import ProductTile from "../components/producttile";
import { products } from "../data/product";
import { Product } from "../types";

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Shop() {
  const [isLoading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
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
          <header className="w-full overflow-hidden bg-[var(--background)]">
            <nav
              className="top-0 z-30 w-full flex justify-between items-center px-6 py-4"
              style={{ padding: "50px", color: "var(--text-primary)" }}
            >
              {/* Left Section */}
              <div className="flex items-center gap-6">
                {/* Search Bar with animated underline */}
                <div className="relative group w-40">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-primary)]"
                    style={{ padding: "6px 0" }}
                  />
                  {/* Static bottom border */}
                  <div className="absolute left-0 bottom-0 w-full border-b border-[var(--text-primary)]"></div>
                  {/* Animated underline on hover/focus */}
                  <div className="absolute left-0 bottom-0 h-[2px] bg-[var(--accent-danger)] w-0 group-hover:w-full group-focus-within:w-full transition-all duration-300"></div>
                </div>

                {/* Contact */}
                <Link href="/contact" className="font-medium">
                  Contact
                </Link>

                {/* Shopping Cart */}
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontSize: "1.2rem",
                  }}
                >
                  🛒
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                {/* Title */}
                <h1 className="text-5xl font-bold">
                  <Link href="/">
                    R<span className="text-[var(--accent-danger)]">3</span>VAMP CUSTOMS
                  </Link>
                </h1>

                {/* Hamburger */}
                <div
                  className={`hamburger ${menuOpen ? "change" : ""}`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </div>
              </div>
            </nav>
          </header>

          <div id="mainpage" className=" overflow-hidden z-50 relative bg-[var(--background)]">
            <div className={`${styles.main} w-[85vw] mx-auto mt-25`}>
              <main className="flex flex-col justify-center w-full pt-10" style={{ paddingTop: '40px' }}>

                {/* Category Buttons */}
                <div className="flex gap-4 justify-center my-6">
                  {["All", "Steering Wheel", "Paddle Shifters", "Key Cases"].map((cat) => (
                    <button
                      key={cat}
                      className={`px-4 py-2 rounded-full ${
                        category === cat
                          ? "bg-[var(--text-primary)] text-white"
                          : "bg-[var(--surface)] text-[var(--text-primary)]"
                      }`}
                      style={{
                        padding: '10px 15px'
                      }}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-3 gap-6 p-8">
                  {products.map((product) => (
                    <Link key={product.id} href={`/shop/${product.slug}`}>
                      <ProductTile key={product.id} product={product} onAddToCart={addToCart} />
                    </Link>
                  ))}
                </div>

              </main>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.page}>

          <footer className={styles.footer}>
            <div className="flex gap-4 items-center justify-center">
              <a href="https://www.instagram.com/r3vamp_customs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                <FaInstagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@r3vamp_customs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                <FaTiktok size={18} />
              </a>
            </div>
            <span className="text-sm text-[var(--text-primary)] mt-4 block select-none text-center">
              &copy; {new Date().getFullYear()} R3VAMP CUSTOMS. All rights reserved.
            </span>
          </footer>
          </div>
        </div>
      </div>
    </>
  );
}
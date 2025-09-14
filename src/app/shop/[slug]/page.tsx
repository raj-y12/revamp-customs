"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../loading";
import "../../globals.css";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Barlow_Condensed } from "next/font/google";
import { products } from "../../data/product";

import {
  Product,
  ColourOption,
  Pattern,
  Brand,
  CenteringStrip,
  Material,
  StitchingColour,
} from "../../types";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  display: "swap",
});

// ------------------------ Smooth Inline Accordion ------------------------
function FAQAccordion({
  items,
}: {
  items: { title: string; value?: string; content: React.ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq" style={{ borderRadius: "6px", overflow: "hidden" }}>
      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ddd" }}>
          <button
            onClick={() => toggle(index)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 600,
              background: "#fff",
              cursor: "pointer",
              padding: "10px",
              textAlign: "left",
            }}
          >
            <span>{item.title}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#555", fontSize: "14px" }}>
              {item.value || "Select"}
              <span>{openIndex === index ? "-" : "+"}</span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "10px" }}>{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product: Product | undefined = products.find((p) => p.slug === slug);

  const [isLoading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || product?.image);

  const [selectedColour, setSelectedColour] = useState<ColourOption | undefined>(
    product?.materials[0].colours[0]
  );
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>(
    product?.fiberStyles[0]
  );
  const [selectedMaterial, setSelectedMaterial] = useState<Material | undefined>(
    product?.materials[0]
  );
  const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>(
    product?.brands[0]
  );
  const [selectedCentering, setSelectedCentering] =
    useState<CenteringStrip | undefined>(product?.centeringStrips[0]);
  const [selectedStitching, setSelectedStitching] =
    useState<StitchingColour | undefined>(product?.stitchingColours[0]);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <p style={{ padding: "20px" }}>Product not found.</p>;

  // ------------------------ Accordion Items ------------------------
  const accordionItems = [
    {
      title: "Material",
      value: selectedMaterial?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.materials.map((mat) => (
            <button
              key={mat.name}
              onClick={() => {
                setSelectedMaterial(mat);
                setSelectedColour(mat.colours[0]);
              }}
              style={{ padding: "10px" }}
            >
              <Image src={mat.image} alt={mat.name} width={70} height={70} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Colour",
      value: selectedColour?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {selectedMaterial?.colours.map((col) => (
            <button
              key={col.name}
              onClick={() => setSelectedColour(col)}
              style={{ padding: "10px" }}
            >
              <div style={{ backgroundColor: col.hex, width: "32px", height: "32px", borderRadius: "50%" }} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Fiber Style",
      value: selectedPattern?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.fiberStyles.map((fiber) => (
            <button
              key={fiber.name}
              onClick={() => setSelectedPattern(fiber)}
              style={{ padding: "10px" }}
            >
              <Image src={fiber.image} alt={fiber.name} width={70} height={70} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Centering Strip",
      value: selectedCentering?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.centeringStrips.map((strip) => (
            <button
              key={strip.name}
              onClick={() => setSelectedCentering(strip)}
              style={{ padding: "10px" }}
            >
              <Image src={strip.image} alt={strip.name} width={70} height={70} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Stitching",
      value: selectedStitching?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.stitchingColours.map((stitch) => (
            <button
              key={stitch.name}
              onClick={() => setSelectedStitching(stitch)}
              style={{ padding: "10px" }}
            >
              <Image src={stitch.image} alt={stitch.name} width={70} height={70} />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Brand",
      value: selectedBrand?.name,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product.brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setSelectedBrand(brand)}
              style={{ padding: "10px" }}
            >
              <Image src={brand.logo} alt={brand.name} width={32} height={32} />
            </button>
          ))}
        </div>
      ),
    },
  ];

  // ------------------------ Render ------------------------
  return (
    <>
      {isLoading && <Loading />}
      <div className={barlow.className}>
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
                    style={{ padding: "6px 0", fontSize: "1.2rem", }}
                  />
                  {/* Static bottom border */}
                  <div className="absolute left-0 bottom-0 w-full border-b border-[var(--text-primary)]"></div>
                  {/* Animated underline */}
                  <div className="absolute left-0 bottom-0 h-[2px] bg-[var(--accent-danger)] w-0 group-hover:w-full group-focus-within:w-full transition-all duration-300"></div>
                </div>

                {/* Contact with animated underline */}
                <div className="relative group">
                  <Link
                    href="/contact"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--text-primary)",
                      fontSize: "1.2rem",
                      padding: "6px 0",
                    }}
                  >
                    Contact
                  </Link>
                </div>

                {/* Cart with animated underline */}
                <div className="relative group">
                  <Link
                    href="/contact"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--text-primary)",
                      fontSize: "1.2rem",
                      padding: "6px 0",
                    }}
                  >
                    Cart
                  </Link>
                </div>
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

          <div className="overflow-hidden z-50 relative bg-[var(--background)]">
            <div className={`${styles.main} w-[70vw] mx-auto mt-25`}>
              <main className="flex flex-col justify-center w-full pt-10">
                <div className="flex flex-col md:flex-row gap-8 text-[var(--text-primary)] " style={{ paddingTop: "20px" }}>
                  {/* Product Image */}
                  <div className="flex flex-col items-center flex-shrink-0 w-[400px] gap-4">
                    <div className="w-full h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={selectedImage || product.image}
                            alt={product.name}
                            width={550}
                            height={550}
                            className="object-cover w-full h-full"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-2 justify-center overflow-x-auto w-full">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          style={{ padding: "10px" }}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            width={60}
                            height={60}
                            className="object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 max-w-full">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="text-2xl mt-2">€{product.price}</p>

                    {/* Accordion */}
                    <div style={{ paddingTop: "20px" }}>
                      <FAQAccordion items={accordionItems} />
                    </div>

                    {/* Upload */}
                    <div className="mt-6">
                      <label style={{ fontWeight: 600 }}>Upload Your Current Steering Wheel</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])}
                        style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                        className=" bg-[var(--surface)] rounded-md"
                      />
                      {uploadedFile && (
                        <div style={{ marginTop: "10px" }}>
                          <p>Selected file: {uploadedFile.name}</p>
                          <img
                            src={URL.createObjectURL(uploadedFile)}
                            alt="Uploaded"
                            style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "6px", marginTop: "5px" }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        backgroundColor: "var(--text-primary)",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Footer */}
          <footer className={styles.footer} style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href="https://www.instagram.com/r3vamp_customs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                <FaInstagram size={21} />
              </a>
              <a href="https://www.tiktok.com/@r3vamp_customs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)' }}>
                <FaTiktok size={18} />
              </a>
            </div>
            <span style={{ fontSize: "14px", marginTop: "10px", color: 'var(--text-primary)', textAlign: "center" }}>
              &copy; {new Date().getFullYear()} R3VAMP CUSTOMS. All rights reserved.
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
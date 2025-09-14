"use client";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.overlay}>
      <img
        src="/wheel.png"
        alt="Loading spinner"
        className={styles.spinner}
      />
    </div>
  );
}

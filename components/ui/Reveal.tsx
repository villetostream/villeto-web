"use client";

import { motion, useReducedMotion } from "motion/react";

// Expo-out easing — snappier and more premium than plain easeOut.
// Used by Ramp, Linear, Vercel, and other top-tier SaaS products.
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  delay = 0,
  className,
  y = 20,
  scale = 0.97,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  scale?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y, scale }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}

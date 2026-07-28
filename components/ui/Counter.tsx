"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import CountUp from "react-countup";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref}>
      {inView ? <CountUp end={value} duration={1.6} suffix={suffix} /> : `0${suffix}`}
    </span>
  );
}

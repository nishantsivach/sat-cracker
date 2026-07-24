"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({
  value,
  format = (n) => Math.round(n).toString(),
  duration = 1,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [value, duration, format]);

  return <span ref={nodeRef}>0</span>;
}
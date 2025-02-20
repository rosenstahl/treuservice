"use client";
import React from "react";
import { motion } from "motion/react";

export default function ColourfulText({ text }: { text: string }) {
  const colors = [
    // Basis Blau (Euer Corporate-Blau)
    "rgb(0, 82, 204)",      

    // Warme, harmonische Farben
    "rgb(255, 126, 0)",     // Leuchtendes Orange
    "rgb(255, 190, 0)",     // Sonnengelb
    "rgb(255, 149, 0)",     // Goldorange
    
    // Kühle, ergänzende Farben
    "rgb(0, 179, 179)",     // Türkis
    "rgb(72, 191, 146)",    // Mintgrün
    "rgb(0, 166, 133)",     // Smaragd
    
    // Lebendige Akzente
    "rgb(241, 90, 35)",     // Korallenrot
    "rgb(255, 105, 97)",    // Lachs
    "rgb(251, 176, 64)",    // Bernstein

    // Elegante Töne
    "rgb(86, 90, 207)",     // Königsblau
    "rgb(144, 19, 254)",    // Violett
    "rgb(0, 158, 253)",     // Himmelblau
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 3500); // Schnellerer Farbwechsel für mehr Dynamik

    return () => clearInterval(interval);
  }, []);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.03, 1],
        filter: ["blur(0px)", `blur(1.5px)`, "blur(0px)"],
        opacity: [1, 0.92, 1],
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.02,
        ease: "easeInOut"
      }}
      className="inline-block whitespace-pre font-bold tracking-tight"
    >
      {char}
    </motion.span>
  ));
}
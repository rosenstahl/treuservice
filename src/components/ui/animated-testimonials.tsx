"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  key?: string;  // Füge key als optionalen Parameter hinzu
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  // Erstelle ein Array mit Rotationswerten, anfänglich alle auf 0
  const [rotations, setRotations] = useState(() => 
    testimonials.map(() => 0)
  );

  // Nach der Hydration die Rotationen generieren
  useEffect(() => {
    // Nur clientseitig zufällige Rotationen generieren
    if (typeof window !== 'undefined') {
      setRotations(testimonials.map(() => 
        Math.floor(Math.random() * 21) - 10
      ));
    }
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-10 relative z-0">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
					key={testimonial.key || `${testimonial.name}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: 0, // Initialer Wert ist 0, kein randomRotateY mehr
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index], // Verwende vorberechneten Wert
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index], // Verwende vorberechneten Wert
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="relative min-h-[340px] py-2">
          {/* Content Container with fixed height */}
          <div className="h-[230px] mb-16">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold text-secondary">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-secondary/70">
                {testimonials[active].designation}
              </p>
              <motion.p className="text-lg text-secondary/80 mt-4">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
          {/* Fixed position navigation buttons */}
          <div className="absolute bottom-0 left-0 flex gap-4">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-secondary group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-secondary group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
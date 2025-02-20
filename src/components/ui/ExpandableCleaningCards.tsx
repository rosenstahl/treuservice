"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { H3, Paragraph } from "@/components/ui/typography";

interface CleaningService {
  title: string;
  tileText: string;
  description: string;
  leistungen?: string[];
  image?: string;
}

interface ExpandableCleaningCardsProps {
  services: CleaningService[];
}

export default function ExpandableCleaningCards({ services }: ExpandableCleaningCardsProps) {
  const [active, setActive] = useState<CleaningService | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const getLeistungen = (service: CleaningService) => {
    return service.leistungen || [];
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-8 w-8 shadow-lg"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[700px] h-full md:h-auto md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative h-48 md:h-64">
                <Image
                  priority
                  fill
                  src={active.image || "/images/reinigung/placeholder.jpg"}
                  alt={active.title}
                  className="object-cover"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-auto">
                <div className="p-6">
                  <motion.div layoutId={`title-container-${active.title}-${id}`}>
                    <H3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                      {active.title}
                    </H3>
                    <Paragraph className="text-muted-foreground mb-6 text-sm">
                      {active.description}
                    </Paragraph>
                  </motion.div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-3">Einsatzgebiete</h4>
                      <Paragraph className="text-sm text-muted-foreground">
                        {active.tileText}
                      </Paragraph>
                    </div>

                    {getLeistungen(active).length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-3">Leistungen</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {getLeistungen(active).map((leistung, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                              <span className="text-sm">{leistung}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto p-6 bg-neutral-50 dark:bg-neutral-800">
                  <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                    Angebot anfordern
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="space-y-4">
        {services.map((service) => (
          <motion.div
            layoutId={`card-${service.title}-${id}`}
            key={service.title}
            onClick={() => setActive(service)}
            className="p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <motion.div layoutId={`title-container-${service.title}-${id}`} className="flex gap-6">
              <motion.div layoutId={`image-${service.title}-${id}`} className="hidden md:block shrink-0">
                <Image
                  width={120}
                  height={80}
                  src={service.image || "/images/reinigung/placeholder.jpg"}
                  alt={service.title}
                  className="h-24 w-32 rounded-lg object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <H3 className="text-lg font-semibold text-primary mb-2">
                  {service.title}
                </H3>
                <div className="flex flex-nowrap overflow-hidden gap-2 mb-4">
                  {getLeistungen(service).slice(0, 3).map((leistung, index) => (
                    <Badge key={index} variant="secondary" className="shrink-0 font-normal whitespace-nowrap">
                      {leistung}
                    </Badge>
                  ))}
                  {getLeistungen(service).length > 3 && (
                    <Badge variant="secondary" className="shrink-0 font-normal whitespace-nowrap">
                      +{getLeistungen(service).length - 3} weitere
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-end text-primary">
                  <span className="text-sm">Details ansehen</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface SecurityService {
  title: string;
  tileText: string;
  description: string;
  leistungen?: string[];
  image?: string;
  icon?: string;
}

interface SecurityCardsProps {
  services: SecurityService[];
  labels: {
    einsatzgebiete: string;
    leistungen: string;
    details: string;
    angebotAnfordern: string;
  };
  expandedCard?: string | null;
  setExpandedCard?: (service: string | null) => void;
}

const ExpandableSecurityCards = ({ 
  services, 
  labels,
  expandedCard,
  setExpandedCard 
}: SecurityCardsProps) => {
  const [active, setActive] = useState<SecurityService | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Wenn expandedCard geändert wird, aktualisiere den active state
  useEffect(() => {
    if (expandedCard) {
      const serviceToActivate = services.find(
        service => service.title.toLowerCase().replace(/\s+/g, '-') === expandedCard
      );
      if (serviceToActivate) {
        setActive(serviceToActivate);
      }
    } else if (expandedCard === null) {
      setActive(null);
    }
  }, [expandedCard, services]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        setExpandedCard?.(null);
      }
    };

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, setExpandedCard]);

  useOutsideClick(ref, () => {
    setActive(null);
    setExpandedCard?.(null);
  });

  const getLeistungen = (service: SecurityService) => service.leistungen || [];

  const handleCardClick = (service: SecurityService) => {
    const serviceId = service.title.toLowerCase().replace(/\s+/g, '-');
    setActive(service);
    setExpandedCard?.(serviceId);
  };

  // Diese Funktion leitet zum Kontaktformular unten auf der Seite weiter
  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
    setActive(null); // Schließe den Dialog
    setExpandedCard?.(null); // Reset expandedCard
  };

  return (
    <>
      {/* Hintergrund-Dim und Blur, wenn das Popup aktiv ist */}
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

      {/* Popup-Fenster (Detailansicht) */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-primary-light rounded-full h-8 w-8 shadow-lg z-50"
              onClick={() => {
                setActive(null);
                setExpandedCard?.(null);
              }}
            >
              <X className="w-5 h-5 text-secondary" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[700px] h-full md:h-auto md:max-h-[90%] flex flex-col bg-primary-light rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative h-48 md:h-64"
              >
                <Image
                  priority
                  fill
                  src={
                    active.image ||
                    `/images/security/${active.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
                  }
                  alt={active.title}
                  className="object-cover"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-auto">
                <div className="p-6 space-y-6">
                  <motion.div layoutId={`title-container-${active.title}-${id}`}>
                    <H3 className="text-xl md:text-2xl font-bold text-secondary">
                      {active.title}
                    </H3>
                    <Paragraph className="text-secondary/70 text-sm">
                      {active.description}
                    </Paragraph>
                  </motion.div>

                  {active.tileText && (
                    <div className="space-y-2">
                      <Paragraph className="font-semibold text-secondary/80 text-sm">
                        {labels.einsatzgebiete}
                      </Paragraph>
                      <Paragraph className="text-sm text-secondary/70">
                        {active.tileText}
                      </Paragraph>
                    </div>
                  )}

                  {getLeistungen(active).length > 0 && (
                    <div className="space-y-2">
                      <Paragraph className="font-semibold text-secondary/80 text-sm">
                        {labels.leistungen}
                      </Paragraph>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {getLeistungen(active).map((leistung, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                            <span className="text-sm text-secondary/80">
                              {leistung}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto p-6 bg-primary">
                  <button 
                    className="w-full bg-accent hover:bg-accent-hover text-primary-light py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
                    onClick={scrollToContact}
                  >
                    {labels.angebotAnfordern}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Frontseite – Kartenliste */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const serviceId = service.title.toLowerCase().replace(/\s+/g, '-');
          return (
            <motion.div
              layoutId={`card-${service.title}-${id}`}
              key={service.title}
              data-service-name={serviceId}
              onClick={() => handleCardClick(service)}
              className={cn(
                "p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 rounded-xl cursor-pointer",
                expandedCard === serviceId && "ring-2 ring-primary"
              )}
            >
              <div className="flex gap-4 flex-row w-full md:w-auto">
                <motion.div layoutId={`image-${service.title}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={
                      service.image ||
                      `/images/security/${service.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
                    }
                    alt={service.title}
                    className="h-16 w-16 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div>
                  <motion.h3
                    layoutId={`title-${service.title}-${id}`}
                    className="font-medium text-neutral-800 text-left"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${service.title}-${id}`}
                    className="text-neutral-600 text-left line-clamp-2"
                  >
                    {service.description.split(".")[0]}.
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${service.title}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-accent hover:text-white text-black mt-4 md:mt-0 self-end md:self-auto"
              >
                {labels.details}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default ExpandableSecurityCards;
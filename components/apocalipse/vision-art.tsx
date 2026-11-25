"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { getVision, visions } from "@/lib/apocalipse";
import { atlasSrc } from "@/lib/imagery";

export function VisionArt({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const vision = getVision(slug) ?? visions[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-14, 14]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.04, 1.07, 1.1]);

  return (
    <figure
      ref={ref}
      className="relative overflow-hidden rounded-[1.5rem] border border-gold/25 bg-[#0b1018] shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <motion.div
          style={{ y, scale: scrollScale }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.div
            initial={false}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: [1.01, 1.05, 1.01] }
            }
            transition={
              reduce
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.7, ease: "easeOut" },
                    scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="relative h-full w-full"
          >
            <Image
              src={atlasSrc(vision.image)}
              alt={vision.alt}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14]/45 via-transparent to-[#090d14]/15" />
        <div className="pointer-events-none absolute inset-3 rounded-[1rem] border border-gold/20" />
      </div>
    </figure>
  );
}

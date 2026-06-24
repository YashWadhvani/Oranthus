"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    duration?: number;
    delay?: number;
    distance?: number;
    className?: string;
    once?: boolean;
    layout?: boolean | "position" | "size";
}

export default function ScrollReveal({
    children,
    direction = "up",
    duration = 0.6,
    delay = 0,
    distance = 25,
    className = "",
    once = true,
    layout
}: ScrollRevealProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    };

    const initial = {
        opacity: 0,
        ...directions[direction]
    };

    const animate = {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration,
            delay,
            ease: [0.215, 0.61, 0.355, 1] as const // Custom premium cubic-bezier easeOut
        }
    };

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once, margin: "-10% 0px" }}
            className={className}
            layout={layout}
        >
            {children}
        </motion.div>
    );
}

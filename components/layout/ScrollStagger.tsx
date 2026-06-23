"use client";

import React, { ReactNode, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface ScrollStaggerProps {
    children: ReactNode;
    staggerDelay?: number;
    delay?: number;
    className?: string;
    once?: boolean;
}

interface ScrollStaggerItemProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    className?: string;
}

const StaggerContext = createContext<boolean>(false);

export function ScrollStagger({
    children,
    staggerDelay = 0.08,
    delay = 0,
    className = "",
    once = true
}: ScrollStaggerProps) {
    const parentVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    };

    return (
        <StaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once, margin: "-10% 0px" }}
                variants={parentVariants}
                className={className}
            >
                {children}
            </motion.div>
        </StaggerContext.Provider>
    );
}

export function ScrollStaggerItem({
    children,
    direction = "up",
    distance = 20,
    className = ""
}: ScrollStaggerItemProps) {
    const isInsideParent = useContext(StaggerContext);

    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            ...directions[direction]
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.55,
                ease: [0.215, 0.61, 0.355, 1] as const
            }
        }
    };

    if (!isInsideParent) {
        // Fallback to normal ScrollReveal if item is used standalone
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px" }}
                variants={itemVariants}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

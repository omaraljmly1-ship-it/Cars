"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Wrench, Wind, Gauge, Compass, Shield, Car } from "lucide-react";

const iconsList = [Settings, Wrench, Wind, Gauge, Car, Shield, Compass];

export default function FloatingIconsBackground() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    // Generate icons randomly. Doing this in useEffect prevents hydration mismatch.
    const generatedIcons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      Icon: iconsList[Math.floor(Math.random() * iconsList.length)],
      size: Math.random() * 30 + 20, // size 20 to 50
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 20, // 20s to 40s to fall
      delay: Math.random() * -30, // start at different points
      opacity: Math.random() * 0.1 + 0.05, // 0.05 to 0.15
    }));
    
    setIcons(generatedIcons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-gold"
          style={{
            left: item.left,
            filter: "drop-shadow(0 0 10px rgba(212, 168, 83, 0.7))",
          }}
          initial={{ y: "-20vh", opacity: item.opacity, rotate: 0 }}
          animate={{
            y: "120vh",
            opacity: [item.opacity, item.opacity * 2.5, item.opacity],
            rotate: 360,
          }}
          transition={{
            y: {
              duration: item.duration,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            },
            opacity: {
              duration: item.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            },
            rotate: {
              duration: item.duration * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: item.delay,
            }
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}

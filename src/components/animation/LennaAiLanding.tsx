import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import HomepageFeatures from "../HomepageFeatures";
import ButtonDocs from "./buttonDocs/ButtonDocs";

export default function LennaAiLanding() {
  const [theme, setTheme] = useState("light");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1]);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(document.documentElement.dataset.theme || "light");
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-800 text-white"
    : "bg-gradient-to-b from-gray-100 via-slate-100 to-gray-50 text-gray-900";

  return (
    <div
      ref={containerRef}
      className={`pt-0 min-h-screen w-full relative overflow-hidden ${bgClass}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? "bg-white" : "bg-blue-400"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.8,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-10 ">
        <svg width="100%" height="100%" className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke={
                isDark ? "rgba(255,255,255,0.4)" : "rgba(59, 130, 246, 0.2)"
              }
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div
        ref={heroRef}
        className="relative h-[68vh] md:h-[78vh] w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-30 "
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${
              mousePosition.y * 30
            }px) scale(1.2)`,
          }}
        />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-6 ${
              isDark
                ? "bg-blue-500/10 border border-blue-500/20"
                : "bg-blue-100/80 border border-blue-200"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full mr-2 ${
                isDark ? "bg-blue-500" : "bg-blue-600"
              } animate-pulse`}
            ></span>
            <span className="text-sm font-medium">Lenna Documentation</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="bg-clip-text  bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
              Lenna
            </span>
            <motion.span
              className={`${isDark ? "text-blue-500" : "text-blue-600"} ml-2`}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .docs
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Transforming Documentation with{" "}
            <motion.span
              className="font-semibold bg-clip-text  bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Artificial Intelligence
            </motion.span>
          </motion.p>

          <motion.p
            className={`text-lg mb-10 max-w-2xl mx-auto ${
              isDark ? "opacity-80" : "opacity-90 text-gray-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Automate, analyze, and enhance your Lenna <b>documentation</b> with
            our cutting-edge AI technology designed for the modern enterprise.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <ButtonDocs darkMode={isDark} />

            {/* <motion.a
              href="#demo"
              className={`px-8 py-4 rounded-xl font-medium ${
                isDark
                  ? "border border-blue-500/30 bg-white/10 backdrop-blur-sm text-blue-500 hover:bg-blue-500/10"
                  : "border border-blue-400 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50" // Lebih terang di light mode
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Documentation
            </motion.a> */}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10"
      >
        <HomepageFeatures />
      </motion.div>
    </div>
  );
}

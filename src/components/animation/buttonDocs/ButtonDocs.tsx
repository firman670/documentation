import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type ButtonDocsProps = {
  darkMode: boolean;
};

export default function ButtonDocs({ darkMode }: ButtonDocsProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [0, 4, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.a
      href="/docs/category/getting-started"
      className={`relative px-8 py-4 rounded-xl font-medium transition-colors ${
        darkMode ? "bg-[#2a68ee]" : "bg-[#1B84FF]"
      } text-white overflow-hidden group`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => {
        controls.start({
          x: 6,
          transition: { duration: 0.3, ease: "easeOut" },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          x: [0, 4, 0],
          transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          },
        });
      }}
    >
      <span className="relative z-10 flex items-center px-8">
        Read the Docs
        <motion.svg
          animate={controls}
          className="ml-2"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
    </motion.a>
  );
}

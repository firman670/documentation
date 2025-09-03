import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import { motion } from "framer-motion";

import styles from "./index.module.css";
import LennaAiLanding from "../components/animation/LennaAiLanding";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Explore Lenna AI SDK & Documentation for chat automation, NLP, and more."
    >
      <div
        className={clsx(
          "relative flex flex-col items-center text-center overflow-hidden py-0 transition-colors duration-300",
          "bg-gradient-to-br from-[#f4f6f8] to-[#e1e8ed] text-gray-900",
          "dark:from-[#0f1115] dark:to-[#1a1c1e] dark:text-white"
        )}
      >
        <LennaAiLanding />
      </div>
    </Layout>
  );
}

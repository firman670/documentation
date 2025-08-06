import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import { motion } from "framer-motion";

import styles from "./index.module.css";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Explore Lenna AI SDK & Documentation for chat automation, NLP, and more."
    >
      <div className={clsx("hero", styles.heroBanner)}>
        <div className={styles.featuresWrapper}>
          {/* <div className="container text--center"> */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
              {siteConfig.title}
            </Heading>
          </motion.div>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.ctaButton
              )}
              to="/docs/intro"
            >
              🚀 Get Started
            </Link>
          </motion.div>
          {/* </div> */}
        </div>

        <HomepageFeatures />
      </div>
    </Layout>
  );
}

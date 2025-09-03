import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Lenna.ai was designed from the ground up to be easily installed and used
        to get your AI documentation up and running quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Lenna.ai lets you focus on your documents while we handle the technical
        details. Go ahead and organize your docs with our intuitive system.
      </>
    ),
  },
  {
    title: "Powered by React",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Extend or customize your documentation layout by reusing React. Lenna.ai
        can be extended while maintaining a consistent interface.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div
        className={clsx(
          "rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:shadow-xl",
          "dark:bg-slate-900/30 dark:border-white/10 dark:hover:bg-slate-900/50",
          "bg-white/70 bg-opacity-70 border-gray-200/80 backdrop-blur-sm hover:bg-white/90"
        )}
      >
        <div className="text-lg font-semibold mb-3 dark:text-white text-slate-800">
          {title}
        </div>
        <div className="text-sm dark:text-gray-300 text-slate-600 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section
      className={clsx(
        "flex items-center w-full py-4 md:py-8 bg-transparent",
        "dark:bg-transparent"
      )}
    >
      <div className=" mx-auto px-4">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

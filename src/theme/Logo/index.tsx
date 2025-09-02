import React, { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig, type NavbarLogo } from "@docusaurus/theme-common";
import ThemedImage from "@theme/ThemedImage";
import type { Props } from "@theme/Logo";
import { useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  return (
    <ThemedImage
      className={imageClassName}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
}

export default function Logo(props: Props): ReactNode {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { colorMode } = useColorMode();
  const location = useLocation();

  const logoLink = useBaseUrl(logo?.href || "/");
  const isActive = location.pathname === logoLink;

  return (
    <Link
      to={logoLink}
      className={`flex items-center gap-2 transition-transform duration-200 ${
        isActive ? "scale-105" : "hover:scale-105"
      }`}
    >
      <div
        className={`flex items-center justify-center h-8 w-8 rounded-xl font-bold transition-all duration-300
        ${
          colorMode === "dark"
            ? isActive
              ? "bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-purple-500/40 ring-2 ring-purple-400/50"
              : "bg-transparent backdrop-blur-sm shadow-lg shadow-purple-900/30 ring-1 ring-white/10"
            : isActive
            ? "bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-blue-400/50 ring-2 ring-blue-400/40"
            : "bg-transparent backdrop-blur-sm shadow-lg shadow-blue-500/20 ring-1 ring-black/10"
        }`}
      >
        {logo ? (
          <LogoThemedImage
            logo={logo}
            alt={logo.alt ?? title}
            imageClassName="h-full w-full object-cover rounded-full"
          />
        ) : (
          title.charAt(0).toUpperCase()
        )}
      </div>
      <span
        className={`text-base font-semibold tracking-wide transition-colors ${
          colorMode === "dark"
            ? isActive
              ? "text-purple-300"
              : "text-gray-200 hover:text-purple-300"
            : isActive
            ? "text-blue-600"
            : "text-gray-800 hover:text-blue-600"
        }`}
      >
        {navbarTitle ?? title}
      </span>
    </Link>
  );
}

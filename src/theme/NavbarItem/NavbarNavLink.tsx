import React, { useEffect, useState, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type { Props } from "@theme/NavbarItem/NavbarNavLink";

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}: Props): ReactNode {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}

  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.dataset.theme
      : "light"
  );

  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isExternalLink = label && href && !isInternalUrl(href);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDarkTheme = theme === "dark";

  const navLinkClass = `px-3 py-2 rounded-md font-medium transition-colors text-sm ${
    isDarkTheme
      ? "text-gray-300 hover:text-white hover:bg-gray-800"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
  }`;

  const buttonClass = `px-4 py-2 rounded-md font-medium transition-colors text-sm ${
    isDarkTheme
      ? "bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-cyan-900/40 hover:from-blue-600 hover:to-cyan-500"
      : "bg-gradient-to-tr from-blue-500 to-indigo-400 text-white shadow-blue-500/40 hover:from-blue-600 hover:to-indigo-500"
  }`;

  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <>
            <span
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isExternalLink
                  ? "inline-flex items-center gap-1"
                  : "hover:text-blue-500 dark:hover:text-cyan-400"
              }`}
            >
              {label}
            </span>
            {isExternalLink && (
              <IconExternalLink
                {...(isDropdownLink && { width: 12, height: 12 })}
                className="ml-1 inline-block opacity-80"
              />
            )}
          </>
        ),
      };

  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}

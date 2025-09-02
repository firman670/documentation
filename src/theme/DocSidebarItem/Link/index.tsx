import React, { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type { Props } from "@theme/DocSidebarItem/Link";

import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  console.log("props", item.customProps);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item pl-2",
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          "menu__link !text-sm !text-gray-400 dark:!text-gray-400",
          !isInternalLink && styles.menuExternalLink,
          {
            "menu__link--active": isActive,
            "!text-sm !text-gray-400": level > 1,
          }
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {typeof item?.customProps?.icon === "string" && (
          <span className="mr-2 flex-shrink-0">
            {(item.customProps!.icon as string).startsWith("/") ? (
              <img
                src={useBaseUrl(
                  `/img/icon/${item.customProps!.icon as string}`
                )}
                alt=""
                className="w-4 h-4"
              />
            ) : (
              (item.customProps!.icon as string)
            )}
          </span>
        )}

        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}

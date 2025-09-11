import React, { type ReactNode } from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import type { Props } from "@theme/NavbarItem/DefaultNavbarItem/Desktop";

export default function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: Props): ReactNode {
  // console.log(props);
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem
          ? "dropdown__link hover:text-[#2A68EE] dark:hover:text-[#2A68EE]"
          : "navbar__item navbar__link hover:text-[#2A68EE] dark:hover:text-[#2A68EE]",
        className
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
}

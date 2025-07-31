import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

export default function FooterLayout(props) {
  const { style, links, copyright } = props;
  const logo = props.logo || props?.themeConfig?.footer?.logo;

  console.log(logo);

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, "footer", {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom">
            {logo && (
              <div
                className="footer__logo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={
                    logo.src ||
                    "https://platform.lenna.ai/assets/logo-icon-84970a46.svg"
                  }
                  alt={logo.alt || "Lenna Ai Logo"}
                  width={logo.width || 80}
                  height={logo.height || 40}
                />
                <span
                  style={{
                    marginLeft: "8px",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {logo.title || "Lenna.ai"}
                </span>
              </div>
            )}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}

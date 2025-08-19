import React, { memo, type ReactNode } from "react";
import {
  DocSidebarItemsExpandedStateProvider,
  useVisibleSidebarItems,
} from "@docusaurus/plugin-content-docs/client";
import DocSidebarItem from "@theme/DocSidebarItem";

import type { Props } from "@theme/DocSidebarItems";

function DocSidebarItems({ items, ...props }: Props): ReactNode {
  const visibleItems = useVisibleSidebarItems(items, props.activePath);

  console.log(props);

  return (
    <DocSidebarItemsExpandedStateProvider>
      {visibleItems.map((item, index) => {
        const isRootCategory = item.type === "category" && props.level === 1;

        return (
          <React.Fragment key={index}>
            {isRootCategory && (
              <p
                style={{
                  color: "#b0b0b0",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 0,
                  paddingLeft: 12,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </p>
            )}
            <DocSidebarItem item={item} index={index} {...props} />
          </React.Fragment>
        );
      })}
    </DocSidebarItemsExpandedStateProvider>
  );
}

export default memo(DocSidebarItems);

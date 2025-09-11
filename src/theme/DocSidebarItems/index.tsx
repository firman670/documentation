import React, { memo, type ReactNode } from "react";
import {
  DocSidebarItemsExpandedStateProvider,
  useVisibleSidebarItems,
} from "@docusaurus/plugin-content-docs/client";
import DocSidebarItem from "@theme/DocSidebarItem";

import type { Props } from "@theme/DocSidebarItems";

function DocSidebarItems({ items, ...props }: Props): ReactNode {
  const visibleItems = useVisibleSidebarItems(items, props.activePath);

  // console.log(props);

  return (
    <DocSidebarItemsExpandedStateProvider>
      {visibleItems.map((item, index) => {
        const isRootCategory = item.type === "category" && props.level === 1;

        return (
          <React.Fragment key={index}>
            {isRootCategory && item.customProps?.title && (
              <p
                className={`
      text-sm font-bold font-sans tracking-wide transition-colors pl-3 mb-0
      text-[#333] dark:text-[#f6f6f6]
      ${item.customProps?.title !== " " ? "mt-6" : "mt-0"}
    `}
              >
                {item.customProps.title as string}
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

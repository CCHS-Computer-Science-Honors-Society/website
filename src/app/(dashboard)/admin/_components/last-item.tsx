"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { captilize } from "@/lib/utils";

function GetLastBreadCrumb() {
  const pathname = usePathname();
  let ending = pathname[-1];

  if (ending === "admin" || ending === undefined) {
    ending = "Overview";
  }

  return <div>{captilize(ending)}</div>;
}

export default memo(GetLastBreadCrumb);

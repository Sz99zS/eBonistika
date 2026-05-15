"use client";

import type { ReactNode } from "react";

import { useHeaderAction, usePageBreadcrumbs, type Crumb } from "./AppContext";

export function PageMeta({
  breadcrumbs,
  headerAction = null,
}: {
  breadcrumbs: Crumb[];
  headerAction?: ReactNode;
}) {
  usePageBreadcrumbs(breadcrumbs);
  useHeaderAction(headerAction);
  return null;
}

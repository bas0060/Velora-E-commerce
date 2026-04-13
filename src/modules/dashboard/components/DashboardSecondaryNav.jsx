import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Converts a URL segment into a human-readable label.
 * e.g. "product-detail" → "Product Detail"
 */
const toLabel = (segment) =>
  segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const DashboardSecondaryNav = () => {
  const { pathname } = useLocation();

  // Split pathname into segments, remove empty strings
  // e.g. "/dashboard/orders/123" → ["dashboard", "orders", "123"]
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="px-6 md:px-8 py-3 border-b border-gray-200 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Always start with Home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-gray-500 hover:text-gray-800 text-sm">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            // Build the cumulative href up to this segment
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = toLabel(segment);

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-sm font-medium text-gray-900">
                      {label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        to={href}
                        className="text-gray-500 hover:text-gray-800 text-sm"
                      >
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DashboardSecondaryNav;

import React from "react";
import { Header } from "./Header";
import { useWishlistStore } from "../../store/wishlistStore";
import { formatCurrency } from "../../utils/formatCurrency";

interface LayoutProps {
  children: React.ReactNode;
  onAddItem: () => void;
  onFilterClick: () => void;
}

export function Layout({ children, onAddItem, onFilterClick }: LayoutProps) {
  const { totalPrice, filters } = useWishlistStore();

  const activeFilters = [];
  if (filters.category) activeFilters.push(filters.category);
  if (filters.source) activeFilters.push(`from ${filters.source}`);
  if (filters.priority) activeFilters.push(`${filters.priority} priority`);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddItem={onAddItem} onFilterClick={onFilterClick} />
      <main className="flex-1 container mx-auto px-4 pb-6">{children}</main>
      <footer className="sticky bottom-0 border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center bg-card rounded-lg p-3 my-4">
            <div>
              {activeFilters.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {activeFilters.join(" • ")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">All items</p>
              )}
            </div>
            <div className="text-lg font-semibold">
              Total:{" "}
              <span className="text-primary">
                {formatCurrency(totalPrice())}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
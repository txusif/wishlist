import React from "react";
import { Header } from "./Header";
import { useWishlistStore } from "../../store/wishlistStore";
import { formatCurrency } from "../../utils/formatCurrency";

interface LayoutProps {
  children: React.ReactNode;
  onAddItem: () => void;
}

export function Layout({ children, onAddItem }: LayoutProps) {
  const { totalPrice, filters } = useWishlistStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddItem={onAddItem} />
      <main className="flex-1 container mx-auto px-4 pb-6">{children}</main>
      <footer className="sticky bottom-0 border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center bg-card rounded-lg p-3 my-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {filters.category ? filters.category : "All Categories"}
                {filters.source ? ` from ${filters.source}` : ""}
                {filters.priority ? ` with ${filters.priority} priority` : ""}
              </p>
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

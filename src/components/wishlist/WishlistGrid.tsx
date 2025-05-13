import { AnimatePresence } from "framer-motion";
import { WishlistItem } from "../../types";
import { WishlistCard } from "./WishlistCard";
import { useWishlistStore } from "../../store/wishlistStore";

interface WishlistGridProps {
  onEditItem: (item: WishlistItem) => void;
}

export function WishlistGrid({ onEditItem }: WishlistGridProps) {
  const { filteredItems, deleteItem, toggleBought, isLoading } =
    useWishlistStore();
  const items = filteredItems();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden shadow-md bg-card">
            <div className="h-44 bg-muted shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-muted shimmer rounded-md w-3/4" />
              <div className="h-5 bg-muted shimmer rounded-md w-1/3" />
              <div className="pt-2 flex justify-between">
                <div className="h-4 bg-muted shimmer rounded-md w-1/4" />
                <div className="flex space-x-1">
                  <div className="h-8 w-8 bg-muted shimmer rounded-md" />
                  <div className="h-8 w-8 bg-muted shimmer rounded-md" />
                  <div className="h-8 w-8 bg-muted shimmer rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No wishlist items found with the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {items.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            onEdit={onEditItem}
            onDelete={deleteItem}
            onToggleBought={toggleBought}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

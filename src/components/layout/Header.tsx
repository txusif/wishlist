import { motion } from "framer-motion";
import { Gift, Plus, Filter } from "lucide-react";
import { Button } from "../ui/Button";
import { useWishlistStore } from "../../store/wishlistStore";

interface HeaderProps {
  onAddItem: () => void;
  onFilterClick: () => void;
}

export function Header({ onAddItem, onFilterClick }: HeaderProps) {
  const { filters } = useWishlistStore();
  const hasActiveFilters = Object.values(filters).some((value) => value !== null);

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-secondary to-primary rounded-lg p-2 mr-3">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl hidden sm:block font-bold bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Wishbox
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <Button
            onClick={onFilterClick}
            variant={hasActiveFilters ? "gradient" : "outline"}
            size="icon"
            className="relative"
            title="Filter items"
          >
            <Filter className="h-4 w-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </Button>
          <Button
            onClick={onAddItem}
            variant="gradient"
            className="shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
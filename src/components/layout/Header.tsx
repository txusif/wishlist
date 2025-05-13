import { motion } from "framer-motion";
import { Gift, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  onAddItem: () => void;
}

export function Header({ onAddItem }: HeaderProps) {
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
            Wishlist Aggregator
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            onClick={onAddItem}
            variant="gradient"
            className="shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add More
          </Button>
        </motion.div>
      </div>
    </header>
  );
}

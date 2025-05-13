import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { FilterBar } from "./components/filters/FilterBar";
import { WishlistGrid } from "./components/wishlist/WishlistGrid";
import { AddEditItemModal } from "./components/wishlist/AddEditItemModal";
import { useWishlistStore } from "./store/wishlistStore";
import { WishlistItem } from "./types";

// Mock data for initial testing
const MOCK_ITEMS: Omit<WishlistItem, "id" | "created_at">[] = [
  {
    name: "Adjustable Dumbbell Set",
    link: "https://example.com/dumbbell-set",
    source: "Decathlon",
    image_url:
      "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Gym",
    priority: "High",
    price: "15999",
    bought: false,
  },
  {
    name: "iPad Air with Apple Pencil",
    link: "https://www.apple.com/in/ipad-air/",
    source: "Apple Store",
    image_url:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "School",
    priority: "Medium",
    price: "54900",
    bought: false,
  },
  {
    name: "Korean Skincare Set",
    link: "https://example.com/skincare-set",
    source: "Nykaa",
    image_url:
      "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Skincare",
    priority: "Low",
    price: "2499",
    bought: true,
  },
  {
    name: "Herman Miller Aeron Chair",
    link: "https://www.hermanmiller.com/",
    source: "Herman Miller",
    image_url:
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Work",
    priority: "High",
    price: "139999",
    bought: false,
  },
  {
    name: "Resistance Bands Set",
    link: "https://example.com/resistance-bands",
    source: "Decathlon",
    image_url:
      "https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Gym",
    priority: "Medium",
    price: "1299",
    bought: false,
  },
];

function App() {
  const { items, fetchItems, addItem } = useWishlistStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<WishlistItem | null>(null);

  // Load data on initial render
  useEffect(() => {
    // In a real app, this would be commented out
    // and we would use fetchItems() to get data from Supabase
    // For now, let's load mock data if no items exist
    if (items.length === 0) {
      // Mock adding items for demo purposes
      const loadMockData = async () => {
        for (const item of MOCK_ITEMS) {
          await addItem(item);
        }
      };

      loadMockData();
    }
  }, []);

  const handleAddItem = () => {
    setItemToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleEditItem = (item: WishlistItem) => {
    setItemToEdit(item);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setItemToEdit(null);
  };

  return (
    <div className="dark">
      <Layout onAddItem={handleAddItem}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="sticky top-[73px] bg-background/80 backdrop-blur-sm z-10 -mx-4 px-4">
            <FilterBar />
          </div>
          <WishlistGrid onEditItem={handleEditItem} />

          <AddEditItemModal
            isOpen={isAddModalOpen}
            onClose={handleCloseModal}
            itemToEdit={itemToEdit}
          />
        </motion.div>
      </Layout>
    </div>
  );
}

export default App;

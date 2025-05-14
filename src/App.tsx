import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { FilterBar } from "./components/filters/FilterBar";
import { WishlistGrid } from "./components/wishlist/WishlistGrid";
import { AddEditItemModal } from "./components/wishlist/AddEditItemModal";
import { useWishlistStore } from "./store/wishlistStore";
import { WishlistItem } from "./types";

function App() {
  const { fetchItems } = useWishlistStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<WishlistItem | null>(null);

  useEffect(() => {
    fetchItems();
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

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { WishlistGrid } from "./components/wishlist/WishlistGrid";
import { AddEditItemModal } from "./components/wishlist/AddEditItemModal";
import { FilterModal } from "./components/filters/FilterModal";
import { useWishlistStore } from "./store/wishlistStore";
import { WishlistItem } from "./types";
import { AuthPage } from "./components/auth/AuthPage";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

function App() {
  const { fetchItems } = useWishlistStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<WishlistItem | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchItems();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchItems();
      }
    });

    return () => subscription.unsubscribe();
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

  if (!session) {
    return <AuthPage />;
  }

  return (
    <div className="dark">
      <Layout
        onAddItem={handleAddItem}
        onFilterClick={() => setIsFilterModalOpen(true)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <WishlistGrid onEditItem={handleEditItem} />

          <AddEditItemModal
            isOpen={isAddModalOpen}
            onClose={handleCloseModal}
            itemToEdit={itemToEdit}
          />

          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          />
        </motion.div>
      </Layout>
    </div>
  );
}

export default App;

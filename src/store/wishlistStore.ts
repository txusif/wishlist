import { create } from "zustand";
import { WishlistItem, FilterOptions, Priority } from "../types";
import { wishlistApi } from "../lib/supabase";

interface WishlistState {
  items: WishlistItem[];
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<WishlistItem, "id" | "created_at">) => Promise<void>;
  updateItem: (id: string, updates: Partial<WishlistItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleBought: (id: string) => Promise<void>;

  // Filters
  setSourceFilter: (source: string | null) => void;
  setCategoryFilter: (category: string | null) => void;
  setPriorityFilter: (priority: Priority | null) => void;
  resetFilters: () => void;

  // Computed
  filteredItems: () => WishlistItem[];
  totalPrice: () => number;
  uniqueSources: () => string[];
  uniqueCategories: () => string[];
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  filters: {
    source: null,
    category: null,
    priority: null,
  },
  isLoading: false,
  error: null,

  // Actions
  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await wishlistApi.getItems();
      set({ items, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch items",
        isLoading: false,
      });
    }
  },

  addItem: async (item) => {
    set({ isLoading: true, error: null });
    try {
      const newItem = await wishlistApi.addItem(item);
      set((state) => ({
        items: [newItem, ...state.items],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add item",
        isLoading: false,
      });
    }
  },

  updateItem: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updatedItem = await wishlistApi.updateItem(id, updates);
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? updatedItem : item)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update item",
        isLoading: false,
      });
    }
  },

  deleteItem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await wishlistApi.deleteItem(id);
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete item",
        isLoading: false,
      });
    }
  },

  toggleBought: async (id) => {
    try {
      const item = get().items.find((item) => item.id === id);
      if (!item) return;

      const updatedItem = await wishlistApi.toggleBought(id, !item.bought);
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? updatedItem : item)),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update bought status",
      });
    }
  },

  // Filters
  setSourceFilter: (source) => {
    set((state) => ({
      filters: { ...state.filters, source },
    }));
  },

  setCategoryFilter: (category) => {
    set((state) => ({
      filters: { ...state.filters, category },
    }));
  },

  setPriorityFilter: (priority) => {
    set((state) => ({
      filters: { ...state.filters, priority },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        source: null,
        category: null,
        priority: null,
      },
    });
  },

  // Computed
  filteredItems: () => {
    const { items, filters } = get();

    return items.filter((item) => {
      const sourceMatch = !filters.source || item.source === filters.source;
      const categoryMatch =
        !filters.category || item.category === filters.category;
      const priorityMatch =
        !filters.priority || item.priority === filters.priority;

      return sourceMatch && categoryMatch && priorityMatch;
    });
  },

  totalPrice: () => {
    const filteredItems = get().filteredItems();
    return filteredItems.reduce((total, item) => {
      // Parse the price string to a float before adding
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice;
    }, 0);
  },

  uniqueSources: () => {
    return [...new Set(get().items.map((item) => item.source))];
  },

  uniqueCategories: () => {
    return [...new Set(get().items.map((item) => item.category))];
  },
}));

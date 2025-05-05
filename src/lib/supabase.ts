import { createClient } from '@supabase/supabase-js';
import { WishlistItem } from '../types';

// Initialize Supabase client - in a real project, these would be environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Wishlist items API
export const wishlistApi = {
  async getItems() {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching wishlist items:', error);
      return [];
    }

    return data as WishlistItem[];
  },

  async addItem(item: Omit<WishlistItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert([{ ...item, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) {
      console.error('Error adding wishlist item:', error);
      throw error;
    }

    return data as WishlistItem;
  },

  async updateItem(id: string, updates: Partial<WishlistItem>) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating wishlist item:', error);
      throw error;
    }

    return data as WishlistItem;
  },

  async deleteItem(id: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting wishlist item:', error);
      throw error;
    }

    return true;
  },

  async toggleBought(id: string, bought: boolean) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .update({ bought })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating bought status:', error);
      throw error;
    }

    return data as WishlistItem;
  },
};

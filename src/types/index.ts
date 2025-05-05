export type Priority = "High" | "Medium" | "Low";

export interface WishlistItem {
  id: string;
  name: string;
  link: string;
  source: string;
  image_url: string;
  category: string;
  priority: Priority;
  price: number;
  bought: boolean;
  created_at: string;
}

export type FilterOptions = {
  source: string | null;
  category: string | null;
  priority: Priority | null;
};

export type AddItemFormData = Omit<WishlistItem, "id" | "created_at">;

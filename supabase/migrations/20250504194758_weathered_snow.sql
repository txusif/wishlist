/*
  # Create wishlist items table

  1. New Tables
    - `wishlist_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `link` (text)
      - `source` (text)
      - `image_url` (text)
      - `category` (text)
      - `priority` (text)
      - `price` (numeric)
      - `bought` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `wishlist_items` table
    - Add policy for authenticated users to perform all operations on their own data
*/

-- Create enum for priority levels
CREATE TYPE priority_level AS ENUM ('High', 'Medium', 'Low');

-- Create the wishlist items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  link text NOT NULL,
  source text NOT NULL,
  image_url text,
  category text NOT NULL,
  priority priority_level NOT NULL DEFAULT 'Medium',
  price numeric NOT NULL CHECK (price >= 0),
  bought boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wishlist items"
  ON wishlist_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlist items"
  ON wishlist_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlist items"
  ON wishlist_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items"
  ON wishlist_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS wishlist_items_user_id_idx ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS wishlist_items_category_idx ON wishlist_items(category);
CREATE INDEX IF NOT EXISTS wishlist_items_priority_idx ON wishlist_items(priority);
CREATE INDEX IF NOT EXISTS wishlist_items_created_at_idx ON wishlist_items(created_at DESC);
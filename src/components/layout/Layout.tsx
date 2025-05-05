import React from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  onAddItem: () => void;
}

export function Layout({ children, onAddItem }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddItem={onAddItem} />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          Built with ❤️ using React, Tailwind CSS, TypeScript, and Supabase
        </div>
      </footer>
    </div>
  );
}

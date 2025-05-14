import { motion } from "framer-motion";
import { ExternalLink, Edit, Trash2, Check, ShoppingCart } from "lucide-react";
import { WishlistItem } from "../../types";
import { PriorityBadge } from "../ui/PriorityBadge";
import { SourceBadge } from "../ui/SourceBadge";
import { Button } from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

interface WishlistCardProps {
  item: WishlistItem;
  onEdit: (item: WishlistItem) => void;
  onDelete: (id: string) => void;
  onToggleBought: (id: string) => void;
}

export function WishlistCard({
  item,
  onEdit,
  onDelete,
  onToggleBought,
}: WishlistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative group"
    >
      <div
        className={`h-full bg-card rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-200 border border-primary/20 ${
          item.bought ? "opacity-70" : ""
        }`}
      >
        {/* Product Image */}
        <div className="relative">
          <div className="w-full h-44 bg-muted relative overflow-hidden">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-card">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}

            {/* Bought overlay */}
            {item.bought && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-success/20 text-success rounded-full p-2">
                  <Check className="h-8 w-8" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Badges Row */}
        <div className="p-3 flex items-center justify-between  flex-wrap bg-card">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
            {item.category}
          </span>
          <div className="flex items-center gap-2">
            <SourceBadge source={item.source} />
            <PriorityBadge priority={item.priority} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium text-foreground line-clamp-2 text-lg group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {formatCurrency(Number(item.price))}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              View product
            </a>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => onToggleBought(item.id)}
                title={item.bought ? "Mark as not bought" : "Mark as bought"}
              >
                <Check className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-secondary"
                onClick={() => onEdit(item)}
                title="Edit item"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-error"
                onClick={() => onDelete(item.id)}
                title="Delete item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
import React from "react";
import { cn } from "../../utils/cn";
import { ShoppingCart, ShoppingBag, PackageOpen } from "lucide-react";

const sourceConfigs: Record<string, { icon: React.ReactNode; color: string }> =
  {
    Amazon: {
      icon: <ShoppingCart className="h-3 w-3 mr-1" />,
      color: "text-[#FF9900] bg-[#FF9900]/10 border-[#FF9900]/30",
    },
    Flipkart: {
      icon: <ShoppingBag className="h-3 w-3 mr-1" />,
      color: "text-[#2874F0] bg-[#2874F0]/10 border-[#2874F0]/30",
    },
    eBay: {
      icon: <PackageOpen className="h-3 w-3 mr-1" />,
      color: "text-[#E53238] bg-[#E53238]/10 border-[#E53238]/30",
    },
  };

// Fallback colors for unknown sources
const fallbackColors = [
  "text-pink-500 bg-pink-500/10 border-pink-500/30",
  "text-purple-500 bg-purple-500/10 border-purple-500/30",
  "text-blue-500 bg-blue-500/10 border-blue-500/30",
  "text-teal-500 bg-teal-500/10 border-teal-500/30",
  "text-green-500 bg-green-500/10 border-green-500/30",
];

interface SourceBadgeProps {
  source: string;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

  // Get config for known sources or generate one for unknown sources
  const config = sourceConfigs[source] || {
    icon: <ShoppingBag className="h-3 w-3 mr-1" />,
    color:
      fallbackColors[
        Math.abs(
          source.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        ) % fallbackColors.length
      ],
  };

  return (
    <span className={cn(baseClasses, config.color, className)}>
      {config.icon}
      {source}
    </span>
  );
}

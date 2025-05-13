import React from 'react';
import { cn } from '../../utils/cn';
import { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const priorityColors = {
    High: "bg-error/20 text-error border border-error/30",
    Medium: "bg-warning/20 text-warning border border-warning/30",
    Low: "bg-success/20 text-success border border-success/30",
  };
  
  return (
    <span 
      className={cn(
        baseClasses,
        priorityColors[priority],
        className
      )}
    >
      {priority}
    </span>
  );
}
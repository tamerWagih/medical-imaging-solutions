import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-surface-muted text-text-secondary": variant === "default",
          "bg-primary/10 text-primary": variant === "primary",
          "bg-secondary/10 text-secondary": variant === "secondary",
          "bg-accent/10 text-accent": variant === "accent",
          "border border-border text-text-secondary": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };


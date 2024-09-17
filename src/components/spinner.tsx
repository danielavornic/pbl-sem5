"use client";

import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden"
    }
  },
  defaultVariants: {
    show: true
  }
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      xs: "size-5",
      sm: "size-8",
      md: "size-12",
      lg: "size-16"
    },
    variant: {
      primary: "text-primary",
      accent: "text-accent-foreground"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "primary"
  }
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, variant, show, children, className }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size, variant }), className)} />
      {children}
    </span>
  );
}

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-heading whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive/20 text-destructive hover:bg-destructive/40",
        success: "bg-success/20 text-success hover:bg-success/40",
        outline: "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        muted: "bg-muted text-muted-foreground hover:bg-muted/60",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "link-foreground": "text-foreground font-medium underline-offset-4 hover:underline",
        "link-accent": "text-accent font-medium underline-offset-4 hover:underline"
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 rounded-md text-sm px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <>
            {React.Children.map(children as React.ReactElement, (child: React.ReactElement) => {
              return React.cloneElement(child, {
                className: cn(buttonVariants({ variant, size }), className),
                children: (
                  <>
                    {loading && (
                      <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />
                    )}
                    {child.props.children}
                  </>
                )
              });
            })}
          </>
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <>
          {loading && <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />}
          {children}
        </>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

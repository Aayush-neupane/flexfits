import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  asChild?: boolean;
  loading?: boolean;
}

const buttonClasses = (
  variant: NonNullable<ButtonProps['variant']>,
  size: NonNullable<ButtonProps['size']>,
  className?: string,
) =>
  cn(
    'pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-[#ff7043] hover:shadow-[0_8px_24px_rgba(255,90,31,0.25)]':
        variant === 'default' || variant === 'gradient',
      'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
      'border border-[#333] bg-transparent text-[#d4d4d4] hover:bg-[#1a1a1a] hover:border-[#444] hover:text-foreground': variant === 'outline',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'text-muted-foreground hover:text-foreground': variant === 'ghost',
      'text-primary underline-offset-4 hover:underline': variant === 'link',
      'h-10 px-5 py-2': size === 'default',
      'h-9 rounded px-3 text-xs': size === 'sm',
      'h-12 rounded-md px-8': size === 'lg',
      'h-[52px] rounded-md px-10': size === 'xl',
      'h-10 w-10': size === 'icon',
    },
    className,
  );

function LoadingSpinner() {
  return (
    <svg
      className="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, loading = false, children, disabled, ...props }, ref) => {
    // NOTE: Radix Slot requires exactly ONE React element child — passing the
    // spinner (`false` when idle) alongside `children` makes Children.count()
    // return 2 and Slot throws, unmounting the whole app. So when asChild is
    // set, guarantee a single slotted child in every state.
    if (asChild) {
      return (
        <Slot
          className={buttonClasses(variant, size, className)}
          ref={ref}
          {...props}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <LoadingSpinner />
              {children}
            </span>
          ) : (
            children
          )}
        </Slot>
      );
    }
    return (
      <button
        className={buttonClasses(variant, size, className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
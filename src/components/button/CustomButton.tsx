import React, { useRef } from "react";

type ButtonTypes = "button" | "submit" | "reset";

type Props<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  ripleColor?: string;
  type?: T extends "button" ? ButtonTypes : never;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "ref" | "type">;

export function CustomButton<T extends React.ElementType = "button">({
  as,
  children,
  className = "",
  ripleColor = "bg-black/30 dark:bg-white/30",
  type,
  onClick,
  ...props
}: Props<T>) {
  const Component = as || "button";
  const buttonRef = useRef<HTMLElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    const button = buttonRef.current;
    const ripple = rippleRef.current;
    if (!button || !ripple) return;

    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    ripple.classList.add("active");
    setTimeout(() => {
      ripple.classList.remove("active");
    }, 600);
  }

  return (
    <Component
    {...props}
    {...(Component === "button" && !type ? { type: "button" } : type ? { type } : {})}
    ref={buttonRef as any}
    onClick={(e: any) => {
      handleClick(e);
      onClick?.(e);
    }}
    className={`myButton font-semibold relative overflow-hidden ${className}`}
  >
  
      {children}
      <span
        ref={rippleRef}
        className={`rippleEffect pointer-events-none absolute rounded-full scale-0 animate-ripple ${ripleColor}`}
      />
    </Component>
  );
}

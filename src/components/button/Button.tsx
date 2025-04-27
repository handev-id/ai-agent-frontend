import { HTMLProps, useRef } from "react";

type ButtonProps = {
  loading?: boolean;
  full?: boolean;
  containerClassName?: string;
  sizing?: keyof typeof sizingStyles;
  coloring?: keyof typeof coloringStyles;
  ripleColor?: keyof typeof ripleStyles;
  type?: "button" | "submit" | "reset";
  variant?: "filled" | "outlined"; // ➔ Tambahkan ini
};

const sizes = ["sm", "base", "fullSm", "fullBase", "icon"] as const;
const colors = ["primary", "danger", "neutral"] as const;
const ripleColors = ["white", "neutral", "red"] as const;

const sizingStyles: Record<(typeof sizes)[number], string> = {
  sm: "h-10 w-20 text-xs",
  base: "h-11 w-28 text-sm",
  fullSm: "w-full h-10 text-xs",
  fullBase: "w-full h-11 text-sm",
  icon: "p-2.5 text-xl",
};

const coloringStyles: Record<(typeof colors)[number], string> = {
  primary: "bg-primary text-white",
  danger: "bg-danger text-white",
  neutral:
    "bg-neutral dark:bg-neutralDark hover:bg-neutralHover dark:hover:bg-neutralHoverDark",
};

const outlinedColoringStyles: Record<(typeof colors)[number], string> = {
  primary:
    "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  danger:
    "border border-danger text-danger bg-transparent hover:bg-danger hover:text-white",
  neutral:
    "border border-neutral text-neutral bg-transparent hover:bg-neutral/10 dark:border-neutralDark dark:text-neutralDark dark:hover:bg-neutralDark/10",
};

const ripleStyles: Record<(typeof ripleColors)[number], string> = {
  white: "bg-white/70",
  neutral: "bg-black/30 dark:bg-white/30",
  red: "bg-danger/40",
};

const Button = ({
  loading,
  children,
  sizing = "base",
  coloring = "primary",
  type = "button",
  ripleColor = "white",
  containerClassName,
  variant = "filled", // ➔ Default 'filled'
  ...props
}: ButtonProps & HTMLProps<HTMLButtonElement>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const buttonRect = button!.getBoundingClientRect();
    const { left, top } = buttonRect;
    const leftPosition = event.clientX - left;
    const topPosition = event.clientY - top;

    ripple!.style!.left = leftPosition + "px";
    ripple!.style.top = topPosition + "px";

    ripple!.classList.add("active");

    setTimeout(() => {
      ripple!.classList.remove("active");
    }, 600);
  }

  return (
    <button
      {...props}
      type={type}
      ref={buttonRef}
      onClick={(e) => {
        if (type === "button") {
          e.preventDefault();
        }
        handleClick(e);
        props.onClick?.(e);
      }}
      disabled={Boolean(props.disabled || loading)}
      className={`myButton duration-300 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50 
        ${sizingStyles[sizing]} 
        ${
          variant === "filled"
            ? coloringStyles[coloring]
            : outlinedColoringStyles[coloring]
        } 
        ${props?.className || ""}
      `}
    >
      {loading ? <div className="small-spinner mx-auto"></div> : children}
      <span
        ref={rippleRef}
        className={`rippleEffect ${ripleStyles[ripleColor]}`}
      ></span>
    </button>
  );
};

export default Button;

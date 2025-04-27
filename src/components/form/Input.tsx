import {
  forwardRef,
  HTMLProps,
  LegacyRef,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import PositionedContainer from "../PositionedContainer";

type Props = {
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
  sizing?: "sm";
  label?: string;
  message?: string;
};

const Input = forwardRef(
  (
    {
      leftItem,
      rightItem,
      sizing = "sm",
      label,
      message,
      ...props
    }: Props & HTMLProps<HTMLInputElement>,
    ref: Ref<HTMLInputElement | undefined>
  ) => {
    const inputRef = useRef<HTMLInputElement>();

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <div>
        {label && <div className="mb-2">{label}</div>}
        <PositionedContainer
          items={leftItem || rightItem}
          className={`dark:text-neutral text-Dark/70 ${
            sizing === "sm" ? "text-lg" : "text-2xl"
          }`}
          positioning={leftItem ? "top-3.5 left-3" : "top-3.5 right-3"}
        >
          <input
            style={{
              paddingLeft:
                leftItem && sizing === "sm"
                  ? "38px"
                  : leftItem
                  ? "48px"
                  : "12px",
              paddingRight:
                rightItem && sizing === "sm"
                  ? "38px"
                  : rightItem
                  ? "48px"
                  : "12px",
            }}
            {...props}
            ref={inputRef as LegacyRef<HTMLInputElement>}
            className={`${
              sizing === "sm" ? "pr-1.5 py-2.5" : "pr-3 py-3.5"
            } bg-neutral dark:text-neutral focus:border-blue-500 border-2 dark:focus:border-primaryDark transition-colors duration-500 border-transparent placeholder:text-sm text-Dark dark:bg-neutralHoverDark w-full rounded-lg outline-none ${
              props.className
            }`}
          />
        </PositionedContainer>
        {message && <div className="text-sm text-red-600 mt-1">{message}</div>}
      </div>
    );
  }
);

export default Input;

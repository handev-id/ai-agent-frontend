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

const TextArea = forwardRef(
  (
    {
      leftItem,
      rightItem,
      sizing,
      label,
      message,
      ...props
    }: Props & HTMLProps<HTMLTextAreaElement>,
    ref: Ref<HTMLTextAreaElement | undefined>
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>();

    useImperativeHandle(ref, () => inputRef.current, []);

    return (
      <div>
        {label && (
          <div className="mb-2">{label}</div>
        )}
        <PositionedContainer
          items={leftItem || rightItem}
          className={`dark:text-neutral text-Dark/70 ${
            sizing === "sm" ? "text-lg" : "text-2xl"
          }`}
          positioning={leftItem ? "top-3.5 left-3" : "top-3.5 right-3"}
        >
          <textarea
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
            rows={props.rows ? props.rows : 4}
            ref={inputRef as LegacyRef<HTMLTextAreaElement>}
            className={`${
              sizing === "sm" ? "pr-1.5 py-2.5" : "pr-3 py-3.5"
            } bg-neutral dark:text-neutral border-2 border-transparent focus:border-primary dark:focus:border-primaryDark duration-500 placeholder:text-sm text-Dark dark:bg-neutralHoverDark w-full rounded-lg outline-none ${props.className}`}
          ></textarea>
        </PositionedContainer>
        {message && <div className="text-sm text-red-600 mt-1">{message}</div>}
      </div>
    );
  }
);

export default TextArea;

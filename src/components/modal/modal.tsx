import { useEffect, useRef, useState } from "react";
import { ModalParams } from "./use-modal";
import { createPortal } from "react-dom";
import { GLOBAL_ICONS } from "../../utils/icons";
import Button from "../button/Button";

export default function Modal<T>({
  children,
  title,
  control,
  onClose = () => {},
  onChange,
}: ModalParams<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (control.isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        onClose();
        setIsVisible(false);
      }, 500);
    }

    return () => {
      onChange?.();
    }
  }, [control.isOpen]);

  const handleClickOutsideModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      control.close();
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <>
      <div
        onClick={control.close}
        className={`bg-[#111]/60 fixed top-0 left-0 w-full h-full z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        ref={modalRef}
        onClick={handleClickOutsideModal}
        className={`shadow-lg cursor-default rounded-md z-50 shadow-3 fixed top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-[-50%]"
            : "opacity-0 scale-90 translate-y-[-45%]"
        }`}
      >
        <div className="bg-white dark:bg-neutralDark scrollbar-hidden rounded-lg shadow-lg w-[90vw] md:w-[500px] max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white dark:bg-neutralDark border-b border-base px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold dark:text-neutral">
                {title}
              </h2>
              <Button
                onClick={control.close}
                sizing="icon"
                coloring="neutral"
                ripleColor="neutral"
              >
                {GLOBAL_ICONS.closeX}
              </Button>
            </div>
          </div>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </>,
    document.body
  );
}

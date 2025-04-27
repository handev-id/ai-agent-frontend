import { RefObject } from "react";

type ScrollOptions = {
  behavior?: "instant" | "smooth" | "auto";
  duration?: number;
};

export default function useInteractivity() {
  const handleScrollRoom = (
    ref: RefObject<HTMLDivElement>,
    options: ScrollOptions = {}
  ) => {
    const { behavior = "instant", duration = 0 } = options;

    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior,
      });
    }, duration);
  };

  return { handleScrollRoom };
}

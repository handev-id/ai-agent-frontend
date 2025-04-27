import { HTMLProps, useEffect, useState } from "react";
import { GLOBAL_ICONS } from "../../utils/icons";
import { CustomButton } from "../button/CustomButton";

type Props = {
  show?: (value: boolean) => void;
  isOpen?: boolean;
  width?: string;
};

const SearchInput = ({
  show,
  isOpen,
  width,
  ...props
}: Props & HTMLProps<HTMLInputElement>) => {
  const [isShow, setIsShow] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);

  useEffect(() => {
    show && show(isShow);
  }, [isShow]);

  if (isOpen) {
    return (
      <div style={{ width }} className={"relative"}>
        <input
          {...props}
          className="bg-neutral dark:text-neutral placeholder:text-sm text-Dark dark:bg-neutralHoverDark pl-4 pr-12 py-2.5 w-full rounded-lg outline-none"
        />
        <div
          className={
            "text-[22px] text-neutralDark dark:text-neutralHover absolute top-3 right-4"
          }
        >
          <span>{GLOBAL_ICONS.search}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          isShow
            ? "relative w-[200px] transition-all duration-300 overflow-hidden"
            : "relative w-0 opacity-100 transition-all duration-300 overflow-hidden"
        }
      >
        <input
          {...props}
          className="bg-neutral dark:text-neutral dark:bg-neutralHoverDark placeholder:text-sm px-10 py-2.5 w-full rounded-lg outline-none"
        />
        <span className="absolute top-3 left-3 text-[20px]">
          {GLOBAL_ICONS.search}
        </span>
        <span
          onClick={() => {
            setTimeout(() => {
              setSearchIcon(false);
            }, 100);
            setIsShow(false);
          }}
          className="absolute top-1 right-2 text-[20px] hover:bg-neutralHover dark:hover:bg-neutralHoverDark p-2 rounded-full cursor-pointer"
        >
          {GLOBAL_ICONS.closeX}
        </span>
      </div>
      {!searchIcon && (
        <div
          onClick={() => {
            setTimeout(() => {
              setIsShow(true);
            }, 100);
            setSearchIcon(true);
          }}
        >
          <CustomButton
            ripleColor="bg-black/30 dark:bg-white/30"
            type="button"
            className={`bg-transparent shadow-none rounded-lg text-[22px] w-full text-neutralDark dark:text-neutralHover p-2.5 hover:bg-neutral dark:hover:bg-neutralDark hover:shadow-none`}
          >
            <span>{GLOBAL_ICONS.search}</span>
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default SearchInput;

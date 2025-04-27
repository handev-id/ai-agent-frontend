import { HTMLProps } from "react";
import { CustomButton } from "../button/CustomButton";

const CheckBox = ({ ...props }: HTMLProps<HTMLInputElement>) => {
  return (
    <CustomButton
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      as="label"
      ripleColor="bg-black/30 dark:bg-white/30"
      className="h-10 w-10 flex justify-center dark:hover:bg-neutralHoverDark items-center rounded-full hover:bg-neutralHover"
    >
      <input
        {...props}
        className={`${props.className || ""} w-[19px] cursor-pointer h-[19px]`}
        type="checkbox"
      />
    </CustomButton>
  );
};

export default CheckBox;

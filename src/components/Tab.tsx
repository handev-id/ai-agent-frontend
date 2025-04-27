import { HTMLProps, ReactNode } from "react";

type TabProps = {
  children: ReactNode;
  isActive?: boolean;
  icon?: ReactNode; // Tambahkan icon sebagai prop opsional
} & HTMLProps<HTMLButtonElement>;

const Tab = ({ children, isActive, icon, ...props }: TabProps) => {
  return (
    <button
      {...props}
      type="button"
      className={`py-4 px-3 text-start flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-b-2 text-neutralDark dark:text-neutral duration-300 ${
        isActive
          ? "text-primary dark:text-primaryDark border-primary dark:border-primaryDark"
          : "text-neutralDark hover:border-primary dark:hover:border-primaryDark border-transparent"
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Tab;

export const TabGroup = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex cursor-pointer ${
        className || ""
      } w-full overflow-x-scroll scrollbar-hidden text-sm font-semibold`}
    >
      {children}
    </div>
  );
};

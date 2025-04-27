import React, { useEffect, useRef, useState } from "react";
import { CustomButton } from "../button/CustomButton";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export type OptionType = {
  label: string;
  value: string;
};

type Props = {
  leftItems?: React.ReactNode[];
  options: OptionType[];
  onChange: (value: OptionType[]) => void;
  value?: string[];
  containerClassName?: string;
  label?: string;
  isDefault?: boolean;
  message?: string;
  position?: "top" | "bottom";
};

export default function MultiSelect({
  leftItems = [],
  onChange,
  value = [],
  options,
  containerClassName,
  label,
  isDefault,
  message,
  position = "bottom",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: OptionType) => {
    let newValue: string[];
    if (value.includes(option.value)) {
      newValue = value.filter((v) => v !== option.value);
    } else {
      newValue = [...value, option.value];
    }
    const selectedOptions = options.filter((opt) =>
      newValue.includes(opt.value)
    );
    onChange(selectedOptions);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        bodyRef.current?.scrollTo({ top: 0 });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLabels =
    options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ") || "Pilih Disini";

  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      <div ref={dropdownRef} className={`relative ${containerClassName}`}>
        <CustomButton
          onClick={toggleDropdown}
          ripleColor="bg-black/30 dark:bg-white/30"
          className={`h-11 py-2 shadow-none text-xs border-2 border-transparent focus:border-primary dark:focus:border-primaryDark sm:text-sm w-full rounded-lg text-end text-neutralDark dark:text-neutralHover p-2.5 ${
            isDefault
              ? "bg-neutral dark:bg-neutralHoverDark"
              : "bg-transparent hover:bg-neutral dark:hover:bg-neutralDark"
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="truncate">{selectedLabels}</span>
            <FaChevronDown className="ml-auto" />
          </div>
        </CustomButton>

        <div
          ref={bodyRef}
          className={`
    w-full shadow-solid scrollbar overflow-y-auto absolute z-30 left-0 rounded shadow-lg overflow-hidden
    transition-all duration-500
    ${position === "bottom" ? "top-full mt-1" : "bottom-full mb-1"}
    ${
      isDefault
        ? "bg-white dark:bg-neutralHoverDark"
        : "bg-white dark:bg-neutralDark"
    }
    ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
  `}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, idx) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className={`block w-full text-start px-4 py-3 text-sm font-semibold text-neutralDark dark:text-neutral hover:bg-neutral dark:hover:bg-neutralDark ${
                    isSelected ? "bg-neutral dark:bg-neutralDark" : ""
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    {leftItems[idx] && (
                      <span className="text-lg">{leftItems[idx]}</span>
                    )}
                    <p className="flex-1">{option.label}</p>
                    {isSelected && <FaCheck className="text-green-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {message && <div className="text-sm text-red-600 mt-1">{message}</div>}
    </div>
  );
}

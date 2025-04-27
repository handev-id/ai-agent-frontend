import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Input from "./Input";
import { CustomButton } from "../button/CustomButton";
import { GLOBAL_ICONS } from "../../utils/icons";
import ReactDOM from "react-dom";

export type OptionType = {
  label: string;
  value: string;
};

type Props = {
  leftItems?: React.ReactNode[]; // Opsional, dengan panjang sesuai `options`.
  options: OptionType[];
  onChange: (value: OptionType) => void;
  showInput?: boolean;
  containerClassName?: string;
  top?: number;
  left?: number;
  parent?: React.ReactNode;
};

export default function LargeSelect({
  leftItems = [],
  onChange,
  options,
  showInput,
  containerClassName,
  top = 0,
  left = 0,
  parent,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false); // State untuk delay
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !bodyRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        bodyRef.current?.scrollTo({ top: 0 });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + top,
        left: rect.left + window.scrollX + left,
        width: rect.width,
      });

      setTimeout(() => setIsReady(true), 150);
    } else {
      setIsReady(false);
    }
  }, [isOpen]);

  const dropdownContent = (
    <div
      ref={bodyRef}
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        zIndex: 9999,
      }}
      className={`min-w-[300px] scrollbar overflow-y-auto rounded shadow-solid bg-white dark:bg-neutralDark transition-all duration-500 transform`}
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {showInput && (
          <div className="m-3">
            <Input rightItem={GLOBAL_ICONS.search} placeholder="Cari disini" />
          </div>
        )}
        {options.map((option, idx) => (
          <button
            type="button"
            key={option.value}
            onClick={() => handleOptionClick(option)}
            className={`block w-full text-start px-5 py-3 text-sm font-semibold text-neutralDark dark:text-neutral hover:bg-neutral dark:hover:bg-Dark ${
              selectedOption === option ? "bg-neutral dark:bg-neutralDark" : ""
            }`}
            role="menuitem"
          >
            <span className="flex items-center gap-2">
              {leftItems[idx]}
              <p>{option.label}</p>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={dropdownRef} className={`relative ${containerClassName}`}>
      {parent ? (
        <div onClick={toggleDropdown}>{parent}</div>
      ) : (
        <CustomButton
          onClick={toggleDropdown}
          ripleColor="bg-black/30 dark:bg-white/30"
          type="button"
          className={`py-2 shadow-none text-xs sm:text-sm w-full rounded-lg text-end dark:bg-neutralDark text-neutralDark dark:text-neutralHover px-2.5 bg-neutral hover:bg-neutralHover/80 dark:hover:bg-neutralHoverDark/80`}
        >
          <div className="flex items-center">
            {leftItems.length > 0 &&
              leftItems[options.findIndex((opt) => opt === selectedOption)]}
            <span className="ml-2">
              {selectedOption ? selectedOption.label : "ALL"}
            </span>
            <FaChevronDown className="ml-auto" />
          </div>
        </CustomButton>
      )}
      {isOpen && isReady && (
        <>{ReactDOM.createPortal(dropdownContent, document.body)}</>
      )}
    </div>
  );
}

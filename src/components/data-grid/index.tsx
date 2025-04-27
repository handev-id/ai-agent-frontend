import { useState, useRef, useEffect } from "react";
import SearchInput from "../form/SearchInput";
import CheckBox from "../form/CheckBox";
import SkeletonComponent from "../Skeleton";

interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
}

interface DataGridProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  actions?: () => React.ReactNode;
  selectedItems?: (items: T[]) => void;
  selectItem?: (item: T) => void;
  onSearch?: (value: string) => void;
}

const DataGrid = <T,>({
  title = "Data Table",
  data,
  columns,
  loading = false,
  actions,
  selectedItems,
  selectItem,
  onSearch,
}: DataGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setCheckedItems(data);
    } else {
      setCheckedItems([]);
    }
  };

  const toggleOne = (item: T, checked: boolean) => {
    setCheckedItems((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i !== item)
    );
  };

  useEffect(() => {
    selectedItems && selectedItems(checkedItems);
  }, [checkedItems]);

  useEffect(() => {
    if (data.length) {
      setCheckedItems([]);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-base">
        <h2 className="h2">{title}</h2>
        <div className="flex gap-2 items-center">
          <SearchInput
            width={
              typeof window !== "undefined" && window.innerWidth > 1024
                ? "200px"
                : "0px"
            }
            isOpen
            placeholder={`Cari ${title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch?.((e.target as HTMLInputElement)?.value);
              }
            }}
          />
          {actions && actions()}
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-auto relative scrollbar h-full"
      >
        <table className="w-full border-collapse">
          <thead className="sticky top-0 border-b border-base">
            <tr className="text-left group transition-transform duration-300">
              {columns.map((col, index) => (
                <th
                  key={col.key.toString()}
                  className={`py-3 px-1 font-semibold text-neutralDark dark:text-neutral ${
                    index === 0 ? "flex items-center gap-2" : ""
                  }`}
                  style={{ width: col.width || "300px" }}
                >
                  {index === 0 && (
                    <div
                      className={`duration-300 ${
                        checkedItems.length > 0
                          ? ""
                          : "group-hover:-ml-0 -ml-12"
                      }`}
                    >
                      <CheckBox
                        onChange={(e) =>
                          toggleAll((e.target as HTMLInputElement).checked)
                        }
                        checked={checkedItems.length > 0 ? true : false}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length} className="py-1 px-4">
                      <SkeletonComponent type="user-list" />
                    </td>
                  </tr>
                ))
              : data.map((row, rowIndex) => {
                  return (
                    <tr
                      onClick={() => selectItem?.(row)}
                      key={rowIndex}
                      className="cursor-pointer text-sm hover:bg-neutral dark:hover:bg-neutralHoverDark border-b border-base group"
                    >
                      {columns.map((col, colIndex) => (
                        <td
                          key={col.key.toString()}
                          className={`py-2.5 px-1 ${
                            colIndex === 0 ? "flex items-center gap-4" : ""
                          }`}
                          style={{ width: col.width || "300px" }}
                        >
                          {colIndex === 0 && (
                            <div
                              className={`duration-300 ${
                                checkedItems.length > 0
                                  ? ""
                                  : "group-hover:-ml-0 -ml-12"
                              }`}
                            >
                              <CheckBox
                                onChange={(e) =>
                                  toggleOne(
                                    row,
                                    (e.target as HTMLInputElement).checked
                                  )
                                }
                                checked={checkedItems.includes(row)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          )}
                          {col.render
                            ? col.render(row)
                            : (row[col.key as keyof T] as any)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;

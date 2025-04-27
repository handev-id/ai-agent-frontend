import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

type Props = {
  type: "user-list" | "list" | "avatar" | "messages";
  height?: string;
  isDarkMode?: boolean;
};

const SkeletonComponent = ({
  type,
  height = "50px",
  isDarkMode = false,
}: Props) => {
  return (
    <SkeletonTheme
      baseColor={isDarkMode ? "#202020" : ""}
      highlightColor={isDarkMode ? "#444" : ""}
    >
      {type === "avatar" ? (
        <Skeleton
          circle
          style={{
            width: "60px",
            height: "60px",
          }}
          className="dark:bg-gray-600" // dark mode background
        />
      ) : type === "user-list" ? (
        <div className="grid grid-cols-[60px_1fr] items-center gap-2 w-full">
          <Skeleton
            circle
            style={{
              width: "50px",
              height: "50px",
            }}
          />
          <Skeleton
            style={{
              width: "100%",
              height,
            }}
          />
        </div>
      ) : type === "messages" ? (
        <div className="w-full">
          <div>
            <Skeleton
              style={{
                width: "250px",
                height,
              }}
              className="dark:bg-gray-600"
            />
            <Skeleton
              style={{
                width: "80px",
                height: "20px",
              }}
              className="dark:bg-gray-600"
            />
          </div>
          <div className="flex flex-col items-end">
            <Skeleton
              style={{
                width: "250px",
                height,
              }}
              className="dark:bg-gray-600"
            />
            <Skeleton
              style={{
                width: "80px",
                height: "20px",
              }}
              className="dark:bg-gray-600"
            />
          </div>
        </div>
      ) : (
        <Skeleton
          style={{
            width: "100%",
            height,
          }}
          className="dark:bg-gray-600" // dark mode background
        />
      )}
    </SkeletonTheme>
  );
};

export default SkeletonComponent;

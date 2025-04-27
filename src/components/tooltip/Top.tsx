import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const CostumTooltipTop = ({
  text,
  children,
}: {
  text?: string;
  children?: React.ReactNode;
}) => {
  const [customId, setCustomId] = useState(String(Math.random()));
  return (
    <div className="text-xs">
      <a
        data-tooltip-id={customId}
        data-tooltip-content={text}
        data-tooltip-variant="light"
        data-tooltip-delay-show={1000}
        data-tooltip-class-name="shadow z-10"
      >
        {children}
      </a>
      <ReactTooltip id={customId} place="top-end" opacity={"inherit"} />
    </div>
  );
};

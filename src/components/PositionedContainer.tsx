import React from "react";

export default function PositionedContainer({
  children,
  positioning,
  items,
  className,
}: {
  children?: React.ReactNode;
  positioning: string;
  items: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative w-full">
      <div>
        <div className={`absolute ${positioning}`}>
          <div className={className}>{items}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

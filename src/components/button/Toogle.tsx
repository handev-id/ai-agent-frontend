const sizingMap = {
  sm: {
    track: "w-[40px] h-[20px] p-[2px]",
    knob: "w-[16px] h-[16px]",
    translate: "translate-x-[20px]",
    text: "text-sm",
  },
  md: {
    track: "w-[50px] h-[25px] p-[2px]",
    knob: "w-[21px] h-[21px]",
    translate: "translate-x-[25px]",
    text: "text-base",
  },
  lg: {
    track: "w-[60px] h-[30px] p-[3px]",
    knob: "w-[24px] h-[24px]",
    translate: "translate-x-[30px]",
    text: "text-lg",
  },
};

type Props = {
  label?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  size?: "sm" | "md" | "lg";
};

const Toggle = ({ label, value = false, onChange, size = "md" }: Props) => {
  const { track, knob, translate, text } = sizingMap[size];

  return (
    <div className="flex items-center gap-2">
      {label && <span className={text || ""}>{label}</span>}
      <div
        onClick={(e) => {
          onChange(!value);
          e.stopPropagation();
        }}
        className={`rounded-full cursor-pointer shadow-inner transition-colors duration-300 ${
          value ? "bg-primary" : "bg-neutralHover"
        } flex items-center ${track}`}
      >
        <div
          className={`bg-white rounded-full shadow-md transform transition-transform duration-300 ${knob} ${
            value ? translate : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;

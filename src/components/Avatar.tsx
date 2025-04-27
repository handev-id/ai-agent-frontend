import { useDropzone } from "react-dropzone";

const sizes = ["sm", "base", "lg", "xl", "full"] as const;

const sizingStyles: Record<(typeof sizes)[number], string> = {
  sm: "w-[45px] h-[45px]",
  base: "w-[70px] h-[70px]",
  lg: "w-[90px] h-[90px]",
  xl: "w-[120px] h-[120px]",
  full: "w-full, h-full",
};

export default function Avatar({
  sizing = "sm",
  value,
  onChange,
}: {
  sizing?: keyof typeof sizingStyles;
  value?: string | null;
  onChange?: (value: File) => void;
}) {
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => onChange && onChange(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  if (onChange) {
    return (
      <div
        {...getRootProps()}
        className={`rounded-full flex-none overflow-hidden ${sizingStyles[sizing]}`}
      >
        <img
          src={value || ""}
          alt="Avatar Caqap.id"
          className={`w-full h-full object-cover`}
        />
        <input {...getInputProps()} />
      </div>
    );
  } else {
    return (
      <div className={sizingStyles[sizing]}>
        <img
          src={value || ""}
          alt="Avatar Caqap.id"
          className={`w-full h-full object-cover rounded-full overflow-hidden`}
        />
      </div>
    );
  }
}

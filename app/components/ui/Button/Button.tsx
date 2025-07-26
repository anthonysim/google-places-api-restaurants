import type { ButtonProps } from "./Button.types";
import Image from "next/image";

export default function Button({
  children,
  onClick,
  imageUrl,
  imageAlt,
  height = 19,
  width = 17,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "flex items-center gap-[12px] bg-[#2C5601] w-[108px] h-[42px] opacity-100 absolute top-[740px] rounded-full px-[24px] py-[12px] text-white cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {imageUrl && imageAlt && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          title={imageAlt}
          width={width}
          height={height}
          priority
        />
      )}
      {children}
    </button>
  );
}

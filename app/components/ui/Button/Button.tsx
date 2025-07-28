import Image from "next/image";

import type { IButtonProps } from "./Button.types";

export default function Button({
  children,
  onClick,
  imageUrl,
  imageAlt,
  height = 19,
  width = 17,
  type = "button",
  className = "",
}: IButtonProps) {
  const baseStyles =
    "cursor-pointer items-center gap-[12px] bg-[#2C5601] w-[108px] h-[42px] opacity-100  rounded-full px-[24px] py-[12px] text-white flex outline-none focus:outline-none ring-0";

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

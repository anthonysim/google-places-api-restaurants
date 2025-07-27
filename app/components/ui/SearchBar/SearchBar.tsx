import Image from "next/image";

import type { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({
  iconTitle,
  iconAlt,
  value,
  onChange,
  name,
  placeholder = "",
  classNames = "",
}: SearchBarProps) {
  const baseStyles = `
    w-[353px] h-8
    rounded-[40px] p-3
    bg-[#EFEFEC] text-sm
    outline-none opacity-100 rotate-0
    align-middle
    placeholder:font-manrope
    placeholder:font-medium
    placeholder:text-[13px]
    placeholder:leading-[1.5]
    placeholder:tracking-[0px]
  `;

  return (
    <>
      {iconTitle && iconAlt && (
        <Image
          src={iconTitle}
          alt={iconAlt}
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          priority
        />
      )}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${classNames}`}
      />
    </>
  );
}

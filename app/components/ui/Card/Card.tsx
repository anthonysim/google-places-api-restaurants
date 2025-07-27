import Image from "next/image";
import { useEffect, useState } from "react";

import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "@/app/utils/bookmarks";

import type { ICardProps } from "./Card.types";

export default function Card({
  title,
  description,
  rating,
  classNames,
  imageUrl,
  imageAlt = "Card image",
  onClick,
  placeId,
  type = "button",
}: ICardProps) {
  const baseStyles =
    "w-[432px] h-auto bg-white rounded-[16px]  p-4 text-left cursor-pointer";

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (placeId && isBookmarked(placeId)) {
      setBookmarked(true);
    }
  }, [placeId]);

  const cardHandler = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    placeId: string
  ) => {
    e.preventDefault();
    const currentlyBookmarked = isBookmarked(placeId);

    if (currentlyBookmarked) {
      removeBookmark(placeId);
      setBookmarked(false);
    } else {
      addBookmark(placeId);
      setBookmarked(true);
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${classNames}`}
    >
      <div className="flex items-start gap-4 p-0">
        {imageUrl && (
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-between text-left">
          <div className="font-bold text-base leading-[150%] tracking-[0px] line-clamp-1">
            {title}
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-1 mt-1">
            <Image
              src="/star.svg"
              alt="star"
              title="star"
              width={16}
              height={16}
              priority
            />
            <span>{rating}</span>
            <span>&middot; (reviews)</span>
          </div>
          <div className="mt-2 text-sm leading-[150%] tracking-[0px] line-clamp-2 text-gray-600">
            {description}
          </div>
        </div>

        <Image
          src={bookmarked ? "/bookmark-saved.svg" : "/bookmark-resting.svg"}
          alt="Bookmark"
          title="Bookmark"
          width={24}
          height={24}
          priority
          onClick={(e) => cardHandler(e, placeId)}
        />
      </div>
    </button>
  );
}

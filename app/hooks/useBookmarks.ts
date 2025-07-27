"use client";

import { useEffect, useState } from "react";

import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "@/app/utils/bookmarks";

export function useBookmark(placeId: string) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (placeId && isBookmarked(placeId)) {
      setBookmarked(true);
    }
  }, [placeId]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(placeId);
      setBookmarked(false);
    } else {
      addBookmark(placeId);
      setBookmarked(true);
    }
  };

  return { bookmarked, toggleBookmark };
}

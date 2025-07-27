export function addBookmark(placeId: string) {
  const stored = localStorage.getItem("bookmarks");
  const bookmarks = stored ? JSON.parse(stored) : [];

  if (!bookmarks.includes(placeId)) {
    bookmarks.push(placeId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

export function removeBookmark(placeId: string) {
  const stored = localStorage.getItem("bookmarks");
  const bookmarks = stored ? JSON.parse(stored) : [];

  const updated = bookmarks.filter((id: string) => id !== placeId);
  localStorage.setItem("bookmarks", JSON.stringify(updated));
}

export function isBookmarked(placeId: string): boolean {
  const stored = localStorage.getItem("bookmarks");
  const bookmarks = stored ? JSON.parse(stored) : [];
  return bookmarks.includes(placeId);
}

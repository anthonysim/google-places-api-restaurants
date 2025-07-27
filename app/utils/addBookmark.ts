export function addBookmark(bookmark: string) {
  const stored = localStorage.getItem("bookmarks");
  const bookmarks = stored ? JSON.parse(stored) : [];

  if (!bookmarks.includes(bookmark)) {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

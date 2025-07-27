import { addBookmark, removeBookmark, isBookmarked } from "../utils/bookmarks";

describe("Bookmark Utils", () => {
  const placeId = "xyz123";

  afterEach(() => {
    localStorage.clear();
  });

  it("adds and checks bookmark", () => {
    addBookmark(placeId);
    expect(isBookmarked(placeId)).toBe(true);
  });

  it("removes bookmark", () => {
    addBookmark(placeId);
    removeBookmark(placeId);
    expect(isBookmarked(placeId)).toBe(false);
  });
});

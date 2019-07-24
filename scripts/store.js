'use strict';

const store = function () {
  let bookmarks = [];
  let adding = false;
  let filter = false;
  let error = null;


  // add, findById, findAndDelete (to the bookmarks[])
  const addBookmark = function (bookmark) {
    bookmark.selected = false;
    bookmarks.push(bookmark);
  };

  const findById = function (id) {
    return bookmarks.find(bookmark => bookmark.id === id);
  };

  const setSelected = function (id) {
    const bookmark = findById(id);
    bookmark.selected = !bookmark.selected;
  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  return {
    bookmarks,
    adding,
    filter,
    addBookmark,
    setSelected,
    findAndDelete
  };
}();
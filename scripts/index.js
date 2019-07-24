'use strict';
/*global bookmarksApp, api, store*/

$(document).ready(function () {
  bookmarksApp.bindEventListener();
  bookmarksApp.render();

  // get initial items in db
  api.getAllBookmarks()
    .then(res => res.json())
    .then(bookmarks => {
      bookmarks.forEach(bookmark => {
        store.addBookmark(bookmark);
      });
      bookmarksApp.render();
    });
});
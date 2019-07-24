'use strict';

const api = function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cody';

  const getAllBookmarks = function () {
    return fetch(BASE_URL + '/bookmarks');
  };

  const addBookmark = function (newBookmark){
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type' : 'application/json',
      }),
      body: newBookmark
    };
    return fetch(BASE_URL + '/bookmarks', options);
  };

  const deleteBookmark = function (id){
    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type' : 'application/json',
      }),
    };
    return fetch(BASE_URL + '/bookmarks/' + id, options);
  };


  return {
    getAllBookmarks,
    addBookmark,
    deleteBookmark
  };
}();
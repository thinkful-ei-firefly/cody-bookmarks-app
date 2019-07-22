'use strict';

const store = function(){
  const bookmarks = [];
  let adding = false;
  let filter = false;

  // add, findById, findAndDelete (to the bookmarks[])

  return{
    bookmarks,
    adding,
    filter
  };
}();
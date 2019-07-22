'use strict';

const bookmarksApp = function(){

  function generateBookmarkCard(){
    // conditionals if expanded or not

  }

  function generateBookmarkForm(){

  }

  // renders the list of bookmarkCards
  function render(){

  }

  // 
  function handleAddClick(){
    $('.js-add-btn').on('click', () =>{
      console.log('add-btn-click');
    });
  }

  // listen for submit bookmark
  function handleSubmitBookmark(){
   
  }

  function bindEventListener(){
    handleAddClick();

  }

  return {
    bindEventListener,
    render
  };
}();
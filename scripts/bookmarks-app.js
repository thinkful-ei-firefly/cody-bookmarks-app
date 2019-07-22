'use strict';
/* global store */

const bookmarksApp = function(){

  function generateBookmarkCard(bookmarks){
    // conditionals if expanded or not

  }

  function generateBookmarkForm(){
    return `<form id="add-bookmark-form" name="add-bookmark-form">
    <div>
      <label for="title">Site Name:</label>
      <input type="text" id="title" name="title" required>
    </div>
    <div>
      <label for="stars">Stars</label>
      <select id="stars" name="stars" id="stars" required>
        <option value="5">* * * * *</option>
        <option value="4">* * * *</option>
        <option value="3">* * *</option>
        <option value="2">* *</option>
        <option value="1">*</option>
      </select>
    </div>
    <div>
      <label for="desc">Description</label>
      <textarea id="desc" name="desc" rows="3" cols="33" required></textarea>
    </div>
    <div>
      <label for="url">Url</label>
      <input type="url" id="url" name="url" required> 
    </div>
    <input type="submit" value="Submit">
  </form>`;
  }

  function generateHeader(){
    return `<header class="container top-of-page-header">
    <h1>Bookmarker</h1>

    <button class="js-add-btn add-btn" ${store.adding ? 'hidden':''}>Add</button>

    <label for="star-filter">
      Filter By Stars:
      <select id="star-filter">
        <option value="">All</option>
        <option value="5">* * * * *</option>
        <option value="4">* * * *</option>
        <option value="3">* * *</option>
        <option value="2">* *</option>
        <option value="1">*</option>
      </select>
    </label>
  </header>`;

  }

  // renders the list of bookmarkCards
  function render(){

    // check if form displayed
    if(store.adding){
      const formHtml = generateBookmarkForm();
    }

    $('main').html()
  }

  // 
  function handleAddClick(){
    $('.js-add-btn').on('click', () =>{
      console.log('add-btn-click');
      store.adding = !store.adding;
      render();
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
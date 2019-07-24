'use strict';
/* global store, api */

const bookmarksApp = function () {

  function generateBookmarkCard(bookmark) {
    const selectedHtml = `<article class="container">${bookmark.desc}</article>
    <a href="${bookmark.url}"><br>
    <div class="selected-btns"><button>To ${bookmark.title}</button></a>
    <button class="js-delete-btn delete-btn">delete</button></div>`;

    // conditionals if expanded or not
    return `<section class="bookmark-card container" data-bookmark-id=${bookmark.id}>
    <header class="container">
      <h2>${bookmark.title}</h2>
      <p>Stars: ${bookmark.rating}</p>
    </header>
    ${bookmark.selected ? selectedHtml : ''}
  </section>`;

  }

  function generateAllBookmarkCards() {
    let bookmarkList = [...store.bookmarks];

    if(store.filter > 0){
      bookmarkList = bookmarkList.filter(bookmark => {
        return bookmark.rating >= store.filter;
      });
    }

    let bookmarkCardsHtml = '<div class="cards container">';
    for (let i in bookmarkList) {
      bookmarkCardsHtml += generateBookmarkCard(bookmarkList[i]);
    }
    bookmarkCardsHtml += '</div>';


    return bookmarkCardsHtml;
  }

  function generateBookmarkForm() {
    return `<form id="add-bookmark-form" name="add-bookmark-form" class="container">
    <div>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>
      <label for="rating">Stars</label>
      <select id="rating" name="rating" id="rating" required>
        <option value="5">* * * * *</option>
        <option value="4">* * * *</option>
        <option value="3">* * *</option>
        <option value="2">* *</option>
        <option value="1">*</option>
      </select>
    </div>
    <div>
    </div>
    <div>
      <label for="desc">Description: </label><br>
      <textarea id="desc" name="desc" rows="3" cols="33" required></textarea>
    </div>
    <div>
      <label for="url">url: </label>
      <input type="url" id="url" name="url" required> 
    </div>
    <input type="submit" value="Submit" class="bm-submit">
  </form>`;
  }

  function generateHeader() {
    return `<header class="container top-of-page-header">
    <h1>Bookmarker</h1>

    <button class="js-add-btn add-btn" ${store.adding ? 'hidden' : ''}>Add</button>

    <label for="star-filter">
      Filter By Stars:
      <select id="star-filter">
        <option value="null" ${store.filter === null ?'selected':''}>All</option>
        <option value="5" ${store.filter === '5' ?'selected':''}>5</option>
        <option value="4" ${store.filter === '4' ?'selected':''}>4</option>
        <option value="3" ${store.filter === '3' ?'selected':''}>3</option>
        <option value="2" ${store.filter === '2' ?'selected':''}>2</option>
        <option value="1" ${store.filter === '1' ?'selected':''}>1</option>
      </select>
    </label>
  </header>`;

  }

  function generateError(){
    $('js-error').html(`<h2>Error: ${store.error}</h2>`);
    setTimeout(()=>{
      store.error = null;
      render();
    }, 3000);
  }

  // renders the list of bookmarkCards
  function render() {
    let html = generateHeader();

    if (store.error) {
      generateError();
    }

    // check if form displayed
    if (store.adding) {
      html += generateBookmarkForm();
    }

    html += generateAllBookmarkCards();

    $('main').html(html);
  }

  // 
  function handleAddClick() {
    $('main').on('click', '.js-add-btn', () => {
      store.adding = !store.adding;
      render();
    });
  }

  // listen for submit bookmark
  function handleSubmitBookmark() {
    $('main').on('submit', '#add-bookmark-form', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let newBookmark = serializeJson(formData);

      api.addBookmark(newBookmark)
        .then((res) => {
          res.json().then(data => {
            store.adding = !store.adding;
            newBookmark = JSON.parse(newBookmark);
            newBookmark.id = data.id;
            store.addBookmark(newBookmark);
            render();
          });
        })
        .catch(error => {
          store.error = error;
          render();
        });
    });
  }

  function handleSelectBookmark() {
    $('main').on('click', '.bookmark-card', (e) => {
      const id = getBookmarkIdFromElement(e.currentTarget);
      store.setSelected(id);
      render();
    });
  }

  function handleDeleteClick() {
    $('main').on('click', '.js-delete-btn', (e) => {
      const id = getBookmarkIdFromElement(e.currentTarget);

      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch(error => {
          store.error = error;
          render();
        });
    });
  }

  function handleFilterByStars(){
    $('main').on('change', '#star-filter', (e) =>{
      store.filter = e.target.value;
      console.log(store.filter);
      render();
    });
  }

  function getBookmarkIdFromElement(currTarg) {
    return ($(currTarg)
      .closest('.bookmark-card')
      .data('bookmark-id')); // needs data 'data'-whatever on element
  }

  function serializeJson(formData) {
    const newBookmark = {};
    formData.forEach((val, key) => newBookmark[key] = val);
    return JSON.stringify(newBookmark);
  }

  function bindEventListener() {
    handleAddClick();
    handleSubmitBookmark();
    handleSelectBookmark();
    handleDeleteClick();
    handleFilterByStars();
  }

  return {
    bindEventListener,
    render,
  };
}();
const myLibrary = [];

const readNextStatus = {
  "unread": "current-reading",
  "current-reading": "read",
  "read": "unread"
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = readNextStatus[this.read];
}

function getBookInfoFromForm() {
  return {
    title: document.getElementById("title-form").value,
    author: document.getElementById("author-form").value,
    pages: document.getElementById("pages-form").value,
    read: document.getElementById("read-form").value
  }
}

// append myLibrary
function addBookToLibrary(book) {
  let newBook = new Book(book.title, book.author, book.pages, book.read);
  myLibrary.push(newBook);
  // console.log(book);
}

function deleteRemains() {
  const booksContainer = document.querySelector(".books-container");
  if(booksContainer) {
    booksContainer.parentNode.removeChild(booksContainer);
  }
}

function render() {
  const mainContainer = document.getElementById("main-container");
  // delete original objects
  deleteRemains();
  const booksContainer = document.createElement('section');
  booksContainer.classList.add('books-container');
  mainContainer.insertAdjacentElement('afterbegin', booksContainer);

  // render each book with loop
  myLibrary.forEach((book) => {
    const node = document.createElement('article');
    node.classList.add('book');
    booksContainer.appendChild(node);
    node.innerHTML = `Title: ${book.title} |
                      Author: ${book.author} |
                      pages: ${book.pages} |
                      read: ${book.read}`
    // delete button
  })
}

const visiblilityNextStatus = {
  "visible": "hidden",
  "hidden": "visible"
}
// window addBookBtn click:
// set form visible
const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener("click", function() {
  const addBookForm = document.querySelector(".add-book-form");
  let style = window.getComputedStyle ? getComputedStyle(addBookForm, null) : addBookForm.currentStyle;
  addBookForm.style.visibility = visiblilityNextStatus[ style.visibility ];
})

// window submitBtn
// call addBookToLibrary
// call render
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function() {
  const book = getBookInfoFromForm();
  addBookToLibrary(book);
  render();
})

// window ready
// call render
// in case the document is already rendered
if (document.readyState!='loading') render();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', render);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') render();
});

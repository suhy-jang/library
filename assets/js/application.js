const myLibrary = [];

const readNextStatus = Object.freeze({
  unread: 'current-reading',
  'current-reading': 'read',
  read: 'unread',
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = readNextStatus[this.read];
};

function getBookInfoFromForm() {
  return {
    title: document.getElementById('title-form').value,
    author: document.getElementById('author-form').value,
    pages: document.getElementById('pages-form').value,
    read: document.getElementById('read-form').value,
  };
}

// append myLibrary
function addBookToLibrary(book) {
  const newBook = new Book(book.title, book.author, book.pages, book.read);
  myLibrary.push(newBook);
}

function deleteRemains() {
  const booksContainer = document.querySelector('.books-container');
  if (booksContainer) {
    booksContainer.parentNode.removeChild(booksContainer);
  }
}

function deleteBookFromLibrary(book) {
  const deleteItem = myLibrary.indexOf(book);
  myLibrary.splice(deleteItem, 1);
  render();
}

function deleteBookHelper(book, node) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.classList.add('btn-info');
  deleteButton.innerHTML = 'Delete';
  node.insertAdjacentElement('beforeend', deleteButton);
  deleteButton.addEventListener('click', () => deleteBookFromLibrary(book));
}

function updateReadStatus(book, node) {
  node.addEventListener('click', () => {
    book.toggleRead();
    render();
  });
}

function readStatusWordsExchange(sentence) {
  let words = sentence.split('-');
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}

function render() {
  const mainContainer = document.getElementById('main-container');
  // delete original objects
  deleteRemains();
  // if no book, no adding html tag
  if (myLibrary.length == 0) return;

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
                      read status: ${readStatusWordsExchange(book.read)}`;
    // delete book button
    deleteBookHelper(book, node);
    // node mouse over description
    node.title = 'Click to set status unread / current reading / read';
    // toggle to change read status
    updateReadStatus(book, node);
  });
}

const visiblilityNextStatus = {
  visible: 'hidden',
  hidden: 'visible',
};

function exchangeVisibility() {
  const addBookForm = document.querySelector('.add-book-form');
  const style = window.getComputedStyle ? getComputedStyle(addBookForm, null) : addBookForm.currentStyle;
  addBookForm.style.visibility = visiblilityNextStatus[style.visibility];
}

// window addBookBtn click
// set form visible
const addBookBtn = document.getElementById('add-book-btn');
addBookBtn.addEventListener('click', () => exchangeVisibility());

// window submitBtn
// call addBookToLibrary
// call render
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {
  const book = getBookInfoFromForm();
  addBookToLibrary(book);
  exchangeVisibility();
  render();
});

// window ready
// call render
// in case the document is already rendered
if (document.readyState != 'loading') render();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', render);
// IE <= 8
else {
  document.attachEvent('onreadystatechange', () => {
    if (document.readyState == 'complete') render();
  });
}

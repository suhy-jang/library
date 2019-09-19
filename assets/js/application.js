let myLibrary = [];
const nextStatus = {
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
  this.read = nextStatus[this.read];
}

function addBookToLibrary(book) {
  // read from form
  // myLibrary.push(book);
}

function render() {
  // delete original objects
  // render each book with loop
}

// window addBookBtn click:
// set form visible

// window submitBtn
// call addBookToLibrary
// call render

// window ready
// call render

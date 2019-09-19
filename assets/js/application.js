let myLibrary = [];
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

function addBookToLibrary(book) {
  // read from form
  // myLibrary.push(book);
}

function render() {
  console.log("ready");
  // delete original objects
  // render each book with loop
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
  addBookForm.style.visibility = visiblilityNextStatus[style.visibility];
})

// window submitBtn
// call addBookToLibrary
// call render

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

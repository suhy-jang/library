/* eslint-env browser */

const nextReadStatus = Object.freeze({
  unread: 'current_reading',
  current_reading: 'read',
  read: 'unread',
});

class Book {
  constructor(title, author, pages, read) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }

  get read() {
    return this._read;
  }

  toggleRead() {
    this._read = nextReadStatus[this._read];
  }
}

const myLibrary = (() => {
  const resetBooks = () => {
    this.books = [];
  };
  const getBooks = () => this.books;
  const addBook = newBook => this.books.push(newBook);
  const removeBook = (book) => {
    const deleteItem = this.books.indexOf(book);
    this.books.splice(deleteItem, 1);
  };
  return {
    resetBooks, getBooks, addBook, removeBook,
  };
})();

const uiController = (() => {
  const currentReadStatus = Object.freeze({
    unread: 'Unread',
    current_reading: 'Current Reading',
    read: 'Read',
  });

  const toggleVisiblility = Object.freeze({
    visible: 'hidden',
    hidden: 'visible',
  });

  const clickDescription = 'Click to set status Unread / Current Reading / Read';

  const resetDisplay = () => {
    const item = document.querySelector('.books-container');
    if (item) item.parentNode.removeChild(item);
  };

  const getBookInfoFromForm = () => ({
    title: document.getElementById('title-form').value,
    author: document.getElementById('author-form').value,
    pages: document.getElementById('pages-form').value,
    read: document.getElementById('read-form').value,
  });

  const bookInfo = ({
    title, author, pages, read,
  }) => `Title: ${title} |
         Author: ${author} |
         Pages: ${pages} |
         Read status: ${currentReadStatus[read]}`;

  const createHtmlElement = (type, classes, text) => {
    const item = document.createElement(type);
    classes.forEach(name => item.classList.add(name));
    item.innerHTML = text;
    return item;
  };

  const render = () => {
    const mainContainer = document.getElementById('main-container');
    resetDisplay();
    const books = myLibrary.getBooks();
    if (books.length === 0) return;

    const booksContainer = createHtmlElement('section', ['books-container'], '');
    mainContainer.insertAdjacentElement('afterbegin', booksContainer);

    books.forEach((book) => {
      // each book
      const node = createHtmlElement('article', ['book'], bookInfo(book));
      booksContainer.appendChild(node);
      // delete button
      const deleteButton = createHtmlElement('button', ['delete-btn', 'btn-info'], 'Delete');
      node.insertAdjacentElement('beforeend', deleteButton);
      deleteButton.addEventListener('click', () => {
        myLibrary.removeBook(book);
        render();
      });
      // description
      node.title = clickDescription;
      node.addEventListener('click', () => {
        book.toggleRead();
        render();
      });
    });

    const toggleDescription = createHtmlElement('i', ['description-toggle'], clickDescription);
    booksContainer.appendChild(toggleDescription);
  };

  const swapVisibility = (select) => {
    const form = document.querySelector(select);
    const currentVisibility = window.getComputedStyle(form, null).visibility;
    form.style.visibility = toggleVisiblility[currentVisibility];
  };

  const customAddEvent = (id, callback) => {
    const obj = document.getElementById(id);
    obj.addEventListener('click', callback);
  };

  const submitAction = () => {
    const {
      title, author, pages, read,
    } = getBookInfoFromForm();
    const newBook = new Book(title, author, pages, read);
    myLibrary.addBook(newBook);
    swapVisibility('.add-book-form');
    render();
  };

  customAddEvent('add-book-btn', () => swapVisibility('.add-book-form'));
  customAddEvent('submit-btn', () => submitAction());
  return { render };
})();

myLibrary.resetBooks();
uiController.render();

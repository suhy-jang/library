/* eslint-env browser */

const nextReadStatus = Object.freeze({
  unread: 'current_reading',
  current_reading: 'read',
  read: 'unread',
});

class Book {
  constructor(id, title, author, pages, read) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
  }

  get id() {
    return this._id;
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
  let books = [];
  let bookId;
  const setBookId = id => {
    bookId = id;
  };
  const getBooks = () => books;
  const addBook = (newBook) => {
    books.push(newBook);
  };
  const addBookNew = ({ title, author, pages, read }, id = bookId) => {
    const newBook = new Book( id, title, author, pages, read );
    addBook(newBook);
    bookId += 1;
    return newBook;
  };
  const removeBook = (book) => {
    const deleteItem = books.indexOf(book);
    books.splice(deleteItem, 1);
  };
  return {
    getBooks, addBook, addBookNew, removeBook, setBookId,
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

  const clickToggleRead = book => {
    book.toggleRead();
    render();
  }

  const render = () => {
    const mainContainer = document.getElementById('main-container');
    resetDisplay();
    window.localStorage.clear();
    const books = myLibrary.getBooks();
    if (books.length === 0) return;

    const booksContainer = createHtmlElement('section', ['books-container'], '');
    mainContainer.insertAdjacentElement('afterbegin', booksContainer);

    books.forEach((book) => {
      setLocalStorage(book);
      // each book
      const node = createHtmlElement('article', ['book'], bookInfo(book));
      booksContainer.appendChild(node);
      node.addEventListener('click', () => clickToggleRead(book));
      // delete button
      const deleteButton = createHtmlElement('button', ['delete-btn', 'btn-info'], 'Delete');
      node.insertAdjacentElement('beforeend', deleteButton);
      deleteButton.addEventListener('click', () => {
        myLibrary.removeBook(book);
        window.localStorage.removeItem(book.id);
        render();
      });
      // description
      node.title = clickDescription;
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

  const setLocalStorage = ({ id, title, author, pages, read }) => {
    window.localStorage.setItem(id, JSON.stringify({ id, title, author, pages, read }));
  };

  const submitAction = () => {
    const newBook = myLibrary.addBookNew(getBookInfoFromForm());
    setLocalStorage(newBook);
    swapVisibility('.add-book-form');
    render();
  };

  const getLocalStorageData = () => {
    let i = 0;
    let max_key = 0;
    let books = {};
    let key;
    while(key = window.localStorage.key(i)) {
      const originalBook = JSON.parse(window.localStorage.getItem(key));
      max_key = Math.max(max_key, key);
      books[key] = originalBook;
      i += 1;
    }
    Object.keys(books).forEach ( key => myLibrary.addBookNew(books[key], key));
    myLibrary.setBookId(max_key + 1);
  }

  const start = () => {
    getLocalStorageData();
    customAddEvent('add-book-btn', () => swapVisibility('.add-book-form'));
    customAddEvent('submit-btn', () => submitAction());
    render();
  }

  return { start };
})();

uiController.start();

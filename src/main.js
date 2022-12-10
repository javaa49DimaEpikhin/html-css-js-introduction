import { Library } from "./data/library.js";
const bookFormInputElements = document.querySelectorAll(".book-form-class [name]");
const authorFormInputElements = document.querySelectorAll(".author-form-class [name]");
const MIN_PAGES = 50;
const MAX_PAGES = 2000;
const MIN_YEAR = 1980;
const maxYear = getMaxYear();
const minDate = new Date('1980-01-01');
const maxDate = new Date();
const TIME_OUT_ERROR_MESSAGE = 5000;
const ERROR_CLASS = "error";
const ACTIVE = "active"



const dateErrorElement = document.getElementById("date_error");
const pagesErrorElement = document.getElementById("pages_error");
const pagesFormErrorElement = document.getElementById("pages_form_error");
const booksListElement = document.getElementById("books-all");
const booksPagesListElement = document.getElementById("books-pages");
const booksAuthorListElement = document.getElementById("books-author");
const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");

const library = new Library();

//functions of Book Form
function onSubmitBookForm(event) {
    event.preventDefault();
    console.log("submitted");
    const book = Array.from(bookFormInputElements).reduce(
        (res, cur) => {
            res[cur.name] = cur.value;
            return res;
        }, {}
    )
    console.log(book)
    library.addBook(book);
}

function onChangeBookForm(event) {
    if (event.target.name == "pages") {
        validatePages(event.target)
    } else if (event.target.name == "publishingDate") {
        validatePublishingDate(event.target);
        validateDate(event.target);
    }
}
function validatePages(element) {
    const value = +element.value;
    if (value < MIN_PAGES || value > MAX_PAGES) {
        const message = value < MIN_PAGES ? `number of pages must be ${MIN_PAGES} or greater`
            : `number of pages must be ${MAX_PAGES} or less`;
        showErrorMessage(element, message, pagesErrorElement);
    }

}
function validatePublishingDate(element) {
    const value = +element.value.slice(0, 4);
    if (value < MIN_YEAR || value > maxYear) {
        const message = value < MIN_YEAR ? `year must be ${MIN_YEAR} or greater` :
            `year must be ${maxYear} or less`;
        showErrorMessage(element, message, dateErrorElement);

    }
}
function validateDate(element) {
    const selectedDate = new Date(element.value);
    if (selectedDate < minDate || selectedDate > maxDate) {
        const message = selectedDate < minDate ? `date must be ${minDate} or greater` :
            `date must be ${maxDate} or less`;
        showErrorMessage(element, message, dateErrorElement);
    }
}
function showErrorMessage(element, message, errorElement) {
    element.classList.add(ERROR_CLASS);
    errorElement.innerHTML = message;
    setTimeout(() => {
        element.classList.remove(ERROR_CLASS);
        element.value = '';
        errorElement.innerHTML = '';
    }, TIME_OUT_ERROR_MESSAGE);
}

function getMaxYear() {
    return new Date().getFullYear();
}

//functions of Pages Form
let pageFrom = 0;
let pageTo = 0;
function onSubmitPages(event) {
    event.preventDefault();
    const books = library.getBooksbyPagesRange(pageFrom, pageTo);
    booksPagesListElement.innerHTML = getBookItems(books);
}

function onChangePagesFrom(event) {
    const value = +event.target.value;
    if (pageTo && value >= pageTo) {
        showErrorMessage(event.target, "Page number 'from' must be less than Page number 'to'",
            pagesFormErrorElement);
    } else {
        pageFrom = value;
    }
}
function onChangePagesTo(event) {
    const value = +event.target.value;
    if (pageFrom && value < pageFrom) {
        showErrorMessage(event.target, "Page 'To' must be greater than Page 'From'",
            pagesFormErrorElement);
    }
    pageTo = value;
}
function showSection(index) {
    buttonsMenuElement.forEach(e => e.classList.remove(ACTIVE));
    sectionsElement.forEach(e => e.hidden = true)
    buttonsMenuElement[index].classList.add(ACTIVE);
    sectionsElement[index].hidden = false;
    if (index == 1) {
        const books = library.getAllBooks();
        booksListElement.innerHTML = getBookItems(books);
    }
}
function getBookItems(books) {
    return books.map(book =>
        `<li class="books-item">
              <div class="books-item-container">
                 <p class="books-item-paragraph">Title: ${book.book_title} </p>
                 <p class="books-item-paragraph">Author: ${book.author} </p>
                 <p class="books-item-paragraph">Genre: ${book.genre}</p>
                 <p class="books-item-paragraph">Publishing Date: ${book.publishingDate}</p>
                 <p class="books-item-paragraph">Number of Pages: ${book.pages}</p>
              </div>
          </li>`).join('');
}

// Functions of the Author form 
function onSubmitAuthor(event) {
    event.preventDefault();
    const author = Array.from(authorFormInputElements)[0].value;
    const books = library.getBooksbyAuthor(author);
    booksAuthorListElement.innerHTML = getBookItems(books);
}

window.onSubmitBookForm = onSubmitBookForm;
window.onChangeBookForm = onChangeBookForm;
window.showSection = showSection;
window.onChangePagesTo = onChangePagesTo;
window.onChangePagesFrom = onChangePagesFrom;
window.onSubmitPages = onSubmitPages;
window.onSubmitAuthor = onSubmitAuthor;
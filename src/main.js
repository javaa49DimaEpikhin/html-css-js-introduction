import { Library } from "./data/library.js";
import { BookForm } from "./ui/BookForm.js";
import { showErrorMessage } from "./ui/errorMessage.js";

const MIN_PAGES = 50;
const MAX_PAGES = 2000;
const minDateString = '1980-01-01';
const ACTIVE = "active"

const pagesFormErrorElement = document.getElementById("pages_form_error");
const booksListElement = document.getElementById("books-all");
const booksPagesListElement = document.getElementById("books-pages");
const booksAuthorListElement = document.getElementById("books-author");
const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");
const authorFormInputElements = document.querySelectorAll(".author-form-class [name]");
/************************************************************************** */

const library = new Library();

const bookForm = new BookForm({
    idForm: "book_form", idPagesInput: "pages_input",
    idDateInput: "date_input", idPagesError: "pages_error", idDateError: "date_error",
    minPages: MIN_PAGES, maxPages: MAX_PAGES, minDate: new Date(minDateString)
});
bookForm.addSubmitHandler(book => library.addBook(book));

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

window.showSection = showSection;
window.onChangePagesTo = onChangePagesTo;
window.onChangePagesFrom = onChangePagesFrom;
window.onSubmitPages = onSubmitPages;
window.onSubmitAuthor = onSubmitAuthor;
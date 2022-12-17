import { Library } from "./data/library.js";
import { BookForm } from "./ui/BookForm.js";
import { BooksList } from "./ui/BooksList.js";
import { PagesForm } from "./ui/PagesForm.js";
import { AuthorForm } from "./ui/AuthorForm.js";

const MIN_PAGES = 50;
const MAX_PAGES = 2000;
const minDateString = '1980-01-01';
const ACTIVE = "active"

const listAllBooks = new BooksList("books-all");
const listBooksByPages = new BooksList("books-pages");
const listBookByAuthor = new BooksList("books-author");

const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");


const library = new Library();

const paramsBookForm = {
    idForm: "book_form", idPagesInput: "pages_input",
    idDateInput: "date_input", idPagesError: "pages_error", idDateError: "date_error",
    minPages: MIN_PAGES, maxPages: MAX_PAGES, minDate: new Date(minDateString)
};
const bookForm = new BookForm(paramsBookForm);
bookForm.addSubmitHandler(book => library.addBook(book));

//functions of Pages Form

const paramsPagesForm = {
    idForm: "pages-form", idPageFromInput: "pageFrom",
    idPageToInput: "pageTo", idErrorMessage: "pages_form_error"
}
const pagesForm = new PagesForm(paramsPagesForm);
pagesForm.addSubmitHandler((pagesObj) => {
    const from = pagesObj.pageFrom;
    const to = pagesObj.pageTo;
    const books = library.getBooksbyPagesRange(from, to);
    listBooksByPages.showBooks(books);
})

//================================================
function showSection(index) {
    buttonsMenuElement.forEach(e => e.classList.remove(ACTIVE));
    sectionsElement.forEach(e => e.hidden = true)
    buttonsMenuElement[index].classList.add(ACTIVE);
    sectionsElement[index].hidden = false;
    if (index == 1) {
        const books = library.getAllBooks();
        listAllBooks.showBooks(books);
    }
}

//=================================================
// Functions of the Author form 
const paramsAuthorForm = {
    idForm: "author-form", idAuthorInput: "author"
}
const authorForm = new AuthorForm(paramsAuthorForm);
authorForm.addSubmitHandler((author) => {
    const books = library.getBooksbyAuthor(author);
    listBookByAuthor.showBooks(books);
})
//=================================================
window.showSection = showSection;
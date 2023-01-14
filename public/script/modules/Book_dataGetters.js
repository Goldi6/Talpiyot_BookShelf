import { bookHtml, mapBooks } from "./templates/book_template.js";

const getBook = async () => {
  const location = window.location.href;
  let id = new URL(location).searchParams.get("id");

  console.log(id);
  const book = await fetch(`http://localhost:3000/books/get?id=${id}`)
    .then((data) => {
      if (data.ok) return data.json();
      else throw new Error("unable to fetch book");
    })
    .then((book) => {
      return book;
    })
    .catch((err) => {
      console.log(err);
    });

  return book;
};

const setupBookHtml = async () => {
  const book = await getBook();
  const bookEl = bookHtml(book);

  let container = document.getElementById("book-container");
  container.append(bookEl); //container.innerHTML = bookEl;
};

/////////////////
//////////////////
/////////////////

const getBooks = async (params = "") => {
  // console.log("hhh");

  const books = await fetch(`http://localhost:3000/books/search${params}`)
    .then((data) => {
      //console.log(data);
      if (data.ok) return data.json();
      else throw new Error("unable to fetch");
    })
    .then((paginatedBooks) => {
      console.log(paginatedBooks);
      const books = paginatedBooks.books;
      const pages = paginatedBooks.pages;
      const booksHTML = mapBooks(books);
      return pages;
    })
    .catch((err) => {
      console.log(err);
    });

  return books;
};

//////////////////
export { setupBookHtml, getBooks };

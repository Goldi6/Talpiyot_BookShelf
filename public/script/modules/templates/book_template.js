import { addToCart } from "../cartActions.js";

const bookHtml = (book) => {
  let bookEl = document.createElement("div");
  bookEl.classList.add("book");
  const bookElInner = `<div id="book-preview" class="half">
          
    <h2>${book.name}</h2>
    <figure>
        <img style="height:400px"src="${book.url}" alt="${
    book.name + " picture"
  }" style="width:100%">
        <figcaption>
            Written by ${book.author}
        </figcaption>
    </figure>
</div>

<div id="book-specs" class="half">
<div class="book-spec">
     Price: <span>${book.price}</span>
    </div>
    <div class="book-spec">
        Name: <span>${book.name}</span>
    </div>
    <div class="book-spec">
        Author: <span>${book.author}</span>
    </div>
          
    <div class="book-description">
            
                ${book.description}
    </div>
</div>  `;

  bookEl.innerHTML = bookElInner;

  const cartActions = document.createElement("div");
  cartActions.setAttribute("id", "cart-actions");
  const addToCartButton = document.createElement("button");
  addToCartButton.setAttribute("data-id", book._id);
  addToCartButton.classList.add("add-book-to-cart-btn");
  addToCartButton.innerHTML = "Add To Cart";
  addToCartButton.onclick = function (e) {
    const bookId = e.target.getAttribute("data-id");

    addToCart(bookId);
  };
  cartActions.append(addToCartButton);
  bookEl.append(cartActions);

  return bookEl;
};

const mapBooks = (books) => {
  const booksContainer = document.getElementById("books");
  booksContainer.innerHTML = "";

  const booksHtml = books.map((el) => {
    const container = document.createElement("div");
    container.classList.add("book");
    // container.setAttribute("data-id", el._id);
    const inner = ` <figure>
      <a href="/books/book?id=${el._id}"><img src="${el.url}" alt="book img"></a>
      <figcaption>

          <a href="/books/book?id=${el._id}">${el.name}</a>
      </figcaption>
  </figure>
  <div class="book-specs">
      
  <span>
      Price: ${el.price}$
  </span>
  </div>
  <div class="options">
  
  <button class="add-to-cart-btn" data-category="${el.category}" data-id="${el._id}"  data-price="${el.price}" data-name="${el.name}">add-to-cart</button>
      
  </div>`;

    container.innerHTML = inner;
    const btn = container.querySelector(".add-to-cart-btn");
    btn.addEventListener("click", function (e) {
      const bookId = e.target.getAttribute("data-id");

      addToCart(bookId);
    });

    booksContainer.append(container);
  });

  return booksHtml;
};

export { bookHtml, mapBooks };

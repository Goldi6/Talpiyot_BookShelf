import { addToCart } from "../../script/modules/cartActions.js";
//add To cart

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

for (const btn of addToCartButtons) {
  btn.addEventListener("click", function (e) {
    const bookId = e.target.getAttribute("data-id");
    addToCart(bookId);
  });
}

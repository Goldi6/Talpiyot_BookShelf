//add To cart
import { addToCart } from "./modules/cart/addToCart.js";

const setupAddToCartButtons = () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  for (const btn of addToCartButtons) {
    btn.addEventListener("click", function (e) {
      const bookId = e.target.getAttribute("data-id");
      addToCart(bookId);
    });
  }
};

setupAddToCartButtons();

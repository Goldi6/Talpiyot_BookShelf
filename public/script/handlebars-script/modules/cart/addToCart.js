import { showActionMessage } from "../actionMessage.js";
import { updateCounter } from "./updateCounter.js";
import { getCookie } from "../cookies.js";

const addItemToUserCart = async (id) => {
  return await fetch(`/users/cart/${id}`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = (bookId) => {
  if (getCookie("userToken") === "") {
    const item = { id: bookId, quantity: 1 };

    let cart = [];
    if (!window.localStorage.getItem("cart")) {
      cart.push(item);
      cart = JSON.stringify(cart);
    } else {
      cart = window.localStorage.getItem("cart");
      cart = JSON.parse(cart);

      if (cart.some((el) => el.id === bookId)) {
        cart = cart.map((el) => {
          if (el.id === bookId) {
            el.quantity++;
          }
          return el;
        });
      } else {
        cart.push(item);
      }
      cart = JSON.stringify(cart);
    }
    window.localStorage.setItem("cart", cart);
    showActionMessage("item added to cart!");
    updateCounter();
    // alert("item added to cart!");
  } else {
    addItemToUserCart(bookId).then((result) => {
      // alert("item added to cart!");
      console.log(result);
      showActionMessage("item added to cart!");
      updateCounter();
    });
  }
};

export { addToCart };

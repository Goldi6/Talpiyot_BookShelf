import { getToken, tokenExists } from "./modules/checkToken.js";

import { cartHtml } from "../script/modules/templates/cart_template.js";

import { getUserCart } from "./modules/User_dataGetters.js";
import { userCheckOut, getLocalCart } from "./modules/cartActions.js";

window.onload = function () {
  getCart();
};

function setupCartUi(cartIsEmpty = false) {
  if (cartIsEmpty) {
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.style.display = "none";
  } else {
    const message = document.getElementById("cart-message");
    message.style.display = "none";
  }
}
function setupCartItems(cart) {
  if (cart !== undefined && cart.length > 0) {
    const html = cartHtml(cart);
    const cartContainer = document.getElementById("items-container");

    for (let el of html) cartContainer.append(el);

    //cartContainer.innerHTML = html;
    setupCartUi();
  } else {
    setupCartUi(true);
  }
}

const getCart = async () => {
  let cart = [];
  if (tokenExists()) {
    const token = getToken();
    getUserCart(token).then((cart) => {
      console.log(cart);
      setupCartItems(cart);
    });
  } else {
    getLocalCart(localStorage.getItem("cart")).then((cart) => {
      setupCartItems(cart);
    });
  }
  return cart;
};

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.onclick = function () {
  if (document.getElementById("total-cart").innerHTML != 0) {
    if (tokenExists()) {
      userCheckOut().then((data) => {
        alert("checkout!");
        window.location.reload();
        console.log(data);
      });
    } else {
      checkOut();
    }
  }
};

const checkOut = () => {
  window.localStorage.removeItem("cart");
  alert("checkout! without authorization!");
  window.location.reload();
};

export { getCart };

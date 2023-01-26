import { getUserCart } from "./modules/getUserCart.js";
import { getLocalCart, checkOut } from "./modules/cartActions.js";
import { getCookie } from "./modules/cookies.js";
import { setupCartItems } from "./modules/cart-helpers.js";
// import { verifyModal } from "./modules/verifyPurchase.js";

const getToken = () => {
  return getCookie("userToken");
};

window.onload = function () {
  getCart();
};

const getCart = async () => {
  let cart = [];
  if (getToken() !== "") {
    //const token = getToken();
    getUserCart().then((cart) => {
      console.log(cart);
      setupCartItems(cart);
    });
  } else {
    if (localStorage.getItem("cart")) {
      getLocalCart(localStorage.getItem("cart")).then((cart) => {
        setupCartItems(cart);
      });
    }
  }
  return cart;
};

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.onclick = function () {
  if (document.getElementById("total-cart").innerHTML != 0) {
    checkOut(getToken("userToken") !== "");
  }
};

export { getCart };

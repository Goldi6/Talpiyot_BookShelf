import { getCookie } from "./modules/cookies.js";

const setLocalCartCount = () => {
  if (getCookie("userToken") === "") {
    let qu = 0;
    if (window.localStorage.getItem("cart")) {
      let localCart = window.localStorage.getItem("cart");
      if (localCart.length > 0) {
        localCart = JSON.parse(localCart);
        for (const item of localCart) {
          qu += parseInt(item.quantity);
        }
      }
    }
    const counter = document.getElementById("cart-counter");
    counter.innerHTML = qu;
  }
};
export { setLocalCartCount };

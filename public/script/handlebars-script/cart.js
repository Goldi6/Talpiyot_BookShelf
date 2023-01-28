import {
  setupDeleteButtons,
  setupUpdateButtons,
  setupCheckoutBtn,
} from "./modules/cartActions.js";

// import { verifyModal } from "./modules/verifyPurchase.js";

// window.onload = function () {
//   getCart();
// };

// const getCart = async () => {
//   let cart = [];
//   if (getToken() !== "") {
//     //const token = getToken();
//     getUserCart().then((cart) => {
//       console.log(cart);
//       setupCartItems(cart);
//     });
//   } else {
//     if (localStorage.getItem("cart")) {
//       getLocalCart(localStorage.getItem("cart")).then((cart) => {
//         setupCartItems(cart);
//       });
//     }
//   }
//   return cart;
// };
setupCheckoutBtn();
setupDeleteButtons();
setupUpdateButtons();

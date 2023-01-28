import { updateItemInCart } from "./cart/updateItem.js";
import { deleteItemFromCart } from "./cart/deleteItem.js";
import { checkOut } from "./cart/checkout.js";

function setupDeleteButtons() {
  const buttons = document.getElementsByClassName("remove-from-cart");
  for (const btn of buttons) {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      deleteItemFromCart(e, bookId);
    });
  }
}
function setupUpdateButtons() {
  const buttons = document.getElementsByClassName("count-btn");
  for (const btn of buttons) {
    btn.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");

      const action = e.target.classList.contains("add") ? "+" : "-";
      updateItemInCart(e, bookId, action);
    });
  }
}

function setupCheckoutBtn() {
  if (document.getElementById("checkout-btn")) {
    const checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.onclick = function () {
      if (document.getElementById("total-cart").innerHTML != 0) {
        checkOut();
      }
    };
  }
}
// const getLocalCart = async (cart) => {
//   const headers = new Headers({ "Content-Type": "application/json" });
//   const body = cart;
//   //console.log(body);
//   return fetch("/cart/getItems", { headers, body, method: "POST" }).then(
//     (response) => {
//       return response.json();
//     }
//   );
// };

export { setupDeleteButtons, setupUpdateButtons, setupCheckoutBtn };

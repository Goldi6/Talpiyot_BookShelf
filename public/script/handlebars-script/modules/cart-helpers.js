import { cartHtml } from "./cart_template.js";

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

export { setupCartItems };

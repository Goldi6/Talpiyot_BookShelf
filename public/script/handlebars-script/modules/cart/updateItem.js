import { getCookie } from "../cookies.js";
import { showActionMessage } from "../actionMessage.js";

const updateItemInUserCart = async (id, quantity) => {
  return await fetch(`/users/cart/${id}?quantity=${quantity}`, {
    method: "PATCH",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAmountBlock = (btn) => {
  const parent = btn.parentNode;
  return parent.querySelector(".amount-of-item");
};

const updateAmountBlock = (btn, quantity) => {
  const block = getAmountBlock(btn);
  block.setAttribute("data-current-quantity", quantity);

  block.innerHTML = quantity;
};

const updateItemInCart = (e, bookId, action) => {
  if (getCookie("userToken") !== "") {
    let quantity = getAmountBlock(e.target).getAttribute(
      "data-current-quantity"
    );
    quantity = parseInt(quantity);
    quantity = action == "+" ? quantity + 1 : quantity - 1;

    if (quantity > 0) {
      updateItemInUserCart(bookId, quantity).then(() => {
        updateAmountBlock(e.target, quantity);
        showActionMessage("Updated!");
        //window.location.reload();
      });
    }
  } else {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    cart = cart.map((el) => {
      // console.log(el.id);
      if (el.id === bookId) {
        if (action === "+") {
          el.quantity++;
          updateAmountBlock(e.target, el.quantity);
          showActionMessage("Updated!");

          //          window.location.reload();
        } else {
          if (el.quantity > 1) {
            el.quantity--;
            updateAmountBlock(e.target, quantity);
            showActionMessage("Updated!");

            //          window.location.reload();
          }
        }
      }
      return el;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export { updateItemInCart };

import { getCookie } from "../cookies.js";
import { showActionMessage } from "../actionMessage.js";

const deleteItemFromUserCart = async (id) => {
  return await fetch(`/users/cart/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItemFromCart = (e, bookId) => {
  const item = e.target.parentNode;
  if (getCookie("userToken") !== "") {
    deleteItemFromUserCart(bookId).then((data) => {
      console.log(data);
      item.remove();
      showActionMessage("Deleted!");
      //window.location.reload();
    });
  } else {
    let cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    //console.log(cart);
    cart = cart.filter((el) => {
      return el.id !== bookId;
    });
    window.localStorage.setItem("cart", JSON.stringify(cart));
    showActionMessage("Deleted!");

    //window.location.reload();
    item.remove();
  }
};
export { deleteItemFromCart };

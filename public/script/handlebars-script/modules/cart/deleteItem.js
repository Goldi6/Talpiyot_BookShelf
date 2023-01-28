import { getCookie } from "../cookies.js";
import { showActionMessage } from "../actionMessage.js";
import { DBrequest } from "./fetch.js";

const deleteItemFromCart = (e, bookId) => {
  const item = e.target.parentNode;
  if (getCookie("userToken") !== "") {
    DBrequest(bookId, "DELETE").then((data) => {
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

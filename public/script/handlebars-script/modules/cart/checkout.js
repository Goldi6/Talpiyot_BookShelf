import { verifyModal } from "../verifyPurchase.js";
import { getCookie } from "../cookies.js";

const userCheckOut = async () => {
  return await fetch("/users/cart/buy", { method: "PATCH" })
    .then((response) => {
      if (response.ok) {
        //alert();
        return response.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const checkOut = () => {
  let success = false;
  if (getCookie("userToken") !== "") {
    const result = userCheckOut();
    console.log(result);
    success = true;
  } else {
    //TODO: checkout func
    window.localStorage.removeItem("cart");
    success = true;
  }
  if (success) {
    verifyModal();
  }
};

export { checkOut };

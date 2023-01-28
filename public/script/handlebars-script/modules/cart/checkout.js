import { verifyModal } from "../verifyPurchase.js";
import { getCookie } from "../cookies.js";
import { DBrequest } from "./fetch.js";

const checkOut = () => {
  let success = false;
  if (getCookie("userToken") !== "") {
    const result = DBrequest("buy", "PATCH");
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

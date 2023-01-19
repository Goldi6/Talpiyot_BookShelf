import { displayOfHeaderProfileOptions } from "./modules/templates/display.js";

// import variables from "../style/scss/variables.scss";
import { isAdminCheck, tokenExists, getToken } from "./modules/checkToken.js";

import { loadHeader } from "./modules/loadHeader.js";
import { setupUsername, clearStorage } from "./modules/User_dataGetters.js";

loadHeader().then(() => {
  const cartBtn = document.getElementById("cart-btn");
  cartBtn.onclick = function () {
    window.location.href = "http://localhost:3000/user/cart";
  };

  const isAdmin = isAdminCheck();
  if (tokenExists(isAdmin)) {
    const token = getToken(isAdmin);
    //const token = localStorage.getItem("userToken");
    setupUsername(token, isAdmin);
  } else {
    //clearStorage(isAdmin);
    displayOfHeaderProfileOptions(false);
  }
});

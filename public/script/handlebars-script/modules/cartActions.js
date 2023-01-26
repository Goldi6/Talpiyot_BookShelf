import { showActionMessage } from "./actionMessage.js";
import { verifyModal } from "./verifyPurchase.js";

// import { tokenExists } from "./checkToken.js";
const tokenExists = (cookieName) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="))
    ?.split("=")[1];
  if (cookieValue !== "") return cookieValue;
  else return false;
};

const addItemToUserCart = async (id) => {
  const token = window.localStorage.getItem("token");

  const headers = new Headers({
    Authorization: "Bearer " + token,
    // "Content-Type": "application/json",
  });

  return await fetch(`/users/cart/add/${id}`, {
    method: "POST",
    headers,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateCounter = () => {
  const counter = document.getElementById("cart-counter");
  let count = parseInt(counter.innerHTML);
  count++;
  counter.innerHTML = count;
};

// setTimeout(() => {
//   box.classList.add("opacity");
//   setTimeout(() => {
//     box.classList.remove("opacity");
//   }, 1200);
// }, 100);
//opacPromice();

const addToCart = (bookId) => {
  if (!tokenExists("userToken")) {
    const item = { id: bookId, quantity: 1 };

    let cart = [];
    if (!window.localStorage.getItem("cart")) {
      cart.push(item);
      cart = JSON.stringify(cart);
    } else {
      cart = window.localStorage.getItem("cart");
      cart = JSON.parse(cart);

      if (cart.some((el) => el.id === bookId)) {
        cart = cart.map((el) => {
          if (el.id === bookId) {
            el.quantity++;
          }
          return el;
        });
      } else {
        cart.push(item);
      }
      cart = JSON.stringify(cart);
    }
    window.localStorage.setItem("cart", cart);
    showActionMessage("item added to cart!");
    updateCounter();
    // alert("item added to cart!");
  } else {
    addItemToUserCart(bookId).then((result) => {
      // alert("item added to cart!");
      console.log(result);
      showActionMessage("item added to cart!");
      updateCounter();
    });
  }
};
const deleteItemFromUserCart = async (id) => {
  const token = window.localStorage.getItem("token");

  const headers = new Headers({
    Authorization: "Bearer " + token,
    // "Content-Type": "application/json",
  });

  return await fetch(`/users/cart/delete/${id}`, {
    method: "DELETE",
    headers,
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
  if (tokenExists("userToken")) {
    deleteItemFromUserCart(bookId).then((data) => {
      console.log(data);
      // item.remove();
      window.location.reload();
    });
  } else {
    let cart = window.localStorage.getItem("cart");
    cart = JSON.parse(cart);
    //console.log(cart);
    cart = cart.filter((el) => {
      return el.id !== bookId;
    });
    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
    //item.remove();
  }
};

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
const checkOut = (loggedIn) => {
  let success = false;
  if (!loggedIn) {
    //TODO: checkout func
    window.localStorage.removeItem("cart");
    success = true;
    //alert("checkout! without authorization!");
  } else {
    const result = userCheckOut();
    console.log(result);
    success = true;
  }
  if (success) {
    verifyModal();
  }
};

const getLocalCart = async (cart) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  const body = cart;
  //console.log(body);
  return fetch("/cart/getItems", { headers, body, method: "POST" }).then(
    (response) => {
      return response.json();
    }
  );
};

const updateItemInUserCart = async (id, quantity) => {
  const token = window.localStorage.getItem("token");
  const headers = new Headers({
    Authorization: "Bearer " + token,
    // "Content-Type": "application/json",
  });

  return await fetch(`/users/cart/update/${id}?quantity=${quantity}`, {
    method: "PATCH",
    headers,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateItemInCart = (e, bookId, action) => {
  if (tokenExists("userToken")) {
    let quantity = e.target.getAttribute("data-current-quantity");
    quantity = parseInt(quantity);
    quantity = action == "+" ? quantity + 1 : quantity - 1;

    if (quantity > 0) {
      updateItemInUserCart(bookId, quantity).then(() => {
        window.location.reload();
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
          window.location.reload();
        } else {
          if (el.quantity > 1) {
            el.quantity--;
            window.location.reload();
          }
        }

        // let viewQuantityBlock = e.target.parentNode;
        // viewQuantityBlock = viewQuantityBlock.querySelector(".amount-of-item");
        // viewQuantityBlock.innerHTML = el.quantity;
      }
      return el;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export {
  addToCart,
  userCheckOut,
  getLocalCart,
  deleteItemFromCart,
  updateItemInCart,
  checkOut,
};

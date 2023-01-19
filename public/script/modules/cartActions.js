import { tokenExists } from "./checkToken.js";

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

const addToCart = (bookId) => {
  if (!tokenExists()) {
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
    alert("item added to cart!");
  } else {
    addItemToUserCart(bookId).then((result) => {
      alert("item added to cart!");
      console.log(result);
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
  if (tokenExists()) {
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
  const token = window.localStorage.getItem("token");

  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  return await fetch("/users/cart/buy", { method: "patch", headers })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getLocalCart = async (cart) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  const body = cart;
  console.log(body);
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
  if (tokenExists()) {
    let quantity = e.target.getAttribute("data-current-quantity");
    quantity = parseInt(quantity);
    quantity = action == "+" ? quantity + 1 : quantity - 1;

    if (quantity >= 0) {
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
          if (el.quantity > 0) {
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
};

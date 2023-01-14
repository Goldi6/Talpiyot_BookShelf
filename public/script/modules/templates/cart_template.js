import { deleteItemFromCart, updateItemInCart } from "../cartActions.js";

const cartHtmlElements = (items) => {
  let total = 0;

  let html = items.map((el) => {
    const quantity = el.quantity;
    el = el.book;

    total += parseInt(quantity) * parseInt(el.price);

    /////
    /////
    const item = document.createElement("div");
    item.classList.add("item");
    const html = `<div class="item-specs">

      <span class="cart-item-name pointer" data-id="${el.id}">
          <a href="/books/book?id=${el._id}">
              <img src="${el.url}" style="width:25px">
              <span>${el.name}</span>
          </a>
      
      
      </span>


      <span class="cart-item-price">
      ${el.price} $
       </span>

      <div class="counter">
          <button class="subtract count-btn" data-id="${
            el._id
          }" data-current-quantity="${quantity}">
              -
          </button><span class="amount-of-item">
          ${quantity}
          </span><button class="add count-btn" data-id="${
            el._id
          }" data-current-quantity="${quantity}">
              +
          </button>
      </div>


      <span class="cart-item-price">
          ${el.price * quantity} $
      </span>
  </div>`;

    item.innerHTML = html;

    const delBtn = document.createElement("button");
    delBtn.classList.add("remove-from-cart");
    delBtn.setAttribute("data-id", el._id);
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", function (e) {
      const id = e.target.getAttribute("data-id");
      deleteItemFromCart(e, id);
    });
    item.setAttribute("data-id", el._id);

    item.append(delBtn);

    const plusButton = item.querySelector(".add");
    const minusButton = item.querySelector(".subtract");

    plusButton.onclick = function (e) {
      const id = e.target.getAttribute("data-id");
      updateItemInCart(e, id, "+");
    };
    minusButton.onclick = function (e) {
      const id = e.target.getAttribute("data-id");
      updateItemInCart(e, id, "-");
    };

    return item;
  });

  document.getElementById("total-cart").innerHTML = total;
  // return html.join("");
  return html;
};

export { cartHtmlElements as cartHtml };

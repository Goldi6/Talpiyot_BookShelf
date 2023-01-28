export const updateCounter = () => {
  const counter = document.getElementById("cart-counter");
  let count = parseInt(counter.innerHTML);
  count++;
  counter.innerHTML = count;
};

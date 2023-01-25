function getContext(btn) {
  //TODO: loop [name] : value
  return {
    id: btn.getAttribute("data-id"),
    name: btn.getAttribute("data-name"),
    author: btn.getAttribute("data-author"),
    url: btn.getAttribute("data-url"),
    quantity: btn.getAttribute("data-quantity"),
    price: btn.getAttribute("data-price"),
    description: btn.getAttribute("data-description"),
    category: btn.getAttribute("data-category"),
  };
}
function getFormData(form) {
  const inputs = form.querySelectorAll("input");
  const data = {};

  for (const inp of inputs) {
    if (inp.value) data[inp.getAttribute("id")] = inp.value;
  }

  const textarea = form.querySelector("textarea");
  data[textarea.getAttribute("id")] = textarea.value;
  return data;
}

export { getContext, getFormData };

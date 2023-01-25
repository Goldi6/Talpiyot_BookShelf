const formModalTemplate = (
  formType,
  context = {
    name: "",
    author: "",
    url: "",
    price: "",
    description: "",
    id: "",
    category: "",
  }
) => {
  return `
    <div id="book-modal">
                 <button id="close-modal">X</button>
                    ${formTemplate(formType, context)}

                 <div class="form-action-buttons">
                 ${buttonTemplate(formType, context.id)}
                 </div>
                 
             </div>
    `;
};

const formTemplate = (formType, context) => {
  return `
    <form id="${formType}-form"action="">
        <label for="">* Book Name: <input type="text" id="name" name="name" value="${context.name}"></label>
        <label for="">* Author:<input type="text" id="author" name="author" value="${context.author}"></label>
        <label for="">Category:<input type="text" id="category" name="category" value="${context.category}"></label>
        <label for="">* Img url: <input type="text" id="url" name="url" value="${context.url}"></label>
        <label for="">* Price: <input type="number" id="price" name="price" value="${context.price}"></label>
        <label for="">* Quantity: <input type="number" id="quantity" name="quantity" value="${context.quantity}"></label>

        <label for="">* Description:</label>
        <textarea name="" id="description" name="description" cols="30" rows="10" >${context.description}</textarea>

    </form>
    `;
};

const buttonTemplate = (formType, id) => {
  let html = "";
  if (formType === "edit") {
    html = editButtonTemplate(id);
  } else if (formType === "upload") {
    html = uploadButtonTemplate();
  }
  return html;
};

const editButtonTemplate = (id) => {
  return `<button id="submit-update" type="submit" data-id="${id}">Update</button>
    <button id="submit-delete" type="submit" data-id="${id}">Delete</button>`;
};
const uploadButtonTemplate = () => {
  return `<button id="submit-upload" type="submit" >Upload</button>`;
};

//**// */
function setupFormModal(
  formType,
  context = {
    name: "",
    author: "",
    url: "",
    price: "",
    description: "",
    id: "",
    category: "",
  }
) {
  const modal = document.getElementById("modal");
  const template = formModalTemplate(formType, context);
  modal.innerHTML = template;
  modal.style.display = "grid";
}

export { setupFormModal };

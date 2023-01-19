const addBtn = document.querySelector("#add-book-btn");
addBtn.onclick = function () {
  const modal = document.getElementById("modal");

  const template = contextTemplateAddNew();

  modal.innerHTML = template;
  modal.style.display = "grid";

  const uploadBtn = document.querySelector("#submit-upload");

  uploadBtn.onclick = function (e) {
    e.preventDefault();
    const data = getFormData(document.getElementById("update-form"));
    console.log(data);
    uploadNewBook(data)
      .then((context) => {
        if (context.errors) {
          alert("please fill out all the required fields!");
        } else {
          console.log(context);
          const form = document.getElementById("update-form");
          form.reset();
          alert("Book Added!");
        }
        //window.location.reload();
        console.log(context);
        // const template = contextTemplateUpdate(context);

        // modal.prepend(template);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeBtn = document.querySelector("#close-modal");
  closeBtn.addEventListener(
    "click",
    () => {
      modal.innerHTML = "";
      modal.style.display = "none";
      window.location.reload();
    },
    { once: true }
  );

  const uploadNewBook = async (data) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const path = `/admin/books/new`;
    return await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  };
};

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

const editButtons = document.querySelectorAll(".edit-btn");
for (const btn of editButtons) {
  btn.addEventListener("click", function (e) {
    const context = getContext(e.target);
    const modal = document.getElementById("modal");

    const template = contextTemplateUpdate(context);

    modal.innerHTML = template;
    modal.style.display = "grid";

    const closeBtn = document.querySelector("#close-modal");
    closeBtn.addEventListener(
      "click",
      () => {
        modal.innerHTML = "";
        modal.style.display = "none";
        window.location.reload();
      },
      { once: true }
    );

    const updateBtn_send = document.querySelector("#submit-update");
    const deleteBtn_send = document.querySelector("#submit-delete");

    updateBtn_send.addEventListener("click", (e) => {
      e.preventDefault();
      const data = getFormData(document.getElementById("update-form"));
      const id = e.target.getAttribute("data-id");
      console.log(id);
      updateBook(data, id)
        .then((book) => {
          return book.json();
        })
        .then((book) => {
          console.log(book);
          if (book._id) {
            alert("updated!");
          } else {
            alert("error!");
          }
        });
    });
    deleteBtn_send.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      deleteBook(id)
        .then((book) => {
          return book.json();
        })
        .then((book) => {
          console.log(book);
          if (book._id) {
            alert("deleted!");
            window.location.reload();
          } else {
            alert("error!");
            window.location.reload();
          }
        });
    });

    const updateBook = async (data, id) => {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const path = `/admin/books/update/${id}`;
      return await fetch(path, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers,
      });
    };

    const deleteBook = async (id) => {
      const path = `/admin/books/delete/${id}`;
      return await fetch(path, {
        method: "DELETE",
      });
    };
  });
}

const contextTemplateUpdate = (
  context = {
    name: "",
    author: "",
    url: "",
    price: "",
    description: "",
    id: "",
  }
) => {
  console.log(context.price);
  const template = `<div id="book-modal">
               <button id="close-modal">X</button>
               <form id="update-form"action="">
                   <label for="">* Book Name: <input type="text" id="name" value="${context.name}"></label>
           <label for="">* Author:<input type="text" id="author" value="${context.author}"></label>
           <label for="">Category:<input type="text" id="category" value="${context.category}"></label>
           <label for="">* Img url: <input type="text" id="url" value="${context.url}"></label>
           <label for="">* Price: <input type="number" id="price" value="${context.price}"></label>
                       <label for="">* Quantity: <input type="number" id="quantity" value="${context.quantity}"></label>

           <label for="">* Description:</label>
           <textarea name="" id="description" cols="30" rows="10" >${context.description}</textarea>

               <button id="submit-update" type="submit" data-id="${context.id}">Update</button>
               <button id="submit-delete" type="submit" data-id="${context.id}">Delete</button>

               </form>
               
           </div>`;

  return template;
};
const contextTemplateAddNew = () => {
  const template = `<div id="book-modal">
               <button id="close-modal">X</button>
               <form id="update-form"action="">
                   <label for="">* Book Name: <input type="text" id="name" value=""></label>
           <label for="">* Author:<input type="text" id="author" value=""></label>
           <label for="">Category:<input type="text" id="category" value=""></label>
           <label for="">* Img url: <input type="text" id="url" value=""></label>
           <label for="">* Price: <input type="number" id="price" value=""></label>
           <label for="">* Quantity: <input type="number" id="quantity" value=""></label>
           <label for="">* Description:</label>
           <textarea name="" id="description" cols="30" rows="10" >Add book description...</textarea>

               <button id="submit-upload" type="submit" >Upload</button>

               </form>
               
           </div>`;

  return template;
};

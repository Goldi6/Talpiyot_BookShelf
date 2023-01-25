import { formErrHandler } from "../../../form_errorHandler.js";
import { showActionMessage } from "../../../modules/actionMessage.js";

//
import { getFormData } from "./bookDataGetters.js";
import { updateBook } from "./serverRequests.js";

function setupUpdateButton() {
  const updateBtn_send = document.querySelector("#submit-update");

  updateBtn_send.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("edit-form");
    console.log(form);
    const data = getFormData(form);
    const id = e.target.getAttribute("data-id");
    console.log(id);
    updateBook(data, id).then((book) => {
      console.log(book);
      if (book._id) {
        showActionMessage("Book Updated!");
      } else {
        formErrHandler(form);
        //alert("error!");
      }
    });
  });
}
export { setupUpdateButton };

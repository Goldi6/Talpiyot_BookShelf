import { formErrHandler } from "../../../form_errorHandler.js";
import { showActionMessage } from "../../../modules/actionMessage.js";

//
import { deleteBook } from "./serverRequests.js";

function setupDeleteButton() {
  const deleteBtn_send = document.querySelector("#submit-delete");

  deleteBtn_send.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    deleteBook(id).then((book) => {
      console.log(book);
      if (book._id) {
        showActionMessage("Book Deleted!");
        window.location.reload();
      } else {
        //TODO HANDLE UI ERROR

        alert("unable to delete !!!");
        // window.location.reload();
      }
    });
  });
}

export { setupDeleteButton };

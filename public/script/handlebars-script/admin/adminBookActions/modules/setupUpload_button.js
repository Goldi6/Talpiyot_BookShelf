import { formErrHandler } from "../../../form_errorHandler.js";
import { showActionMessage } from "../../../modules/actionMessage.js";

//
import { getFormData } from "./bookDataGetters.js";
import { uploadNewBook } from "./serverRequests.js";

function setupUploadButton() {
  const uploadBtn = document.querySelector("#submit-upload");

  uploadBtn.onclick = function (e) {
    e.preventDefault();

    const form = document.getElementById("upload-form");
    const data = getFormData(form);

    uploadNewBook(data)
      .then((context) => {
        if (context.status) {
          formErrHandler(context, form);
        } else {
          console.log(context);
          form.reset();
          showActionMessage("Book Added!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export { setupUploadButton };

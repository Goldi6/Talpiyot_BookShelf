//
import { getContext } from "./modules/bookDataGetters.js";
import { setupFormModal } from "./modules/templates.js";

import { setupCloseModalButton } from "./modules/closeModalButton.js";
import { setupUploadButton } from "./modules/setupUpload_button.js";
import { setupDeleteButton } from "./modules/setupDelete_button.js";
import { setupUpdateButton } from "./modules/setupUpdate_button.js";

const addBtn = document.querySelector("#add-book-btn");
addBtn.onclick = function () {
  setupFormModal("upload");

  setupUploadButton();

  setupCloseModalButton();
};

const editButtons = document.querySelectorAll(".edit-btn");
for (const btn of editButtons) {
  btn.addEventListener("click", function (e) {
    const context = getContext(e.target);

    setupFormModal("edit", context);

    setupUpdateButton();
    setupDeleteButton();

    setupCloseModalButton();
  });
}

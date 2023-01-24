import { showActionMessage } from "./modules/actionMessage.js";
import {
  gatherData,
  showUserDataToUpdate,
  closeModal,
} from "./modules/profile-helpers.js";
import { showError } from "./form_errorHandler.js";
//import {formErrorHandler} from

const updateForm = document.getElementById("edit-user-form");
const updateBtn = document.getElementById("update-user-btn");

updateForm.onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;

  const dataToUpdate = gatherData(form);

  ////
  if (!Array.isArray(dataToUpdate)) {
    //TODO:handle error
    alert(dataToUpdate);
  } else {
    //
    const [viewData, postData] = dataToUpdate;
    //
    const submitBtn = document.getElementById("send-new-profile-data-btn");
    const closeModalBtn = document.getElementById("close-submit-modal-btn");

    closeModalBtn.addEventListener("click", closeModal, { once: true });

    console.log(postData);
    console.log(viewData);

    if (viewData.length > 0) {
      showUserDataToUpdate(viewData);

      submitBtn.addEventListener(
        "click",
        (e) => {
          let type = form.getAttribute("data-type");
          console.log(type);
          type = type === "admin" ? "admin" : "users";
          const url = "/" + type + "/update";
          //
          //
          //
          console.log(url);
          updateUserData(postData, url).then((data) => {
            console.log(data);

            if (data !== undefined) {
              if (data.status) {
                const block = document.getElementById("data-to-update");
                showError(data.errorObjects, block);
                //e.target.remove();
                //alert(data);
              } else {
                document.querySelector("#close-submit-modal-btn").click();
                showActionMessage("data updated!!!");
                // window.location.replace(window.location.href);
                //location.reload();
              }
            }
          });
        },
        { once: true }
      );
    }
  }
};

const updateUserData = async (data, url) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  return await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);

      return response.json();

      //return response.html();
    })

    .catch((err) => {
      console.log(err);
    });
};

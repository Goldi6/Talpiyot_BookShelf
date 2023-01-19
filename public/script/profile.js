import { updateUserData } from "./modules/user_DataUpdate.js";
import { redirectByUserAuthentication } from "./modules/User_dataGetters.js";
import { isAdminCheck, getToken } from "./modules/checkToken.js";
import { setupUserData } from "./modules/templates/profile_templates.js";

const viewProfile = document.getElementById("view-profile");
const editProfile = document.getElementById("edit-profile");
const updateForm = document.getElementById("edit-user-form");

window.onload = function () {
  redirectByUserAuthentication(true);
  // console.log("GOLOBAL");
  // console.log(window.userObject);
  setupUserData();
};

const editBtn = document.getElementById("open-edit-user-btn");
editBtn.onclick = function () {
  viewProfile.style.display = "none";
  editProfile.style.display = "block";
};

const backBtn = document.getElementById("back-to-view-profile-btn");
backBtn.onclick = function (e) {
  e.preventDefault();
  viewProfile.style.display = "block";
  editProfile.style.display = "none";
};

const submitBtn = document.getElementById("send-new-profile-data-btn");
const closeModalBtn = document.getElementById("close-submit-modal-btn");
console.log(closeModalBtn);

const resetBtn = document.getElementById("reset-form-btn");
resetBtn.onclick = function (e) {
  e.preventDefault();
  updateForm.reset();
};

updateForm.onsubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const v_modal = document.getElementById("verify-modal");

  const dataToUpdate = gatherData(e.target);
  if (!Array.isArray(dataToUpdate)) {
    alert(dataToUpdate);
  } else {
    const viewData = dataToUpdate[0];
    const postData = dataToUpdate[1];

    console.log(postData);
    console.log(viewData);

    if (viewData.length > 0) {
      const dataToUpdate_block = document.querySelector("#data-to-update");
      // console.log(v_modal);

      const html = getUpdateModalHtml(viewData);
      //      console.log(html);

      dataToUpdate_block.innerHTML = html;
      v_modal.style.display = "grid";

      submitBtn.addEventListener(
        "click",
        (e) => {
          submitUpdate(postData);
        },
        { once: true }
      );
      closeModalBtn.onclick = function () {
        dataToUpdate_block.innerHtml = "";
        v_modal.style.display = "none";
      };
    }
  }
};

function gatherData(form) {
  const viewData = [];
  const postData = {};
  const fields = form.querySelectorAll('input:not([type="submit"])');

  let passwd1 = "";
  let passwd2 = "";

  for (const f of fields) {
    //    console.log(f);
    if (f.value !== "") {
      let value = f.value;
      value = value.trim();
      const placeholder = f.placeholder;
      const name = f.getAttribute("name");

      let postName = f.getAttribute("id");
      postName = postName.split("-")[1];
      if (f.getAttribute("id") === "password-repeat") {
        passwd2 = f.value;
      }
      if (f.getAttribute("id") === "edit-password") {
        passwd1 = value;
        let str = "";
        str = str.padStart(value.length, "*");
        const obj = { ["Password"]: str };
        viewData.push(obj);
        postData[postName] = value;
      } else if (value !== placeholder && name !== "Password repeat") {
        const obj = { [name]: value };
        viewData.push(obj);
        postData[postName] = value;
      }
    }
  }
  if (passwd1 === passwd2) return [viewData, postData];
  return "Passwords don't match";
}

const submitUpdate = async (data) => {
  console.log(data);
  const isAdmin = isAdminCheck();
  const token = getToken(isAdmin);

  updateUserData(data, token, isAdmin).then((data) => {
    if (data !== undefined) {
      alert("data updated!!!");
      window.location.replace(window.location.href);
      //location.reload();
    }
  });
};

const getUpdateModalHtml = (viewData) => {
  return viewData
    .map((el) => {
      const fieldName = Object.keys(el)[0];
      //console.log(fieldName);

      const newVal = el[fieldName];
      const html = `<div class="data-block">
        <span>
            ${fieldName}:
        </span><span>
        ${newVal}
        </span>
    </div>`;
      return html;
    })
    .join("");
};

import { showActionMessage } from "../modules/actionMessage.js";

const viewProfile = document.getElementById("view-profile");
const editProfile = document.getElementById("edit-profile");
const updateForm = document.getElementById("edit-user-form");

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

const resetBtn = document.getElementById("reset-form-btn");
resetBtn.onclick = function (e) {
  e.preventDefault();
  updateForm.reset();
};

updateForm.onsubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const v_modal = document.getElementById("verify-modal");
  const submitBtn = document.getElementById("send-new-profile-data-btn");
  const closeModalBtn = document.getElementById("close-submit-modal-btn");
  console.log(closeModalBtn);

  const dataToUpdate = gatherData(form);
  if (!Array.isArray(dataToUpdate)) {
    alert(dataToUpdate);
  } else {
    const [viewData, postData] = dataToUpdate;

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
      closeModalBtn.addEventListener(
        "click",
        function () {
          dataToUpdate_block.innerHtml = "";
          v_modal.style.display = "none";
        },
        { once: true }
      );
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

  updateUserData(data, "/admin/update").then((data) => {
    console.log(data);

    if (data !== undefined) {
      if (data.status) {
        //TODO: HANDLE ERROR
        alert(data);
      } else {
        showActionMessage("data updated!!!");
        // window.location.replace(window.location.href);
        //location.reload();
      }
    }
  });
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
      return response.json();
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
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

///
///
///

const addBtn = document.getElementById("add-book-btn");
addBtn.style.display = "none";

function gatherData(form) {
  const viewData = [];
  const postData = {};
  const fields = form.querySelectorAll(
    'input:not([type="submit"],[type="reset"])'
  );

  let passwd1 = "";
  let passwd2 = "";

  for (const f of fields) {
    //    console.log(f);
    if (f.value !== "") {
      let value = f.value;
      value = value.trim();
      const placeholder = f.placeholder;
      const name = f.getAttribute("name");

      let postName = f.getAttribute("name");

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

const showUserDataToUpdate = (viewData) => {
  const dataToUpdate_block = document.querySelector("#data-to-update");
  const v_modal = document.getElementById("verify-modal");

  const html = getUpdateModalHtml(viewData);

  dataToUpdate_block.innerHTML = html;
  v_modal.style.display = "grid";
};

const closeModal = () => {
  const dataToUpdate_block = document.querySelector("#data-to-update");
  const v_modal = document.getElementById("verify-modal");

  dataToUpdate_block.innerHtml = "";
  v_modal.style.display = "none";
};

export { gatherData, showUserDataToUpdate, closeModal };

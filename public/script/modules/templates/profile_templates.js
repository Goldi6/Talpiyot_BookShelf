import { getUser } from "../User_dataGetters.js";

import { isAdminCheck, getToken } from "../checkToken.js";

const viewProfile = document.getElementById("view-profile");
const editProfile = document.getElementById("edit-profile");

//const updateForm = document.getElementById("edit-user-form");

const viewProfileHtmlTemplate = (user) => {
  let birthday = user.birthday;
  birthday = new Date(birthday);
  birthday =
    birthday.getDate() +
    "." +
    birthday.getMonth() +
    "." +
    birthday.getFullYear();

  const html = `<div class="data-block">
  <span >
      First name:
  </span><span id="f-name">
  ${user.firstName}
  </span>
</div>
<div class="data-block">
  <span>
      Last name:
  </span><span id="l-name">
  ${user.lastName}
  </span>
</div>
<div class="data-block">
  <span>
      Birthday:
  </span><span id="birthday">
  ${birthday}
  </span>
</div>
<div class="data-block">
  <span>
      Email:
  </span><span id="email">
  ${user.email}
  </span>
</div>`;
  return html;
};

const editProfileHtmlTemplate = (user) => {
  const html = `<div class="data-block">
<label for="edit-f-name">First name</label>
<input type="text" placeholder="${user.firstName}" id="edit-firstName" name="First name">
</div>
<div class="data-block">
<label for="edit-l-name">Last name</label>
<input type="text" id="edit-lastName"
name="Last name" placeholder="${user.lastName}">
</div>
<div class="data-block">
<label for="edit-birthday">Birthday</label>
<input id="edit-birthday" type="date"
name="Birthday" placeholder="${user.birthday}">
</div>
<div class="data-block">
<label for="edit-email">Email</label>
<input id="edit-email" type="email"
name="Email" placeholder="${user.email}">
</div>

</div>
<div class="data-block">
<label for="new-password">New password</label>
<input type="password" id="edit-password"
name="New password">
</div>
<div class="data-block">
<label for="password-repeat">Password repeat</label>
<input type="password" id="password-repeat"
name="Password repeat"
>`;

  return html;
};

const setupUserData = async () => {
  const isAdmin = isAdminCheck();
  const token = getToken(isAdmin);
  await getUser(token, isAdmin).then((user) => {
    console.log(user);
    setupUserDataHTML(user);
  });
};

const setupUserDataHTML = (user) => {
  const userViewData_block = viewProfile.querySelector(".data");
  const userDataEdit_block = editProfile.querySelector(".data");

  const viewHtml = viewProfileHtmlTemplate(user);
  userViewData_block.innerHTML = viewHtml;

  const editHtml = editProfileHtmlTemplate(user);
  userDataEdit_block.innerHTML = editHtml;
};

export { setupUserData };

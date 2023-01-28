const viewProfile = document.getElementById("view-profile");
const editProfile = document.getElementById("edit-profile");
const updateForm = document.getElementById("edit-user-form");
const slider = (viewDisplay, editDisplay) => {
  viewProfile.style.display = viewDisplay;
  editProfile.style.display = editDisplay;
};

const editBtn = document.getElementById("open-edit-user-btn");
editBtn.onclick = function () {
  slider("none", "block");
};

const backBtn = document.getElementById("back-to-view-profile-btn");
backBtn.onclick = function (e) {
  e.preventDefault();
  slider("block", "none");
};

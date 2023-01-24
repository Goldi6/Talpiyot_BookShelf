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

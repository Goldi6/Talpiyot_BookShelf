const logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = function () {
  console.log(logoutBtn);
  fetch("http://localhost:3000/admin/logout", {
    method: "POST",
  }).then(() => (window.location.href = "http://localhost:3000/admin"));
};

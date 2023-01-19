const logout = document.querySelector("#logout-btn");
logout.onclick = function () {
  alert();
  fetch("/users/logout").then((res) => {
    if (res.ok) {
      // let url = window.location
      window.location.reload();
    }
  });
};

console.log(logout);

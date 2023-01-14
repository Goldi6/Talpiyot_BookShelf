const loginForm = document.getElementById("admin-login");

loginForm.onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[type='email']").value;
  const password = form.querySelector("input[type='password']").value;

  const data = { email, password };
  fetch("http://localhost:3000/admin/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin

    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      // console.log(html);
      window.location.reload();
      document.innerHTML = html;
    });
  //   .then((user) => {
  //   if (user.token) {
  //     setToken(user.token);
  //     welcome(user.user);
  //   } else {
  //     const message = user.message;
  //     alert(message);
  //   }
  // });
};

///
////

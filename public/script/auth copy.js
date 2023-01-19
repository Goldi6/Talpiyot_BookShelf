import { postAuth } from "./modules/loginAndRegistration.js";
import { redirectByUserAuthentication } from "./modules/User_dataGetters.js";
import { errorHandler } from "./errorHandle.js";
/////////////////////////
window.onload = function () {
  redirectByUserAuthentication();
};
/////////////////////////

//////////////////////////

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

function setToken(token, user) {
  localStorage.setItem("token", token);
}
function welcome(user) {
  alert(user.firstName + " logged in!");
  window.location.replace("http://localhost:3000");
}

registerForm.onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[type='email']").value;
  const firstName = document.getElementById("register_inp-firstname").value;
  const lastName = document.getElementById("register_inp-lastname").value;

  const birthday = form.querySelector("input[type='date']").value;
  // let age = new Date() - new Date(date).getTime();
  // age = new Date(age);
  // age = age.getUTCFullYear();
  // age = Math.abs(age - 1970);

  const password1 = form.querySelector("#register_inp-password1").value;
  const password2 = form.querySelector("#register_inp-password2").value;

  if (password1 === password2) {
    const password = password1;
    const data = { firstName, lastName, password, email, birthday };
    console.log(data);
    console.log();

    postAuth("http://localhost:3000/users/new", data).then((user) => {
      console.log(user);
      if (user.token) {
        setToken(user.token);
        welcome(user.user);
      } else {
        const message = user.message;
        alert(message);
        errorHandler(user);
      }
    });
  } else {
    console.log("password error");
  }
};
loginForm.onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[type='email']").value;
  const password = form.querySelector("input[type='password']").value;

  const data = { email, password };
  postAuth("http://localhost:3000/users/login", data).then((user) => {
    console.log(user);
    if (user.status) {
      const message = user.errorObjects[0].reason;
      alert(message);
      errorHandler(user);
    } else {
      console.log(document.cookie);
      console.log(user);
      console.log("!!!");
      if (user.token) {
        setToken(user.token);
        welcome(user.user);
      } else {
        const message = user.message;
        alert(message);
      }
    }
  });
};

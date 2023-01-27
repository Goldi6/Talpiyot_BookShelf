import { postAuth } from "./modules/loginAndRegistration.js";
import { formErrHandler } from "./form_errorHandler.js";
/////////////////////////

/////////////////////////

//////////////////////////

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

registerForm.onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector("input[type='email']").value;
  const firstName = document.getElementById("register_inp-firstname").value;
  const lastName = document.getElementById("register_inp-lastname").value;

  const birthday = form.querySelector("#register_inp-birthday").value;
  // let age = new Date() - new Date(date).getTime();
  // age = new Date(age);
  // age = age.getUTCFullYear();
  // age = Math.abs(age - 1970);

  const password1 = form.querySelector("#register_inp-password").value;
  const password2 = form.querySelector("#register_inp-password2").value;

  if (password1 === password2) {
    const password = password1;
    const data = { firstName, lastName, password, email, birthday };
    console.log(data);
    console.log();

    postAuth("http://localhost:3000/users", data)
      .then((user) => {
        //console.log(user);
        if (user.user) {
          //setToken(user.token);
          //welcome(user.user);
          window.location.replace("/");
        } else {
          formErrHandler(user, form);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    //TODO:
    const errObj = [{ path: "password", reason: "passwords don't match" }];
    const err = { name: validationFailed, errorObjects: errObj };

    formErrHandler(err, form);
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
      formErrHandler(user, form);
    } else {
      //console.log(document.cookie);
      console.log(user);

      if (user.user) {
        //setToken(user.token);
        // welcome(user.user);
        window.location.replace("/");
      }
    }
  });
};

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchBtn_reg = document.getElementById("reg-form_switch-btn");
const switchBtn_log = document.getElementById("log-form_switch-btn");
const forgotBtn_log = document.getElementById("forgot-password-btn");

/////////////////////////////////////////

switchBtn_reg.onclick = function (e) {
  e.target.style.display = "none";
  switchBtn_log.style.display = "block";
  forgotBtn_log.style.display = "block";
  loginForm.style.display = "none";
  registerForm.style.display = "block";
};
switchBtn_log.onclick = function (e) {
  e.target.style.display = "none";
  switchBtn_reg.style.display = "block";
  forgotBtn_log.style.display = "none";

  registerForm.style.display = "none";
  loginForm.style.display = "block";
};

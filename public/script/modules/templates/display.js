function displayOfHeaderProfileOptions(loggedIn = true) {
  const icon = document.getElementById("profile-icon");
  const logout = document.getElementById("logout-btn");

  const display = loggedIn ? "block" : "none";

  icon.style.display = display;
  logout.style.display = display;

  if (display === "none") {
    //remove event listeners:
    icon.parentNode.replaceChild(icon.cloneNode(true), icon);
    logout.parentNode.replaceChild(logout.cloneNode(true), logout);
    //icon.removeEventListener("click");
    //logout.removeEventListener("click");
  }
}

export { displayOfHeaderProfileOptions };

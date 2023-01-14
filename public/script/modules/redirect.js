function redirect() {
  const token = localStorage.getItem("adminToken");

  if (token !== "") {
    let location = window.location.toString();
    location.replace(".html", "");
    location = location.replace("login", "dashboard");
    console.log(location);
    window.location.replace(location);
  } else {
  }

  //console.log(token);
}

export { redirect };

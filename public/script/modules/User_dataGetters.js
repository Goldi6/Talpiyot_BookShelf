import { displayOfHeaderProfileOptions } from "./templates/display.js";

const getUser = async function (token, isAdmin = false) {
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  const userType = isAdmin ? "admin" : "users";

  const user = await fetch(`http://localhost:3000/${userType}/get`, {
    headers,
  })
    .then((data) => {
      if (data.ok) {
        console.log(data);

        return data.json();
      } else {
        throw new Error("cannot get user");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};

const getUserCart = async (token) => {
  const headers = new Headers({ Authorization: "Bearer " + token });
  return await fetch("/users/cart/get", { headers })
    .then((cart) => {
      return cart.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const userLoggedIn = async (token, isAdmin = false) => {
  return await getUser(token, isAdmin).then((user) => {
    console.log(user);

    if (user !== undefined) {
      return true;
    } else return false;
  });
};

const redirectByUserAuthentication = async (isLoginPage = true) => {
  const redirectPath = "http://localhost:3000";

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    userLoggedIn(token).then((logged) => {
      if (logged) {
        if (isLoginPage) {
          window.location.replace(redirectPath);
        }
      } else {
        window.localStorage.removeItem("token");
        if (!isLoginPage) {
          window.location.replace(redirectPath);
        }
      }
    });
  } else {
    window.localStorage.removeItem("token");
    if (!isLoginPage) {
      window.location.replace(redirectPath);
    }
  }
};

const setupUsername = async (token, isAdmin = false) => {
  return await getUser(token, isAdmin)
    .then((user) => {
      //console.log(user);

      if (user !== undefined) {
        console.log(user);
        const username = user.firstName + " " + user.lastName;
        setupLoggedInHeader(username, isAdmin);

        //////
        //NOTE: global userObject
        // var userObject = user;

        /////
      } else {
        clearStorage(isAdmin);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

function clearStorage(isAdmin = false) {
  const username_block = document.getElementById("header-username");
  const tokenType = isAdmin ? "admin-token" : "token";
  window.localStorage.removeItem(tokenType);
  username_block.innerHTML = "Login";
  const userType = isAdmin ? "admin" : "user";
  username_block.href = `http://localhost:3000/${userType}/login`;
}

function setupLoggedInHeader(username, isAdmin = false) {
  //console.log(isAdmin);
  const userType = isAdmin ? "admin" : "user";
  // console.log(userType);
  const username_block = document.getElementById("header-username");
  username_block.innerHTML = username;
  username_block.href = `http://localhost:3000/${userType}/profile`;

  const mq = window.matchMedia("(max-width: 650px)");

  if (mq.matches) {
    username_block.style.display = "none";
  }

  displayOfHeaderProfileOptions();
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    logout(isAdmin);
  });

  const profileIcon = document.getElementById("profile-icon");

  profileIcon.addEventListener("click", () => {
    window.location = `http://localhost:3000/${userType}/profile`;
  });
}

/////////////
////////////

const logout = async (isAdmin = false) => {
  if (!localStorage.getItem("token")) {
    alert("user doesn't have token!");
    clearStorage();
  } else {
    const userType = isAdmin ? "admin" : "users";
    const token = localStorage.getItem("token");

    const headers = new Headers({
      Authorization: "Bearer " + token,
    });
    return await fetch(`http://localhost:3000/${userType}/logout`, {
      headers,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        clearStorage(isAdmin);
        alert("user logged out!");
        if (window.location.href.includes("admin")) {
          const redirectPath = "http://localhost:3000/admin/login";
          window.location.replace(redirectPath);
        }
        if (window.location.href.includes("profile")) {
          const redirectPath = "http://localhost:3000";
          window.location.replace(redirectPath);
        } else if (window.location.href.includes("cart")) {
          window.location.reload();
        } else {
          displayOfHeaderProfileOptions(false);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }
};

export {
  setupUsername,
  clearStorage,
  userLoggedIn,
  redirectByUserAuthentication,
  getUser,
  getUserCart,
};

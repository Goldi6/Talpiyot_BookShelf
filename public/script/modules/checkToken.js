const isAdminCheck = () => {
  const location = window.location.href;
  return location.includes("admin");
};
const getToken = (isAdmin = isAdminCheck()) => {
  if (isAdmin) return localStorage.getItem("admin-token");
  return localStorage.getItem("token");
};

const tokenExists = (forAdmin = false) => {
  if (forAdmin) {
    return localStorage.getItem("admin-token");
  }
  return localStorage.getItem("token");
};

export { isAdminCheck, getToken, tokenExists };

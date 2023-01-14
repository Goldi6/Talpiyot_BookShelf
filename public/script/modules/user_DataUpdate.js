const updateUserData = async (data, token, isAdmin) => {
  const host = "http://localhost:3000";

  const path = isAdmin ? host + "/admin/update" : host + "/users/update";

  const headers = new Headers({
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  });
  return await fetch(path, {
    headers,
    method: "PATCH",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // console.log(response);
        return response.json();
      } else {
        throw new Error("cannot update user");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export { updateUserData };

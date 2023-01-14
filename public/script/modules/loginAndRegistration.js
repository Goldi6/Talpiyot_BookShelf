const postAuth = async (url, data) => {
  console.log(data);

  const user = fetch(url, {
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
      //  if (response.ok) {
      // console.log(response);
      return response.json();
    })

    .catch((err) => {
      console.log(err);
    });

  return user;
};

export { postAuth };

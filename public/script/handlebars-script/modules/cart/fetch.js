const DBrequest = async (id, method, queryString = "") => {
  return await fetch(
    `/users/cart/${id}${queryString !== "" ? "?" : ""}${queryString}`,
    {
      method: method,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export { DBrequest };

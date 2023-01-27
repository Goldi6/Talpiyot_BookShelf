const getUserCart = async () => {
  // const headers = new Headers({ Authorization: "Bearer " + token });
  return await fetch("/users/cart")
    .then((cart) => {
      return cart.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getUserCart };

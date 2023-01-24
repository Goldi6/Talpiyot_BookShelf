const showActionMessage = (message) => {
  const box = document.getElementById("action-message");
  box.innerHTML = message;
  box.style.display = "block";
  const opacPromice = new Promise((resolve) => {
    setTimeout(() => {
      box.classList.add("opacity");
      resolve();
    }, 100);
  })
    .then(() => {
      setTimeout(() => {
        box.classList.remove("opacity");
        return;
      }, 1200);
    })
    .then(() => {
      setTimeout(() => {
        box.style.display = "none";
      }, 2500);
    });
};

export { showActionMessage };

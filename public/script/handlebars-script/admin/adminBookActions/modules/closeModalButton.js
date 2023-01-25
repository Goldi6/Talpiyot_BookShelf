function setupCloseModalButton() {
  const closeBtn = document.querySelector("#close-modal");
  closeBtn.addEventListener(
    "click",
    () => {
      modal.innerHTML = "";
      modal.style.display = "none";
      window.location.reload();
    },
    { once: true }
  );
}

export { setupCloseModalButton };

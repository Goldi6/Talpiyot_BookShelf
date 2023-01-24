const verifyModal = (price = "") => {
  const modal = document.getElementById("modal");

  modal.style.display = "grid";

  modal.innerHTML = `<div id="checkout-modal-inner">
        <h2>Thank you for your purchase!</h2>
    </div>`;
  const child = modal.childNodes[0];
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.setAttribute("id", "close-model-btn");

  closeBtn.addEventListener(
    "click",
    () => {
      modal.innerHTML = "";
      modal.style.display = "none";
      window.location.reload();
    },
    { once: true }
  );
  child.append(closeBtn);
};

export { verifyModal };

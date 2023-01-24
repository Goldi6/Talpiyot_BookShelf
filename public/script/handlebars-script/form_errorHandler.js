const formErrHandler = (err, form) => {
  console.log(err);
  const fields = form.querySelectorAll("input:not([type='submit'])");

  const erroredFields = err.errorObjects;
  let parent = fields[0].parentNode;
  let up = false;
  if (parent.tagName == "LABEL") {
    parent = parent.parentNode;
    up = true;
  }

  console.log(erroredFields);
  erroredFields.map((obj) => {
    console.log(obj.path);
    let el;
    if (obj.path !== "login") {
      for (const inp of fields) {
        if (inp.name === obj.path) {
          el = inp;
          break;
        }
      }
    } else {
      el = fields[0];
    }
    el.classList.add("error");

    if (up) {
      el = el.parentNode;
    }

    const textBlock = document.createElement("p");
    textBlock.classList.add("form-error-message");
    textBlock.innerHTML = "* " + obj.path + ": " + obj.reason;

    parent.insertBefore(textBlock, el);
  });
};

const showError = (errorsObject, block) => {
  for (const err of errorsObject) {
    let el = document.createElement("p");
    el.classList.add("form-error-message");
    el.innerHTML = "* " + err.path + ": " + err.reason;
    block.append(el);
  }
};
export { showError, formErrHandler };

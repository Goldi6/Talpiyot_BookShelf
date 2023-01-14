import { getBooks } from "./modules/Book_dataGetters.js";

window.onload = function () {
  getBooks();
};

function update_ShowPagesOption(limit) {
  let options = document.querySelector("#show-number-of-books");
  // options = options.querySelectorAll("option");
  //console.log(options);
  options.value = limit;
}
function update_pagination(pagination) {
  const pagination_block = document.querySelector("#pagination");
  const options = pagination_block.querySelectorAll(".page-num");

  for (const p of options) {
    let val = p.getAttribute("id").split("-");
    val.shift();
    val = val.join("-");

    if (pagination[val]) {
      p.innerHTML = pagination[val];
    } else {
      p.style.display = "none";
    }
  }
}

function getParams() {
  const searchInput = document.getElementById("search-input");
  const booksAmountToShow = document.getElementById("show-number-of-books");
  const limit = booksAmountToShow.value;
  const searchFor = searchInput.value;
  const queries = `?limit=${limit}&search=${searchFor}`;

  return queries;
}

const searchBtn = document.getElementById("search-go");
searchBtn.onclick = function () {
  const queries = getParams();

  getBooks(queries).then((data) => {
    const { pages, limit } = data;
    console.log(pages);
    update_ShowPagesOption(limit);
    update_pagination(pages);
  });
};

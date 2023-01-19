//pagination

const searchBtn = document.getElementById("search-go");

searchBtn.onclick = function () {
  const searchInput = document.getElementById("search-input");
  const booksAmountToShow = document.getElementById("show-number-of-books");
  //console.log(booksAmountToShow)
  const limit = booksAmountToShow.value;
  const searchFor = searchInput.value;

  const queries = `limit=${limit}&search=${searchFor}`;
  window.location.href = "http://localhost:3000/books/search?" + queries;
};

const pageNumbers = document.querySelectorAll(".page-num");
for (const num of pageNumbers) {
  num.onclick = function () {
    const page = num.getAttribute("data-query");
    let url = new URL(window.location.href);
    const cleanUrl =
      location.protocol + "//" + location.host + location.pathname;
    let params = url.search;
    //console.log(params);
    if (!params.includes("page")) {
      params += "&page=" + page;
    } else {
      const regex = /page=\d*/;
      params = params.replace(regex, `page=${page}`);
    }
    const sign = params.indexOf("?") === -1 ? "?" : "";
    window.location.href = cleanUrl + sign + params;
  };
}

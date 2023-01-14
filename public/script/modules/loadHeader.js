async function loadHeader() {
  const header = document.getElementsByTagName("header")[0];
  const html = await fetch("../generalElements/nav.html")
    .then((data) => {
      if (data.ok) return data.text();
    })
    .catch((err) => {
      console.log(err);
    });
  header.innerHTML = html;
}

export { loadHeader };

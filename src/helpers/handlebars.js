const hbs = require("hbs");

const path = require("path");

const viewsPath = path.join(__dirname, "../../public/templates/views");
const partialPath = path.join(__dirname, "../../public/templates/partials");

hbs.registerPartials(partialPath);

hbs.registerHelper("equalsTo", function (value, equalsTo) {
  const a = (value + "").toLowerCase();
  const b = (equalsTo + "").toLowerCase();
  return a == b;
});
hbs.registerHelper("getBirthday", function (fullDate) {
  const date = new Date(fullDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const cleanDate = day + "/" + month + "/" + year;

  return cleanDate;
});

hbs.registerHelper("multiply", function (a, b) {
  return parseInt(a) * parseInt(b);
});

module.exports = { hbs, viewsPath };

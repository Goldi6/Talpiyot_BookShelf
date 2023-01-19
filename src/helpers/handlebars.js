const hbs = require("hbs");

const path = require("path");

const viewsPath = path.join(__dirname, "../../public/templates/views");
const partialPath = path.join(__dirname, "../../public/templates/partials");

hbs.registerPartials(partialPath);

hbs.registerHelper("equalsTo", function (value, equalsTo) {
  return value == equalsTo;
});
hbs.registerHelper("getBirthday", function (fullDate) {
  return value == equalsTo;
});

module.exports = { hbs, viewsPath };

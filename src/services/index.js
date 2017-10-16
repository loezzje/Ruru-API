const organizations = require('./organizations/organizations.service.js');
const categories = require('./categories/categories.service.js');
const faq = require('./faq/faq.service.js');
const ruru = require('./ruru/ruru.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(organizations);
  app.configure(categories);
  app.configure(faq);
  app.configure(ruru);
};

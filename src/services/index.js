const organizations = require('./organizations/organizations.service.js');
const categories = require('./categories/categories.service.js');
const faqs = require('./faqs/faqs.service.js');
const ruru = require('./ruru/ruru.service.js');
const users = require('./users/users.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(organizations);
  app.configure(categories);
  app.configure(faqs);
  app.configure(ruru);
  app.configure(users);
};

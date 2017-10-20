// Initializes the `FAQS` service on path `/faqs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/faqs.model');
const hooks = require('./faqs.hooks');
const filters = require('./faqs.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'faqs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/faqs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('faqs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

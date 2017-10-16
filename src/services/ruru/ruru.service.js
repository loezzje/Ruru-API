// Initializes the `ruru` service on path `/ruru`
const createService = require('feathers-mongoose');
const createModel = require('../../models/ruru.model');
const hooks = require('./ruru.hooks');
const filters = require('./ruru.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'ruru',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ruru', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ruru');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

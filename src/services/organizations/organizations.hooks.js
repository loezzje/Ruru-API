const { authenticate } = require('feathers-authentication').hooks;
const { restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
];


const addToCategory = require('../../hooks/add-to-category');


const splitFeatures = require('../../hooks/split-features');


const removeFromCategory = require('../../hooks/remove-from-category');


const newId = require('../../hooks/new-id');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [newId(), splitFeatures(), addToCategory()],
    update: [splitFeatures(), addToCategory(), removeFromCategory()],
    patch: [splitFeatures(), addToCategory(), removeFromCategory()],
    remove: [removeFromCategory()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

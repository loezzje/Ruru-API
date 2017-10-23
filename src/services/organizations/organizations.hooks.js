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
    create: [...restrict, newId(), splitFeatures(), addToCategory()],
    update: [...restrict, splitFeatures(), addToCategory(), removeFromCategory()],
    patch: [...restrict, splitFeatures(), addToCategory(), removeFromCategory()],
    remove: [...restrict,removeFromCategory()]
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

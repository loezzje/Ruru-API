const { authenticate } = require('feathers-authentication').hooks;
const { restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
];


const addToCategory = require('../../hooks/add-to-category');


const splitFeatures = require('../../hooks/split-features');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [...restrict],
    create: [...restrict, addToCategory(), splitFeatures()],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict]
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

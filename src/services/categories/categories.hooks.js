const { authenticate } = require('feathers-authentication').hooks;
const { restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
];

const organizationsSchema = {
  include: {
    service: 'organizations',
    nameAs: 'organizations',
    parentField: 'organizationsId',
    childField: '_id'
  }
};

const fixOrganizationArray = require('../../hooks/fix-organization-array');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [...restrict],
    update: [...restrict],
    patch: [...restrict],
    remove: [...restrict]
  },

  after: {
    all: [fixOrganizationArray(), populate({ schema: organizationsSchema })],
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

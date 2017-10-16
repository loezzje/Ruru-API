const assert = require('assert');
const app = require('../../src/app');

describe('\'ruru\' service', () => {
  it('registered the service', () => {
    const service = app.service('ruru');

    assert.ok(service, 'Registered the service');
  });
});

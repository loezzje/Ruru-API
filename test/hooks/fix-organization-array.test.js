const assert = require('assert');
const fixOrganizationArray = require('../../src/hooks/fix-organization-array');

describe('\'fix-organization-array\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {};
    // Initialize our hook with no options
    const hook = fixOrganizationArray();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, mock, 'Returns the expected hook object');
    });
  });
});

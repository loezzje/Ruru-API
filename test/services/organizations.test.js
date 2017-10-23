/*global done: true*/
/*eslint no-undef: "error"*/
const assert = require('assert');
const app = require('../../src/app');

describe('\'organizations\' service', () => {

  const org1 = { name: 'Test organization',
    features: 'feature1; feature2; feature3;',
    categories: [] };

  it('registered the service', () => {
    const service = app.service('organizations');

    assert.ok(service, 'Registered the service');
  });

  it('runs create', function(done) {
    app.service('organizations').create(org1).then(organization => {
      assert.ok(organization._id);
      assert.equal(organization.name, 'Test organization');
      assert.deepEqual(organization.features,  [ 'feature1', 'feature2', 'feature3' ]);
      done();
    }).catch(done);
  });

  it('runs update', function(done) {
    app.service('organizations').update(org1._id, { name: 'Test organization',
      features: 'feature1; feature2' }).then(organization => {
      assert.ok(organization._id);
      assert.equal(organization.name, 'Test organization');
      assert.deepEqual(organization.features,  [ 'feature1', 'feature2' ]);
      done();
    }).catch(done);
  });

});

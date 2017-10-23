const assert = require('assert');
const app = require('../../src/app');

describe('\'categories\' service', () => {
  const category1 = { name: 'Test category',
    icon: 'bookmark',
    organizationsId: [] };

  it('registered the service', () => {
    const service = app.service('categories');

    assert.ok(service, 'Registered the service');
  });

  it('runs create', function(done) {
    app.service('categories').create(category1).then(category => {
      assert.ok(category._id);
      assert.equal(category.name, 'Test category');
      assert.deepEqual(category.organizationsId,  [ ]);
      done();
    }).catch(done);
  });

  it('runs update', function(done) {
    app.service('categories').update(category1._id, { name: 'Test category 2',
      icon: 'book' }).then(category => {
      assert.ok(category._id);
      assert.equal(category.name, 'Test category 2');
      assert.deepEqual(category.organizationsId,  [ ]);
      done();
    }).catch(done);
  });
});

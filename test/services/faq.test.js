const assert = require('assert');
const app = require('../../src/app');
const mongooseClient = app.get('mongooseClient');

describe('\'FAQ\' service', () => {
  const faq1 = {
    _id: new mongooseClient.Types.ObjectId(),
    question: 'Are the terms ‘refugee’ and ‘migrant’ interchangeable?',
    answer: 'No.',
    categoriesId: ['59ee141e04ba61422b0d8857'] };

  it('registered the service', () => {
    const service = app.service('faq');

    assert.ok(service, 'Registered the service');
  });

  it('runs create', function(done) {
    app.service('faq').create(faq1).then(faq => {
      assert.ok(faq._id);
      assert.equal(faq.question, 'Are the terms ‘refugee’ and ‘migrant’ interchangeable?');
      assert.equal(faq.answer, 'No.');
      assert.deepEqual(faq.categoriesId.map(x => x.toString()), faq1.categoriesId);
      done();
    }).catch(done);
  });

  it('runs update', function(done) {
    app.service('faq').update(faq1._id, {
      question: 'Are the terms ‘refugee’ and ‘migrant’ interchangeable?',
      answer: 'No.',
      categoriesId: ['59ee141e04ba61422b0d8857', '59ee141e04ba61422b0d8858']
    }).then(faq => {
      assert.ok(faq._id);
      assert.equal(faq.question, 'Are the terms ‘refugee’ and ‘migrant’ interchangeable?');
      assert.equal(faq.answer, 'No.');
      assert.deepEqual(faq.categoriesId.map(x => x.toString()),  ['59ee141e04ba61422b0d8857', '59ee141e04ba61422b0d8858']);
      done();
    }).catch(done);
  });
});

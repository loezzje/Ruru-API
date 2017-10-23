const assert = require('assert');
const addToCategory = require('../../src/hooks/add-to-category');

describe('\'addToCategory\' hook', () => {
  it('runs the hook', () => {
    // A mock hook object
    const mock = {
      id: '59edbf19195b12435bc80438',
      data: {
        logo: 'http://allemediavacatures.nl/wp-content/uploads/2017/02/I-amsterdam-logo.png',
        name: 'I Amsterdam',
        tagline: 'All about visiting, living and working in Amsterdam',
        website: 'www.iamsterdam.com/en',
        categories: ['59edbf19195b12435bc8043a', '59edbf19195b12435bc8043d', '59edbf19195b12435bc8043c'],
      }
    };
    const expectedResult = {
      id: '59edbf19195b12435bc80438',
      data: {
        logo: 'http://allemediavacatures.nl/wp-content/uploads/2017/02/I-amsterdam-logo.png',
        name: 'I Amsterdam',
        tagline: 'All about visiting, living and working in Amsterdam',
        website: 'www.iamsterdam.com/en',
      },
      params: {
        user: {
          _id: 'Test id'
        }
      }
    };
    // Initialize our hook with no options
    const hook = addToCategory();

    // Run the hook function (which returns a promise)
    // and compare the resulting hook object
    return hook(mock).then(result => {
      assert.equal(result, expectedResult, 'Returns the expected hook object');
    });
  });
});

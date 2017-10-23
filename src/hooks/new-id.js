var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function newId (hook) {
    hook.data._id = new mongoose.Types.ObjectId;
    return Promise.resolve(hook);
  };
};

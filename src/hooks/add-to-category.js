var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    debugger;
    hook.data._id = new mongoose.Types.ObjectId;
    hook.data.categories.map(function(categoryId){
      hook.app.service('organizations')
        .findByIdAndUpdate(categoryId, { $addToSet: { organizationsId: hook.data._id }});
    });

    return Promise.resolve(hook);
  };
};

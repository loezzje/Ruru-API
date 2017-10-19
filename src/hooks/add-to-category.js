var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    if (!hook.data.categories) return hook;

    hook.data._id = new mongoose.Types.ObjectId;
    hook.data.categories.map(function(categoryId){
      hook.app.service('categories')
        .patch({ _id: categoryId }, { $addToSet: { organizationsId: hook.data._id }});
    });
    return Promise.resolve(hook);
  };
};

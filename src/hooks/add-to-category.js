var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    hook.data._id = new mongoose.Types.ObjectId;
    debugger;
    hook.data.categories.map(function(categoryId){
      hook.app.service('categories')
        .patch({ _id: categoryId }, { $addToSet: { organizationsId: hook.data._id }});
    });
    debugger;
    return Promise.resolve(hook);
  };
};

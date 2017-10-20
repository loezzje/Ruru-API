var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    // if (!hook.data.categories) return hook;

    if (!hook.id) hook.data._id = new mongoose.Types.ObjectId;

    // update categories with (new) organization
    hook.app.service('categories').find()
      .then((result) => {
        result.data.map(function(category){
          //organization contains category
          if (hook.data.categories.includes(category._id.toHexString())) {
            //check if category contains organization as well
            category.organizationsId.includes(hook.id)
              ? null
              : (category.organizationsId.push(hook.id),
                hook.app.service('categories').update(category._id.toHexString(), category));
          }
          //organization does NOT contain category
          else {
            debugger;
            category.organizationsId.includes(hook.id)
              ? (category.organizationsId.splice(category.organizationsId.indexOf(hook.id), 1),
                hook.app.service('categories').update(category._id.toHexString(), category))
              : null;
          }
        });
      });

    return Promise.resolve(hook);
    // hook.data.categories.map(function(categoryId){
    //   hook.app.service('categories')
    //   .patch({ _id: categoryId }, { $addToSet: { organizationsId: hook.data._id }});
    // });
  };
};

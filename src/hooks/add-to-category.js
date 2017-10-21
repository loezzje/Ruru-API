var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    // if (!hook.data.categories) return hook;

    if (!hook.id) hook.data._id = new mongoose.Types.ObjectId;
    var organizationId = mongoose.Types.ObjectId(hook.id);

    // update categories with (new) organization
    hook.app.service('categories').find()
      .then((result) => {
        result.data.map(function(category){
          //organization contains category
          if (hook.data.categories.includes(category._id.toHexString())) {
            //check if category contains organization as well
            category.organizationsId.map(orgId => orgId.toHexString()).includes(hook.id)
              ? null
              : (category.organizationsId.push(organizationId),
                hook.app.service('categories').update(category._id.toHexString(), category));
          }
          //organization does NOT contain category
          else {
            category.organizationsId.map(orgId => orgId.toHexString()).includes(hook.id)
              ? (category.organizationsId.splice(category.organizationsId.indexOf(organizationId), 1),
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

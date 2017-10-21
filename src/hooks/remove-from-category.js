var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function removeFromCategory (hook) {
    // if (!hook.data.categories) return hook;

    var organizationId = mongoose.Types.ObjectId(hook.id);

    // update categories with (new) organization
    hook.app.service('categories').find()
      .then((result) => {
        result.data.map(function(category){

          category.organizationsId.map(orgId => orgId.toHexString()).includes(hook.id)
            ? (category.organizationsId.splice(category.organizationsId.indexOf(organizationId), 1),
              hook.app.service('categories').update(category._id.toHexString(), category))
            : null;

        });
      });

    return Promise.resolve(hook);
  };
};

// if (hook.data.categories.includes(category._id.toHexString())) {
//   //check if category contains organization as well
//   category.organizationsId.map(orgId => orgId.toHexString()).includes(hook.id)
//     ? null
//     : (category.organizationsId.push(organizationId),
//       hook.app.service('categories').update(category._id.toHexString(), category));
// }

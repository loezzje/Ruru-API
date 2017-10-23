var mongoose = require('mongoose');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addToCategory (hook) {
    if (!hook.data.categoryIds) return hook;

    var organizationId = () => {
      return (hook.id === undefined) ?
        hook.data._id :
        mongoose.Types.ObjectId(hook.id);
    };

    function shouldCategoryBeUpdated(category) {
      // category is in the organization list
      return hook.data.categoryIds.includes(category._id.toString()) &&
      // category does NOT contains that organization already
      (!category.organizationsId.map(orgId =>
        orgId.toString()).includes(organizationId().toString()));
    }

    hook.app.service('categories').find()
      .then((result) => {
        result.data.map(function(category){
          shouldCategoryBeUpdated(category) ?
            (category.organizationsId.push(organizationId()),
              hook.app.service('categories').update(category._id.toString(), category)) :
            null;
        });
      });

    return Promise.resolve(hook);
  };
};

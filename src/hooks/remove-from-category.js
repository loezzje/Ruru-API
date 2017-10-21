module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function removeFromCategory (hook) {
    if (!hook.data.categories) return hook;

    function shouldDeleteFromCategory(category) {
      // category is NOT in the organization's list
      return (!hook.data.categories.includes(category._id.toString())) &&
      // category contains that organization
      category.organizationsId.map(orgId =>
        orgId.toString()).includes(hook.id);
    }

    hook.app.service('categories').find()
      .then((result) => {
        result.data.map(function(category){
          shouldDeleteFromCategory(category) ?
            (category.organizationsId
              .splice(category.organizationsId.map(orgId => orgId.toString()).indexOf(hook.id)
                , 1),
              hook.app.service('categories').update(category._id.toString(), category)) :
            null;
        });
      });

    return Promise.resolve(hook);
  };
};

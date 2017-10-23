// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function fixOrganizationArray (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (!hook.result.data) return Promise.resolve(hook);

    if (hook.method === 'find') {
      hook.result.data = hook.result.data.map((category) => (
        Object.assign(category, {
          organizations: category.organizations instanceof Array ? category.organizations : [category.organizations]
        })
      ));
    } else {
      hook.result = Object.assign(hook.result, {
        organizations: hook.result.organizations instanceof Array ? hook.result.organizations : [hook.result.organizations]
      });
    }
    return Promise.resolve(hook);
  };
};

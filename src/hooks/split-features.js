// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function splitFeatures (hook) {
    if (!hook.data.features) return hook;

    hook.data.features = hook.data.features.split(';').map(feature => feature.trim()).filter(function(feature) { return /\S/.test(feature); });
    return Promise.resolve(hook);
  };
};

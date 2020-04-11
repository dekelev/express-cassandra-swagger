const expressCassandraTransformer = require('./express-cassandra.transformer');

/**
 *
 * @param {Object} model - Express-Cassandra model
 * @param {Options} opts
 * @returns {*}
 */
function transformSchemaFromModel (model, opts) {
  return expressCassandraTransformer.transformSchema(model._properties, opts);
}

module.exports = {
  transformSchemaFromModel
};

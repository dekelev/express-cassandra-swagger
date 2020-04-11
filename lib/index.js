const expressCassandraSwagger = require('./express-cassandra-swagger');
const Options = require('./Options');

module.exports = {
  generateSchema: expressCassandraSwagger.generateSchema,
  generateSchemaRaw: expressCassandraSwagger.generateSchemaRaw,
  saveSchema: expressCassandraSwagger.saveSchema,
  Options,
};

# express-cassandra-swagger 
  
  [![Build Status](https://travis-ci.org/dekelev/express-cassandra-swagger.svg?branch=master)](https://travis-ci.org/dekelev/express-cassandra-swagger)
  [![Coverage Status](https://coveralls.io/repos/github/dekelev/express-cassandra-swagger/badge.svg?branch=master)](https://coveralls.io/github/dekelev/express-cassandra-swagger?branch=master)
  [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
  [![Dependency Status](https://img.shields.io/david/dekelev/express-cassandra-swagger.svg)](https://david-dm.org/dekelev/express-cassandra-swagger)
  [![npm](https://img.shields.io/npm/v/express-cassandra-swagger.svg?maxAge=3600)](https://www.npmjs.com/package/express-cassandra-swagger)

Swagger definition generator for Express-Cassandra models.  Forked from [objection-swagger](https://github.com/kibertoad/objection-swagger).

```
/**
 * @typedef {Object} GeneratedSwaggerYaml
 * @property {string} name Name of the model
 * @property {string} schema JSON schema in YAML format
 */

/**
 * Generates JSON schemas for inclusion in Swagger specifications from Express-Cassandra models
 * @param {Model|Model[]} modelParam - model(s) to generate schemas for
 * @param {Options} opts
 * @returns {GeneratedSwaggerYaml[]} generated JSON schemas as strings (in YAML format)
 */
function generateSchema(modelParam, opts = {})
```

```
/**
 * @typedef {Object} GeneratedSwagger
 * @property {string} name Name of the model
 * @property {Object} schema JSON schema
 */

/**
 * Generates JSON schemas from Express-Cassandra models
 * @param {Model|Model[]} modelParam - model(s) to generate schemas for
 * @param {Options} opts
 * @returns {GeneratedSwagger[]} generated JSON schemas as objects
 */
function generateSchemaRaw(modelParam, opts = {})
```

```
/**
 * Generates and saves into specified directory JSON schema files for inclusion in Swagger specifications from given
 * Express-Cassandra models
 * @param {Model|Model[]} modelParam - model(s) to generate schemas for
 * @param {string} targetDir - directory to write generated schemas to. Do not add '/' to the end.
 * @param {Options} opts
 * @returns {Promise} - promise that is resolved after schemas are written
 */
function saveSchema(modelParam, targetDir, opts = {})
```

## License

Licensed under the [MIT license](LICENSE).

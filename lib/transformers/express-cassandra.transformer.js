const _ = require('lodash');

const CQL_TO_SWAGGER_TYPES = {
  ascii: ['string'],
  bigint: [['integer', 'int64'], 'string'],
  blob: ['string'],
  boolean: ['boolean', 'string'],
  date: [['string', 'date']],
  decimal: [['integer', 'decimal'], 'float', 'string'],
  double: [['integer', 'double'], 'float', 'double', 'string'],
  float: [['integer', 'float'], 'float', 'string'],
  inet: ['string'],
  int: [['integer', 'int32'], 'string'],
  list: ['array', 'string'],
  map: ['object', 'string'],
  smallint: [['integer', 'int16'], 'string'],
  set: ['array', 'string'],
  text: ['string'],
  time: [['string', 'time']],
  timestamp: [['integer', 'int32'], ['string', 'date-time']],
  timeuuid: ['string'],
  tinyint: [['integer', 'int8'], 'string'],
  tuple: ['array', 'string'],
  uuid: ['string'],
  varchar: ['string'],
  varint: [['integer', 'int64'], 'string']
};

function transformSchema ({ name, schema }, opts) {
  const jsonSchema = {};

  jsonSchema.title = name;
  jsonSchema.type = 'object';
  jsonSchema.required = [];
  jsonSchema.properties = {};

  _.forOwn(schema.fields, (field, key) => {
    const value = isPlainObject(field) ? field : { type: field };

    if (value.private) {
      return;
    }

    const prop = {
      ..._getType(value.type)
    };

    if (prop.type === 'array') {
      prop.items = { ..._getArrayItemsType(value.typeDef) };
    }

    if (value.rule && value.rule.required) {
      jsonSchema.required.push(key);
    }

    jsonSchema.properties[key] = prop;
  });

  return jsonSchema;
}

function _getType (cqlType) {
  const types = CQL_TO_SWAGGER_TYPES[cqlType] || ['object', 'string'];
  let type, format;

  // Swagger 2.0 does not support multiple-value types and neither it does oneOf, so we have to just
  // pick first one
  if (Array.isArray(types[0])) { [type, format] = types[0]; } else { type = types[0]; }

  const result = { type };

  if (format) { result.format = format; }

  return result;
}

function _getArrayItemsType (typeDef) {
  const matches = typeDef.match(/<([a-z]+)/);

  return _getType(matches[3] || matches[1]);
}

function isPlainObject (obj) {
  return obj && obj.constructor === {}.constructor;
}

module.exports = {
  transformSchema
};

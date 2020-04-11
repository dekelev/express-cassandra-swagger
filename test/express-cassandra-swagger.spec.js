const assert = require('chai').assert;
const sinon = require('sinon');
const yaml = require('js-yaml');

const yamlWriter = require('../lib/utils/yaml.writer');
const expressCassandraSwagger = require('../lib/express-cassandra-swagger');

const SimpleModel = require('./models/SimpleModel');
const SimpleModelRequire = require('./models/SimpleModelRequire');

const SIMPLE_MODEL_SCHEMA =
  'title: SimpleModel\ntype: object\nrequired: []\nproperties:\n  intAttr:\n    type: integer\n    ' +
  'format: int32\n  stringAttr:\n    type: string\n  dateTimeAttr:\n    type: integer\n    format: int32\n';

const SIMPLE_MODEL_SCHEMA_OPEN_API_2 =
  'title: SimpleModel\ntype: object\nrequired: []\nproperties:\n  intAttr:\n    type: integer\n    ' +
  'format: int32\n  stringAttr:\n    type: string\n  dateTimeAttr:\n    type: integer\n    format: int32\n';

const SIMPLE_MODEL_SCHEMA_REQUIRE =
  'title: SimpleModel\ntype: object\nrequired:\n  - stringAttr\n  - dateTimeAttr\nproperties:\n  intAttr:\n    type: integer\n    ' +
  'format: int32\n  stringAttr:\n    type: string\n  dateTimeAttr:\n    type: integer\n    format: int32\n';

describe('express-cassandra-swagger', () => {
  beforeEach(() => {
    global.sinon = sinon.createSandbox();
  });

  afterEach(() => {
    global.sinon.restore();
  });

  describe('generateSchema', () => {
    it('generates model schema yaml from single model', () => {
      const result = expressCassandraSwagger.generateSchema(SimpleModel);

      assert.lengthOf(result, 1);
      assert.equal(result[0].name, 'SimpleModel');
      assert.equal(result[0].schema, SIMPLE_MODEL_SCHEMA);
    });

    it('generates model schema yaml from array of models', () => {
      const result = expressCassandraSwagger.generateSchema([SimpleModel]);

      assert.lengthOf(result, 1);
      assert.equal(result[0].name, 'SimpleModel');
      assert.equal(result[0].schema, SIMPLE_MODEL_SCHEMA);
    });

    it('generates model schema yaml with required fields', () => {
      const result = expressCassandraSwagger.generateSchema([SimpleModelRequire]);

      assert.lengthOf(result, 1);
      assert.equal(result[0].name, 'SimpleModel');
      assert.equal(result[0].schema, SIMPLE_MODEL_SCHEMA_REQUIRE);
    });

    it('saves model schema yaml', () => {
      let writeResult;
      const writeStub = global.sinon
        .stub(yamlWriter, 'writeYamlsToFs')
        .callsFake((writeParams) => {
          writeResult = writeParams;
        });

      const result = expressCassandraSwagger.saveSchema(SimpleModel, 'dummyDir');

      assert.lengthOf(writeResult, 1);
      assert.equal(writeResult[0].name, 'SimpleModel');
      assert.equal(writeResult[0].schema, SIMPLE_MODEL_SCHEMA);
    });
  });

  describe('generateSchemaRaw', () => {
    it('generates model schema from single model', () => {
      const result = expressCassandraSwagger.generateSchemaRaw(SimpleModel);

      assert.lengthOf(result, 1);
      assert.equal(result[0].name, 'SimpleModel');
      assert.deepEqual(result[0].schema, yaml.load(SIMPLE_MODEL_SCHEMA));
    });
  });
});

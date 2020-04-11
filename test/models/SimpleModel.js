const Model = {
  _properties: {
    name: 'SimpleModel',

    schema: {
      fields: {
        intAttr: 'int',
        stringAttr: { type: 'text' },
        dateTimeAttr: { type: 'timestamp' }
      }
    }
  }
};

module.exports = Model;

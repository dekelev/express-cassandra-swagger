const Model = {
  _properties: {
    name: 'SimpleModel',

    schema: {
      fields: {
        intAttr: 'int',
        stringAttr: { type: 'text', rule: { required: true } },
        dateTimeAttr: { type: 'timestamp', rule: { required: true } }
      }
    }
  }
};

module.exports = Model;

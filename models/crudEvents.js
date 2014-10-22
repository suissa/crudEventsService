module.exports = {
  create: {
    pre: function(obj) {
      console.log('Insert PRE: ', obj);
    },
    pos: function(obj) {
      console.log('Insert POS: ', obj);
    }
  },
  find: {
    pre: function(obj) {
      console.log('Find PRE: ', obj);
    },
    pos: function(obj) {
      console.log('Find POS: ', obj);
    }

  },
  update: {
    pre: function(obj) {
      console.log('Update PRE: ', obj);
    },
    pos: function(obj) {
      console.log('Update POS: ', obj);
    }

  },
  remove: {
    pre: function(obj) {
      console.log('Remove PRE: ', obj);
    },
    pos: function(obj) {
      console.log('Remove POS: ', obj);
    }

  }
};

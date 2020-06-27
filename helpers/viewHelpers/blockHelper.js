var helpers = function () {
  // ALL CREDIT FOR THIS CODE GOES TO:
  // https://www.npmjs.com/package/handlebars-extend-block
  // https://github.com/defunctzombie/handlebars-extend-block

  var blocks = Object.create(null);

  return {
    extend: function (name, context) {
      var block = blocks[name];
      if (!block) {
        block = blocks[name] = [];
      }

      block.push(context.fn(this));
    },
    block: function (name) {
      var val = (blocks[name] || []).join("\n");

      // clear the block
      blocks[name] = [];
      return val;
    },
  };
};
module.exports.helpers = helpers;

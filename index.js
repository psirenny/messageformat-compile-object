var jsfy = require('jsfy');
var MessageFormat = require('messageformat');
var traverse = require('traverse');

module.exports = function (options, callback) {
  var mf = new MessageFormat(
    options.locale,
    options.plural,
    options.formatters
  );

  var build = traverse(options.strings).map(function (str) {
    if (this.notLeaf) return;
    var ast = MessageFormat._parse('' + str);
    var fn = mf._precompile(ast);
    fn = new Function('return (' + fn + ').apply(this, arguments);');
    this.update(fn, false);
  });

  build = {strings: build};
  build = jsfy(build);
  build = new Function(mf.runtime.toString() + ' return ' + build);
  callback(null, build);
};

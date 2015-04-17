MessageFormat Compile Object
============================

Compile messageformat.js translation string objects.

[![Build Status](https://travis-ci.org/psirenny/messageformat-compile-object.png?branch=master)](https://travis-ci.org/psirenny/messageformat-compile-object)

Installation
------------

    npm install messageformat-compile-object --save

Usage
-----

    var compile = require('messageformat-compile-object');

    var obj = {locale: 'es'};

    obj.strings = {
      "foo": {
        "bar": "baz!"
      }
    };

    obj.plural = function (n) {
      return n === 1 ? 'one' : 'other';
    };

    compile(obj, function (err, fns) {
      fns().strings.foo.bar(); // "baz!"
    });

Options
-------

**locale** - The locale to use. MessageFormat defaults to 'en'.

**strings** - The translation strings to compile. **Required**

**plural** - Specify a plural function for the locale. MessageFormat includes most of these.

**formatters** - Specify formatters for the locale.

Build script
------------

That's great… but how do I write this to a build script:

    var compile = require('messageformat-compile-object');
    var fs = require('fs');
    var src = require('./locale');
    var dest = ...

    compile(src, function (err, fns) {
      var build = 'module.exports = ' + fns.toString();
      fs.writeFileSync(dest, build);
    });

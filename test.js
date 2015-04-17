var test = require('tape');
var lib = require('./index');

var en = {locale: 'en', strings: {foo: {}}};
en.strings.foo.greeting = 'hello {user}';
en.strings.foo.people = '{num, plural, one {1 person} other {# people}}';

var rb = {locale: 'rb', strings: {foo: {}}};
rb.strings.foo.greeting = 'welcome {user}';
rb.strings.foo.people = '{num, plural, one {1 human} other {# humans}}';
rb.plural = function (n) {
  return n === 1 ? 'one' : 'other';
};

test('lib', function (t) {
  t.plan(1);
  t.equal(typeof lib, 'function');
});

test('compile default locale', function (t) {
  t.plan(8);

  lib(en, function (err, fns) {
    t.error(err);
    t.equal(typeof fns, 'function');
    t.equal(typeof fns(), 'object');
    t.equal(typeof fns().strings.foo.greeting, 'function');
    t.equal(typeof fns().strings.foo.people, 'function');
    t.equal(fns().strings.foo.greeting({user: 'dude'}), 'hello dude');
    t.equal(fns().strings.foo.people({num: 1}), '1 person');
    t.equal(fns().strings.foo.people({num: 3}), '3 people');
  });
});

test('compile custom locale', function (t) {
  t.plan(3);

  lib(rb, function (err, fns) {
    t.equal(fns().strings.foo.greeting({user: 'dude'}), 'welcome dude');
    t.equal(fns().strings.foo.people({num: 1}), '1 human');
    t.equal(fns().strings.foo.people({num: 3}), '3 humans');
  });
});

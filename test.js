var test = require('tape');
var lib = require('./index');

var en = {locale: 'en', strings: {foo: {}}};
en.strings.foo.greeting = 'hello {user}';
en.strings.foo.people = '{num, plural, one {1 person} other {# people}}';

var es = {locale: 'es', strings: {foo: {}}};
es.strings.foo.greeting = 'hola {user}';
es.strings.foo.people = '{num, plural, one {1 persona} other {# personas}}';

var rb = {locale: 'rb', strings: {foo: {}}};
rb.strings.foo.greeting = 'welcome {user}';
rb.strings.foo.people = '{num, plural, one {1 human} other {# humans}}';

test('lib', function (t) {
  t.plan(1);
  t.equal(typeof lib, 'function');
});

test('compile', function (t) {
  t.plan(7);
  lib(en, function (err, fns) {
    t.error(err);
    t.equal(typeof fns, 'function');
    t.equal(typeof fns(), 'object');
    t.equal(typeof fns().strings.foo.greeting, 'function');
    t.equal(typeof fns().strings.foo.people, 'function');
    t.equal(fns().strings.foo.greeting({user: 'dude'}), 'hello dude');
    t.equal(fns().strings.foo.people({num: 3}), '3 people');
  });
});

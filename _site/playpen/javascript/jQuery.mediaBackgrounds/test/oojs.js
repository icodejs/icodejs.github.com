/* In a common variation of the pattern, you can pass arguments to the immediate func-
tion that wraps the module. You can pass any values, but usually these are references
to global variables and even the global object itself. Importing globals helps speed up
the global symbol resolution inside the immediate function, because the imported var-
iables become locals for the function: */

MYAPP.utilities.module = (function (app, global) {
    // references to the global object
    // and to the global app namespace object
    // are now localized
}(MYAPP, this));


/* The preceding example produced an object MYAPP.utilities.array, but sometimes it’s
more convenient to create your objects using constructor functions. You can still do
that using the module pattern. The only difference is that the immediate function that
wraps the module will return a function at the end, and not an object.
Consider the following example of the module pattern that creates a constructor func-
tion MYAPP.utilities.Array: */

MYAPP.namespace('MYAPP.utilities.Array');
MYAPP.utilities.Array = (function () {
        // dependencies
    var uobj  = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,
        // private properties and methods...
        Constr;
        // end var

    // optionally one-time init procedures
    // ...
    // public API -- constructor
    Constr = function (o) {
        this.elements = this.toArray(o);
    };
    // public API -- prototype
    Constr.prototype = {
        constructor: MYAPP.utilities.Array,
        version: "2.0",
        toArray: function (obj) {
            for (var i = 0, a = [], len = obj.length; i < len; i += 1) {
                a[i] = obj[i];
            }
            return a;
        }
    };
    // return the constructor
    // to be assigned to the new namespace
    return Constr;
}());

// The way to use this new constructor will be like so:
var arr = new MYAPP.utilities.Array(obj);

// -----------


var myobj = (function () {
    // private members
    var name = "my, oh my";
    // implement the public part
    return {
        getName: function () {
            return name;
        }
    };
}());

myobj.getName(); // "my, oh my"

// This example is also the bare bones of what is known as “module pattern,” which we
// examine in just a bit.


// --------------


// Before adding a property or creating a namespace, it’s best to check first that
// it doesn’t already exist, as shown in this example:
// unsafe
var MYAPP = {};
// better
if (typeof MYAPP === "undefined") {
    var MYAPP = {};
}
// or shorter
var MYAPP = MYAPP || {};

// Better

// Next is an example implementation of the namespacing function. This implementation
// is nondestructive, meaning that if a namespace exists, it won’t be re-created:

var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;
    // strip redundant leading global
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
// This implementation enables all of these uses:
// assign returned value to a local var

var module2 = MYAPP.namespace('MYAPP.modules.module2');
module2 === MYAPP.modules.module2; // true

// skip initial `MYAPP`
MYAPP.namespace('modules.module51');

// long namespace
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');


// ----

// This pattern uses an object with an init() method, which is executed immediately after
// the object is created. The init() function takes care of all initialization tasks.

({
    // here you can define setting values
    // a.k.a. configuration constants
    maxwidth: 600,
    maxheight: 400,
    // you can also define utility methods
    gimmeMax: function () {
        return this.maxwidth + "x" + this.maxheight;
    },
    // initialize
    init: function () {
        console.log(this.gimmeMax());
        // more init tasks...
    }
}).init();

// Both of these work too:

({...}).init();
({...}.init());

// This pattern is mainly suitable for one-off tasks, and there’s no access
// to the object after the init() has completed. If you want to keep a ref-
// erence to the object after it is done, you can easily achieve this by adding
// return this; at the end of init().


// Commonly, the global object is passed as an argument to the immediate function so
// that it’s accessible inside of the function without having to use window: this way makes
// the code more interoperable in environments outside the browser:

(function (global) {
    // access the global object via `global`
}(this));


// Have prototype properties available to the instance objects, consider the following approach. In the constructor // you check whether this is an instance of your constructor, and if not, the constructor invokes itself again, this // time properly with new:

function Waffle() {
    if (!(this instanceof Waffle)) {
        return new Waffle();
    }
    this.tastes = "yummy";
}

Waffle.prototype.wantAnother = true;
// testing invocations
var first = new Waffle(),
    second = Waffle();

console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"
console.log(first.wantAnother); // true
console.log(second.wantAnother); // true


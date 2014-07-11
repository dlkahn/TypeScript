//// [propertyAccessOnTypeParameterWithConstraints3.ts]
// generic types should behave as if they have properties of their constraint type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string {
        return '';
    }
}

class C<U extends A, T extends U> {
    f() {
        var x: T;
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }

    g(x: U) {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}

var r1a = (new C<A, B>()).f();
var r1b = (new C<A, B>()).g(new B());

interface I<U extends A, T extends U> {
    foo: T;
}
var i: I<A, B>;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();

var a: {
    <U extends A, T extends U>(): T;
    <U extends T, T extends A>(x: U): U;
}
var r3 = a().foo(); // error, no inferences for U so it doesn't satisfy constraint
var r3b = a()['foo']();
// parameter supplied for type argument inference for U
var r3c = a(new B()).foo(); // valid call to an invalid function, U is inferred as B, which has a foo
var r3d = a(new B())['foo'](); // valid call to an invalid function, U is inferred as B, which has a foo

var b = {
    foo: <U extends A, T extends U>(x: T) => {
        // BUG 823818
        var a = x['foo'](); // should be string
        return a + x.foo();
    }
}

var r4 = b.foo(new B()); // valid call to an invalid function

//// [propertyAccessOnTypeParameterWithConstraints3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
        return '';
    };
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.bar = function () {
        return '';
    };
    return B;
})(A);
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var a = x['foo']();
        return a + x.foo();
    };
    C.prototype.g = function (x) {
        var a = x['foo']();
        return a + x.foo();
    };
    return C;
})();
var r1a = (new C()).f();
var r1b = (new C()).g(new B());
var i;
var r2 = i.foo.foo();
var r2b = i.foo['foo']();
var a;
var r3 = a().foo();
var r3b = a()['foo']();
var r3c = a(new B()).foo();
var r3d = a(new B())['foo']();
var b = {
    foo: function (x) {
        var a = x['foo']();
        return a + x.foo();
    }
};
var r4 = b.foo(new B());
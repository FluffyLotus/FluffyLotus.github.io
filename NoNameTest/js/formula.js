function formulaQuadratic(a, b, c, canCache) {
    this.a = a;
    this.b = b;
    this.c = c;

    if (typeof canCache !== 'undefined')
        this.canCache = canCache;
    else
        this.canCache = true;

    this.cachedData = new Map();
}

formulaQuadratic.prototype.getResult = function (x) {
    var v;

    if (this.canCache) {
        if (this.cachedData.has(x)) {
            v = this.cachedData.get(x);
        }
        else {
            v = this.a * x * x + this.b * x + this.c;
            this.cachedData.set(x, v);
        }
    }
    else {
        v = this.a * x * x + this.b * x + this.c;
    }

    return v;
}

function formulaPow(a, b, c, canCache) {
    this.a = a;
    this.b = b;
    this.c = c;

    if (typeof canCache !== 'undefined')
        this.canCache = canCache;
    else
        this.canCache = true;

    this.cachedData = new Map();
}

formulaPow.prototype.getResult = function (x) {
    var v;

    if (this.canCache) {
        if (this.cachedData.has(x)) {
            v = this.cachedData.get(x);
        }
        else {
            v = this.c + this.a * Math.pow(this.b, x);
            this.cachedData.set(x, v);
        }
    }
    else {
        v = this.c + this.a * Math.pow(this.b, x);
    }

    return v;
}

function formulaPow0(a, b, c, canCache) {
    this.f = new formulaPow(a, b, c, canCache);
}

formulaPow0.prototype.getResult = function (x) {
    return this.f.getResult(x - 1);
}

function formulaLinear(a, b, canCache) {
    this.a = a;
    this.b = b;

    if (typeof canCache !== 'undefined')
        this.canCache = canCache;
    else
        this.canCache = true;

    this.cachedData = new Map();
}

formulaLinear.prototype.getResult = function (x) {
    var v;

    if (this.canCache) {
        if (this.cachedData.has(x)) {
            v = this.cachedData.get(x);
        }
        else {
            v = this.a + this.b * x;
            this.cachedData.set(x, v);
        }
    }
    else {
        v = this.a + this.b * x;
    }

    return v;
}
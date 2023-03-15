'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
var sqrt = function (x) { return Math.sqrt(x); };

/**
 * The toFixed() method formats a number using fixed-point notation.
 *
 * @param num the number need to be fixed
 * @param digits The number of digits to appear after the decimal point;
 *                If this argument is omitted, it is treated as 0.
 * @returns A string representing the given number using fixed-point notation.
 */
var toFixed = function (num, digits) {
    if (digits === void 0) { digits = 0; }
    var zeroStrNum = num.toString();
    // 处理科学计算情况
    if (zeroStrNum.includes('e')) {
        var matchList = zeroStrNum.match(/\d(?:\.(\d*))?e([+-]\d+)/);
        zeroStrNum = num.toFixed(Math.max(0, (matchList[1] || '').length) - Number(matchList[2]));
    }
    var isNegativeNum = false;
    // 判断是否为负数
    if (zeroStrNum.startsWith('-')) {
        isNegativeNum = true;
        zeroStrNum = zeroStrNum.slice(1);
    }
    // 获取小数点位置
    var dotIndex = zeroStrNum.indexOf('.');
    // 如果是整数/保留小数位数等于超过当前小数长度，则直接用toFixed返回
    if (dotIndex === -1 || zeroStrNum.length - (dotIndex + 1) <= digits) {
        return num.toFixed(digits);
    }
    // 找到需要进行四舍五入的部分
    var numArr = (zeroStrNum.match(/\d/g) || []).slice(0, dotIndex + digits + 1);
    // 核心处理逻辑
    if (parseInt(numArr[numArr.length - 1], 10) > 4) {
        // 如果最后一位大于4，则往前遍历+1
        for (var i = numArr.length - 2; i >= 0; i -= 1) {
            numArr[i] = String(parseInt(numArr[i], 10) + 1);
            // 判断这位数字 +1 后会不会是 10
            if (numArr[i] === '10') {
                // 10的话处理一下变成 0，再次for循环，相当于给前面一个 +1
                numArr[i] = '0';
            }
            else {
                // 小于10的话，就打断循环，进位成功
                break;
            }
        }
    }
    // 将小数点加入数据
    numArr.splice(dotIndex, 0, '.');
    // 处理多余位数
    numArr.pop();
    // 如果事负数，添加负号
    if (isNegativeNum) {
        numArr.unshift('-');
    }
    return Number(numArr.join('')).toFixed(digits);
};

function isBuffer(val) {
    return (val !== null &&
        val !== undefined &&
        val.constructor !== null &&
        val.constructor !== undefined &&
        typeof val.constructor.isBuffer === 'function' &&
        val.constructor.isBuffer(val));
}
function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
function isArrayBufferView(val) {
    var result;
    // 此处主要是为了兼容IE9及以下
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    }
    else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
}
/**
 *
 * @param val 需要进行判断的值，值为string | number
 * @param type 预判的类型
 * @returns boolean/unknow type
 */
var isType = function (val, type) {
    var typeObj = {
        string: '[object String]',
        number: '[object Number]',
        boolean: '[object Boolean]',
        undefined: '[object Undefined]',
        symbol: '[object Symbol]',
        object: '[object Object]',
        array: '[object Array]',
        function: '[object Function]',
        date: '[object Date]',
        file: '[object File]',
        blob: '[object Blob]',
    };
    if (typeObj[type]) {
        return Object.prototype.toString.call(val) === typeObj[type];
    }
    switch (type) {
        case 'buffer':
            return isBuffer(val);
        case 'formData':
            return isFormData(val);
        case 'arrayBufferView':
            return isArrayBufferView(val);
        // case 'stream':
        //   return (
        //     Object.prototype.toString.call(val) === '[object Object]' &&
        //     Object.prototype.toString.call(val.pipe) === '[object Function]'
        //   );
        default:
            console.error('无法解析此类型');
            return 'unknow type';
    }
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Run multiple promise-returning & async functions with limited concurrency
 * @param concurrency - Concurrency limit. Minimum: `1`.
 * @returns Promise A `limit` function.
 */
function pLimit(concurrency) {
    var _this = this;
    if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) &&
        concurrency > 0)) {
        throw new TypeError('参数不符合要求，参数必须为正整数');
    }
    var queue = [];
    var activeCount = 0;
    var next = function () {
        activeCount -= 1;
        if (queue.length) {
            queue.shift()();
        }
    };
    var run = function (fn, resolve) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var result, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        activeCount += 1;
                        result = (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, fn.apply(void 0, arg)];
                        }); }); })();
                        resolve(result);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    var enqueue = function (fn, resolve, args) {
        queue.push(run.bind.apply(run, __spreadArray([null, fn, resolve], args, false)));
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _a.sent();
                        if (activeCount < concurrency && queue.length) {
                            queue.shift()();
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    var generator = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve) {
            enqueue(fn, resolve, args);
        });
    };
    Object.defineProperties(generator, {
        activeCount: {
            get: function () { return activeCount; },
        },
        pendingCount: {
            get: function () { return queue.length; },
        },
        clearQueue: {
            value: function () {
                queue.length = 0;
            },
        },
    });
    return generator;
}

exports.isType = isType;
exports.pLimit = pLimit;
exports.sqrt = sqrt;
exports.toFixed = toFixed;

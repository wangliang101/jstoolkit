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
    var numArr = zeroStrNum.match(/\d/g) || [];
    numArr = numArr.slice(0, dotIndex + digits + 1);
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

exports.isType = isType;
exports.sqrt = sqrt;
exports.toFixed = toFixed;

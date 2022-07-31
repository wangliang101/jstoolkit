import { IsType } from '../types/index';

function isBuffer(val) {
  return (
    val !== null &&
    val !== undefined &&
    val.constructor !== null &&
    val.constructor !== undefined &&
    typeof val.constructor.isBuffer === 'function' &&
    val.constructor.isBuffer(val)
  );
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isArrayBufferView(val) {
  let result;
  // 此处主要是为了兼容IE9及以下
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

type Val =
  | string
  | number
  | boolean
  | undefined
  | symbol
  | object
  | []
  | Function
  | Date
  | File
  | Blob
  | Buffer
  | FormData
  | ArrayBufferView;
/**
 *
 * @param val 需要进行判断的值，值为string | number
 * @param type 预判的类型
 * @returns boolean/unknow type
 */
const isType: IsType = (val: Val, type: string) => {
  const typeObj = {
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

export default isType;

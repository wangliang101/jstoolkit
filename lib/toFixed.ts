import { ToFixed } from '../types/index';

/**
 * The toFixed() method formats a number using fixed-point notation.
 *
 * @param num the number need to be fixed
 * @param digits The number of digits to appear after the decimal point;
 *                If this argument is omitted, it is treated as 0.
 * @returns A string representing the given number using fixed-point notation.
 */
const toFixed: ToFixed = (num, digits = 0) => {
  let zeroStrNum = num.toString();

  // 处理科学计算情况
  if (zeroStrNum.includes('e')) {
    const matchList: Array<string> = zeroStrNum.match(/\d(?:\.(\d*))?e([+-]\d+)/);
    zeroStrNum = num.toFixed(Math.max(0, (matchList[1] || '').length) - Number(matchList[2]));
  }

  let isNegativeNum = false;
  // 判断是否为负数
  if (zeroStrNum.startsWith('-')) {
    isNegativeNum = true;
    zeroStrNum = zeroStrNum.slice(1);
  }
  // 获取小数点位置
  const dotIndex = zeroStrNum.indexOf('.');
  // 如果是整数/保留小数位数等于超过当前小数长度，则直接用toFixed返回
  if (dotIndex === -1 || zeroStrNum.length - (dotIndex + 1) <= digits) {
    return num.toFixed(digits);
  }

  // 找到需要进行四舍五入的部分
  const numArr = (zeroStrNum.match(/\d/g) || []).slice(0, dotIndex + digits + 1);

  // 核心处理逻辑
  if (parseInt(numArr[numArr.length - 1], 10) > 4) {
    // 如果最后一位大于4，则往前遍历+1
    for (let i = numArr.length - 2; i >= 0; i -= 1) {
      numArr[i] = String(parseInt(numArr[i], 10) + 1);
      // 判断这位数字 +1 后会不会是 10
      if (numArr[i] === '10') {
        // 10的话处理一下变成 0，再次for循环，相当于给前面一个 +1
        numArr[i] = '0';
      } else {
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

export default toFixed;

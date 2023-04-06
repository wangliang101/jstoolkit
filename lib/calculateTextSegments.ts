function calculateTextSegments(textList, remainingHeight, maxHeight, width, textStyle) {
  // 获取测量函数及卸载测量元素方法
  const { measureFontTextFn, destoryMeasureNode } = measureFontTextWH(textStyle);
  const result = [];

  const getCurDivH = index => {
    if (index === 0) {
      return remainingHeight;
    }
    return maxHeight;
  };

  let divIndex = 0;
  //
  let curIndex = 0;
  for (let i = 0; i < textList.length; i++) {
    const seg = textList[i];
    for (let j = 0; j < seg.length; j++) {
      if (curIndex != i) {
        curIndex = i;
      }
      let curLine = '';
      let curLineH = 0;
      let curLineW = 0;
      let curContentH = 0;
      const { w, h } = measureFontTextFn(seg[j]);
      if (curLineW <= width) {
        curLine += seg[j];
        curLineH = Math.max(h, curLineH);
      } else {
        let curDiv = result[divIndex];
        if (Array.isArray(curDiv['content'])) {
          const curDivH = getCurDivH(divIndex);
          if (curDiv.height + curLine <= curDivH) {
            curDiv.content.push(curLine);
            curDiv.height += curLineH;
          } else {
            divIndex += 1;
            result[divIndex] = { content: [], height: 0 };
            curDiv = result[divIndex];
            curDiv.content.push(curLine);
            curDiv.height += curLineH;
          }
        } else {
          result[divIndex] = { content: [], height: 0 };
        }
        curLine = '';
        curLineH = 0;
        curLineW = 0;
      }
    }
  }
  destoryMeasureNode();
  return result;
}

export function measureFontTextWH(textStyle) {
  let fontFamily = textStyle.fontFamily ? textStyle.fontFamily : '';
  let fontSize = textStyle.fontSize ? textStyle.fontSize + 'px' : '';
  let fontWeight = textStyle.fontWeight ? textStyle.fontWeight : '';

  let measureNode = document.createElement('div');
  measureNode.style.fontFamily = fontFamily;
  measureNode.style.fontSize = fontSize;
  measureNode.style.fontWeight = fontWeight;

  measureNode.style.visibility = 'hidden';
  measureNode.style.display = 'inline-block';
  measureNode.style.whiteSpace = 'nowrap';

  document.body.appendChild(measureNode);

  const measureFontTextFn = text => {
    measureNode.textContent = text;
    let w = measureNode.offsetWidth;
    let h = measureNode.offsetHeight;
    return { w: w, h: h };
  };

  const destoryMeasureNode = () => {
    document.body.removeChild(measureNode);
    return true;
  };

  return { measureFontTextFn, destoryMeasureNode };
}

export default calculateTextSegments;

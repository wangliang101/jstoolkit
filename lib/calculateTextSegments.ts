export function measureFontTextWH(textStyle) {
  const fontFamily = textStyle.fontFamily ? textStyle.fontFamily : '';
  const fontSize = textStyle.fontSize ? `${textStyle.fontSize}px` : '';
  const fontWeight = textStyle.fontWeight ? textStyle.fontWeight : '';

  const measureNode = document.createElement('span');
  measureNode.style.fontFamily = fontFamily;
  measureNode.style.fontSize = fontSize;
  measureNode.style.fontWeight = fontWeight;

  measureNode.style.visibility = 'hidden';
  measureNode.style.display = 'inline-block';
  measureNode.style.whiteSpace = 'nowrap';

  document.body.appendChild(measureNode);

  const measureFontTextFn = text => {
    measureNode.textContent = text;
    const { width, height } = measureNode.getBoundingClientRect();
    return { w: Math.round(width * 100) / 100, h: Math.round(height * 100) / 100 };
  };

  const destoryMeasureNode = () => {
    document.body.removeChild(measureNode);
    return true;
  };

  return { measureFontTextFn, destoryMeasureNode };
}

function calculateTextSegments(textList, remainingHeight, maxHeight, width, textStyle) {
  // 获取测量函数及卸载测量元素方法
  const { measureFontTextFn, destoryMeasureNode } = measureFontTextWH(textStyle);
  const result = [{ content: [], height: 0 }];

  const getCurDivH = index => {
    if (index === 0) {
      return remainingHeight;
    }
    return maxHeight;
  };

  let divIndex = 0;
  let curIndex = 0;
  let startNewLine = false;
  let curLine = '';
  let curLineH = 0;
  let curLineW = 0;
  for (let i = 0; i < textList.length; i++) {
    const seg = textList[i];
    if (curIndex !== i) {
      startNewLine = true;
      curIndex = i;
    }

    for (let j = 0; j < seg.length; j++) {
      const { w, h } = measureFontTextFn(seg[j]);
      // 如果当前行宽度加上当前字符宽度小于等于容器宽度，则将当前字符加入当前行，并更新当前行高度
      if (curLineW + w <= width) {
        if (startNewLine) {
          let curDiv = result[divIndex];
          const curDivH = getCurDivH(divIndex);
          if (curDiv.height + curLineH > curDivH) {
            divIndex += 1;
            result[divIndex] = { content: [], height: 0 };
            curDiv = result[divIndex];
          }
          curDiv.content.push(curLine);
          curDiv.height += curLineH;
          // 重置当前行信息
          curLine = '';
          curLineH = 0;
          curLineW = 0;
          // 将当前字符加入当前行，并更新当前行高度
          curLine += seg[j];
          curLineW += w;
          curLineH = Math.max(h, curLineH);
          startNewLine = false;
        } else {
          curLine += seg[j];
          curLineW += w;
          curLineH = Math.max(h, curLineH);
        }
      } else {
        // 如果当前行宽度加上当前字符宽度大于容器宽度，则有两种情况
        // 1. 没有超过当前容器高度
        // 2. 超过当前容器高度
        let curDiv = result[divIndex];
        const curDivH = getCurDivH(divIndex);
        if (curDiv.height + curLineH > curDivH) {
          divIndex += 1;
          result[divIndex] = { content: [], height: 0 };
          curDiv = result[divIndex];
        }
        curDiv.content.push(curLine);
        curDiv.height += curLineH;
        // 重置当前行信息
        curLine = '';
        curLineH = 0;
        curLineW = 0;
        // 将当前字符加入当前行，并更新当前行高度
        curLine += seg[j];
        curLineW += w;
        curLineH = Math.max(h, curLineH);
      }
    }
  }
  // 将最后一行加入结果
  const curDiv = result[divIndex];
  curDiv.content.push(curLine);
  curDiv.height += curLineH;
  destoryMeasureNode();
  return result;
}

export default calculateTextSegments;

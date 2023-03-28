function calculateTextSegments(text, remainingHeight, maxHeight, width, font) {
  // 创建一个测试文字宽高的元素, 并把他插入body中
  const span = document.createElement('span');
  span.style.fontSize = font.fontSize;
  span.style.visibility = 'hidden';
  document.body.appendChild(span);

  const lines = text.split('\n');
  const segments = [];
  let currentSegment = '';
  let currentHeight = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const { width: lineWidth, height: lineHeight } = calculateLineHeightAndWidth(span, line, width); // 计算行宽度

    if (currentHeight + lineHeight > maxHeight) {
      segments.push(currentSegment.trim());
      currentSegment = line;
      currentHeight = lineHeight;
    } else if (currentHeight + lineHeight <= remainingHeight) {
      currentSegment += '\n' + line;
      currentHeight += lineHeight;
    } else if (lineWidth <= width) {
      segments.push(currentSegment.trim());
      currentSegment = line;
      currentHeight = lineHeight;
    } else {
      const words = line.split(' ');
      let newLine = '';
      for (let j = 0; j < words.length; j++) {
        const testLine = newLine === '' ? words[j] : newLine + ' ' + words[j];
        const testWidth = calculateLineHeightAndWidth(span, testLine, width);
        if (testWidth > width && newLine !== '') {
          segments.push(newLine);
          newLine = words[j];
        } else {
          newLine = testLine;
        }
      }
      currentSegment += '\n' + newLine;
      currentHeight += lineHeight;
    }
  }

  segments.push(currentSegment.trim());

  // 移除测试文字宽高的元素
  document.body.removeChild(span);

  return segments;
}

// function calculateLineHeightAndWidth(line, width) {
//   // 计算单行文字的宽度
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   context.font = '16px Arial'; // 假设字号为16px
//   return context.measureText(line).width;
// }

function calculateLineHeightAndWidth(node, text, font) {
  // span.style.opacity = 0;
  node.textContent = text;
  const { width, height } = node.getBoundingClientRect();
  return { width, height };
}

// function measureTextWidth(text, font) {
//   const offscreenCanvas = new OffscreenCanvas(0, 0);
//   const context = offscreenCanvas.getContext('2d');
//   context.font = font;
//   const width = context.measureText(text).width;
//   return width;
// }

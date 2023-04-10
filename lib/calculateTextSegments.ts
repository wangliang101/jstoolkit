export function measureFontTextWH(textStyle) {
  const fontFamily = textStyle.fontFamily ? textStyle.fontFamily : '';
  const fontSize = textStyle.fontSize ? `${textStyle.fontSize}px` : '';
  const fontWeight = textStyle.fontWeight ? textStyle.fontWeight : '';

  const measureNode = document.createElement('div');
  measureNode.style.fontFamily = fontFamily;
  measureNode.style.fontSize = fontSize;
  measureNode.style.fontWeight = fontWeight;

  measureNode.style.visibility = 'hidden';
  measureNode.style.display = 'inline-block';
  measureNode.style.whiteSpace = 'nowrap';

  document.body.appendChild(measureNode);

  const measureFontTextFn = text => {
    measureNode.textContent = text;
    const w = measureNode.offsetWidth;
    const h = measureNode.offsetHeight;
    return { w, h };
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
  const result = [];

  const getCurDivH = index => {
    if (index === 0) {
      return remainingHeight;
    }
    return maxHeight;
  };

  let divIndex = 0;
  let curIndex = 0;
  for (let i = 0; i < textList.length; i++) {
    const seg = textList[i];
    for (let j = 0; j < seg.length; j++) {
      if (curIndex !== i) {
        curIndex = i;
      }
      let curLine = '';
      let curLineH = 0;
      let curLineW = 0;
      const curContentH = 0;
      const { w, h } = measureFontTextFn(seg[j]);
      // 如果当前行宽度加上当前字符宽度小于等于容器宽度，则将当前字符加入当前行，并更新当前行高度
      if (curLineW <= width) {
        curLine += seg[j];
        curLineH = Math.max(h, curLineH);
      } else {
        let curDiv = result[divIndex];
        if (Array.isArray(curDiv.content)) {
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
  const result1 = [
    {
      heigit: 132,
      content: [
        '第三天，鱼开始打转儿，这是较量即将结束的迹象。鱼露出水面，老人努力将它拽近些，再拽近些。他忍住一切疼痛，使出全身力',
        '气，将鱼叉干净利落地扎进鱼腰。大鱼很快在挣扎中死去，老人将它捆在船边，开始返航。',
        '这本书讲了古巴的一个名叫桑地亚哥的老渔夫，独自一个人出海打鱼，在一无所获的84天之后钓到了一条无比巨大的马林鱼。这是',
        '老人从来没见过也没听说过的比他的船还长两英尺的一条大鱼。鱼大劲也大，拖着小船漂流了整整两天两夜，老人在这两天两夜中',
        '经历了从未经受的艰难考验，终于把大鱼刺死，拴在船头。然而这时却遇上了鲨鱼，老人与鲨鱼进行了殊死搏斗，结果大马林鱼被',
        '鲨鱼吃光了，老人最后拖回家的只剩下一副光秃秃的鱼骨架和一身的伤。',
      ],
    },
    {
      heigit: 308,
      content: [
        '第三天，鱼开始打转儿，这是较量即将结束的迹象。鱼露出水面，老人努力将它拽近些，再拽近些。他忍住一切疼痛，使出全身力',
        '气，将鱼叉干净利落地扎进鱼腰。大鱼很快在挣扎中死去，老人将它捆在船边，开始返航。',
        '这本书讲了古巴的一个名叫桑地亚哥的老渔夫，独自一个人出海打鱼，在一无所获的84天之后钓到了一条无比巨大的马林鱼。这是',
        '老人从来没见过也没听说过的比他的船还长两英尺的一条大鱼。鱼大劲也大，拖着小船漂流了整整两天两夜，老人在这两天两夜中',
        '经历了从未经受的艰难考验，终于把大鱼刺死，拴在船头。然而这时却遇上了鲨鱼，老人与鲨鱼进行了殊死搏斗，结果大马林鱼被',
        '鲨鱼吃光了，老人最后拖回家的只剩下一副光秃秃的鱼骨架和一身的伤。',
        '渔民桑提阿果老了，运气也糟透了。84天以来，他天天出海，却又天天空船而归，连他的帆看上去都像是一面“标志着老打败仗的',
        '旗子”。他的老伴死了，以前跟他打鱼的小孩曼诺林也在父母的强迫下，到其他船帮忙去了。但曼诺林很尊重老人，每见老头回来',
        '，总要走下岸去，帮他收拾钓丝、鱼钩、鱼叉什么的。',
        '这是老人没打到鱼以来的第85天出海了。天气晴朗，海面平静。他向远海划去，决心冲破霉运，捕一条大鱼。他一面划船，一面与',
        '大海、鱼、海鸟交谈，自孩子曼诺林离开他以后，他便养成了这种自言自语的习惯',
        '可是，老人的麻烦并未结束。死鱼的血招来了鲨鱼。它们循着航线游来，大口大口地咬掉鱼肉。老人成功地杀死了一条鲨鱼，但鲨',
        '鱼下沉时也带走了鱼叉，不得已，老人只好凑合着用刀子、棍子、船舵与鲨鱼们搏斗。当半夜小船驶进港时，昼夜的搏斗已使老人',
        '筋疲力竭了。那条大鱼也已残缺不全，它的美丽和它那贵重的鱼肉都已不复存在。',
      ],
    },
  ];
  return result1;
}

export default calculateTextSegments;

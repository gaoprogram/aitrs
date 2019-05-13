/**
 * Created by Administrator on 2018/12/25.
 * function : 金额翻译成中文大写
 */
function arabiaToChinese (Num) {
  for (let i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(',', '')// 替换tomoney()中的“,”
    Num = Num.replace(' ', '')// 替换tomoney()中的空格
  }
  Num = Num.replace('￥', '')// 替换掉可能出现的￥字符
  if (isNaN(Num)) { // 验证输入的字符是否为数字
    return '金额不为数字，无法转换大写'
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(Num).split('.')
  let newchar = ''
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 12) {
      return '金额过大，无法转换大写'
    }// 若数量超过拾亿单位，提示
    let tmpnewchar = ''
    let perchar = part[0].charAt(i)
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar
        break
      case '1':
        tmpnewchar = '壹' + tmpnewchar
        break
      case '2':
        tmpnewchar = '贰' + tmpnewchar
        break
      case '3':
        tmpnewchar = '叁' + tmpnewchar
        break
      case '4':
        tmpnewchar = '肆' + tmpnewchar
        break
      case '5':
        tmpnewchar = '伍' + tmpnewchar
        break
      case '6':
        tmpnewchar = '陆' + tmpnewchar
        break
      case '7':
        tmpnewchar = '柒' + tmpnewchar
        break
      case '8':
        tmpnewchar = '捌' + tmpnewchar
        break
      case '9':
        tmpnewchar = '玖' + tmpnewchar
        break
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + '元'
        break
      case 1:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '拾'
        break
      case 2:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '佰'
        break
      case 3:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '仟'
        break
      case 4:
        tmpnewchar = tmpnewchar + '万'
        break
      case 5:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '拾'
        break
      case 6:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '佰'
        break
      case 7:
        if (perchar !== 0) tmpnewchar = tmpnewchar + '仟'
        break
      case 8:
        tmpnewchar = tmpnewchar + '亿'
        break
      case 9:
        tmpnewchar = tmpnewchar + '拾'
        break
      case 10:
        tmpnewchar = tmpnewchar + '佰'
        break
      case 11:
        tmpnewchar = tmpnewchar + '仟'
        break
    }
    newchar = tmpnewchar + newchar
  }
  // 小数点之后进行转化
  if (Num.indexOf('.') !== -1) {
    if (part[1].length > 4) {
      part[1] = part[1].substr(0, 4)
    }
    for (let i = 0; i < part[1].length; i++) {
      let tmpnewchar = ''
      let perchar = part[1].charAt(i)
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar
          break
        case '1':
          tmpnewchar = '壹' + tmpnewchar
          break
        case '2':
          tmpnewchar = '贰' + tmpnewchar
          break
        case '3':
          tmpnewchar = '叁' + tmpnewchar
          break
        case '4':
          tmpnewchar = '肆' + tmpnewchar
          break
        case '5':
          tmpnewchar = '伍' + tmpnewchar
          break
        case '6':
          tmpnewchar = '陆' + tmpnewchar
          break
        case '7':
          tmpnewchar = '柒' + tmpnewchar
          break
        case '8':
          tmpnewchar = '捌' + tmpnewchar
          break
        case '9':
          tmpnewchar = '玖' + tmpnewchar
          break
      }
      if (i === 0) tmpnewchar = tmpnewchar + '角'
      if (i === 1) tmpnewchar = tmpnewchar + '分'
      if (i === 2) tmpnewchar = tmpnewchar + '毫'
      if (i === 3) tmpnewchar = tmpnewchar + '厘'
      newchar = newchar + tmpnewchar
    }
  }
  // 替换所有无用汉字
  while (newchar.search('零零') !== -1) {
    newchar = newchar.replace('零零', '零')
    newchar = newchar.replace('零亿', '亿')
    newchar = newchar.replace('亿万', '亿')
    newchar = newchar.replace('零万', '万')
    newchar = newchar.replace('零元', '元')
    newchar = newchar.replace('零角', '')
    newchar = newchar.replace('零分', '')
  }
  if (newchar.charAt(newchar.length - 1) === '元' || newchar.charAt(newchar.length - 1) === '角') {
    newchar = newchar + '整'
  }
  return newchar
}

export default arabiaToChinese

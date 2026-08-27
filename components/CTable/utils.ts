import type { ReactNode } from 'react';

export const TableFontSize = {
  CN: '12px',
  US: '14px',
};

let GLOBAL_FONT_SIZE = TableFontSize.CN;

/**
 * @description 支持bytePlus环境下英文大小为14px
 * @param fontSize String
 */
export const setGlobalFontSize = (fontSize: string) => {
  GLOBAL_FONT_SIZE = fontSize;
};

export function filterDataKey(str: string | number) {
  // str 可能不是字符，避免报错
  const key = str?.toString?.();
  return key?.replace?.(/\W/g, '') || 'default'; // 如果为空的key则转化成default
}

const getCssStyle = (element: any, prop: any) => {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
};

const getBodyFont = () => {
  const fontWeight = getCssStyle(document.body, 'font-weight') || 'normal';
  // const fontSize = getCssStyle(document.body, 'font-size') || '12px';
  /**
   * 1. 在 vestack 子应用中获取不到比较准确的 body style
   * 2. 在火山中，cell 里面的字体大小和 body 也不太一样，body 为 14px，cell 为 13px，因此这里暂时写死为 13px
   * 2023-5-5 更新 Table 内部的文字大小改为 12px
   */
  const fontSize = GLOBAL_FONT_SIZE;
  const fontFamily = getCssStyle(document.body, 'font-family') || 'Helvetica';

  return `${fontWeight} ${fontSize} ${fontFamily}`;
};

// 全局使用同一个 canvas 来获取字体的宽度，优化性能
const helperCanvas = document.createElement('canvas');
// 缓存 body 的 font，避免重复获取 body 的字体
let cachedBodyFont: string;
export const getTextWidth = (text?: string, font?: string) => {
  if (text === undefined || text === null) {
    return 0;
  }
  if (!cachedBodyFont) {
    // 延迟到具体调用的时候再获取字体，如果在模块的全局执行，在统一平台中，获取到的字体不对
    cachedBodyFont = getBodyFont();
  }
  const context = helperCanvas.getContext('2d')!;
  context.font = font || cachedBodyFont;
  const metrics = context.measureText(text);
  return metrics.width;
};

/** 判断值是否是空值，比如在表单判断一个Input是否有输入*/
export function isEmptyValue(value: any) {
  if (value === undefined || value === '') return true;
  return false;
}

export const isEmpty = (value: any) => {
  return value === '' || value === undefined || value === null || Number.isNaN(value);
};

/** 对空值做些文本的兜底显示 */
export function fallbackText(value: ReactNode) {
  return isEmpty(value) ? '-' : value;
}

/** 加载脚本 */
export function loadScript(url: string, cb: () => void) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = cb;
  document.body.appendChild(script);
}

/** 尝试把字符串转成数字， 如果失败就返回原字符串 */
export function tryToNumber(numberString: string | number) {
  const num = Number(numberString);
  if (Number.isNaN(num)) return numberString;
  return num;
}

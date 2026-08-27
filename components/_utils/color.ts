/**
 * @description 转换颜色透明度
 */
export function transformOpacity(colorString: string, opacity = 0.2) {
  let _colorString = colorString;
  // 16 进制颜色补全
  if (/^#[A-Fa-f0-9]{3}$/g.test(_colorString)) {
    const [hash, ...characters] = _colorString.split('');
    _colorString = `${hash}${characters.map(character => character.repeat(2)).join('')}`;
  }
  // 16 进制颜色加透明度
  if (/^#[A-Fa-f0-9]{6}$/g.test(_colorString)) {
    return `${_colorString}${Math.round(255 * opacity)
      .toString(16)
      .padStart(2, '0')}`;
  }
  return toRGBA(_colorString, opacity);
}

/**
 * @description 转换为 RGBA 颜色
 */
export function toRGBA(colorString: string, opacity = 0.2) {
  const [red, green, blue] = colorString.match(/\d+|(\d+\.\d+)/g)?.map(Number) || [];
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

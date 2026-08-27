import cidrRegex from 'cidr-regex';
import ipRegex from 'ip-regex';
import type { SeparatorType, ValidatorModeType } from './interface';
import { ValidatorMode } from './interface';

// 预设分隔符
const presetSeparator = /[\r\n\s,，]/g;

// 校验一个字符串是否是白名单类型
const whitelistIpValidator = (ip: string): boolean => {
  // 每个分段要么是一个合法的IP地址，要么满足CIDR格式要求，要么是0.0.0.0/0
  if (ip === '0.0.0.0/0') return true;
  if (ip === '0.0.0.0') return false;
  return cidrRegex.v4({ exact: true }).test(ip) || ipRegex.v4({ exact: true }).test(ip);
};

// 根据预设IP校验模式校验输入字符串
export const isLegalIp = (value: string, mode?: ValidatorModeType): boolean => {
  let result = false;
  switch (mode) {
    case ValidatorMode.v4:
      result = ipRegex.v4({ exact: true }).test(value);
      break;
    case ValidatorMode.v6:
      result = ipRegex.v6({ exact: true }).test(value);
      break;
    case ValidatorMode.v4v6:
      result = ipRegex({ exact: true }).test(value);
      break;
    case ValidatorMode.v4cidr:
      result = cidrRegex.v4({ exact: true }).test(value) || ipRegex.v4({ exact: true }).test(value);
      break;
    case ValidatorMode.v6cidr:
      result = cidrRegex.v6({ exact: true }).test(value) || ipRegex.v6({ exact: true }).test(value);
      break;
    case ValidatorMode.v4v6cidr:
      result = cidrRegex({ exact: true }).test(value) || ipRegex({ exact: true }).test(value);
      break;
    case ValidatorMode.whitelistIp:
      result = whitelistIpValidator(value);
      break;
    default:
      result = ipRegex.v4({ exact: true }).test(value);
      break;
  }
  return result;
};

// 合并预设分隔符和用户自定义分隔符
function combineSeparator(separator?: SeparatorType): RegExp[] {
  return !separator
    ? [presetSeparator]
    : separator?.coverPresetSeparator
    ? [separator.customSeparator]
    : [presetSeparator, separator.customSeparator];
}

// 将字符串按照分隔符进行切割，返回数组
export const formatStr2Arr = (str: string, separator?: SeparatorType) => {
  const finalSeparator: RegExp[] = combineSeparator(separator);
  let result = [str];
  for (const separator of finalSeparator) {
    result = result.map(item => item.split(separator).filter(Boolean)).flat();
  }
  return result;
};

// 判断一个字符串中是否包含分隔符
export function hasSeparatorInStr(str: string, separator?: SeparatorType) {
  const finalSeparator: RegExp[] = combineSeparator(separator);
  return finalSeparator.some(reg => {
    return reg.test(str);
  });
}

export const errorRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(error|fatal).*$/;
export const warningRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(warning).*$/;
export const successRegexp = /^(#\s*\d*)?\s*(\(|\[)?\s*(success).*$/;

// 手动将 error/warning/success
export const transformAnsi = (str: string) => {
  const low = str?.toLowerCase();
  if (errorRegexp.test(low)) {
    return `\u001b[31m${str}\u001b[m`;
  }

  if (warningRegexp.test(low)) {
    return `\u001b[33m${str}\u001b[m`;
  }

  if (successRegexp.test(low)) {
    return `\u001b[32m${str}\u001b[m`;
  }
  return str;
};

/**
 * Escape carrigage returns like a terminal
 * @param {string} txt - String to escape.
 * @return {string}    - Escaped string.
 */
export const escapeCarriageReturn = (txt: string) => {
  if (!txt) return '';
  if (!/\r/.test(txt)) return txt;
  txt = txt.replace(/\r+\n/gm, '\n'); // \r followed by \n --> newline
  while (/\r./.test(txt)) {
    txt = txt.replace(/^([^\r\n]*)\r+([^\r\n]+)/gm, function (_, base, insert) {
      return insert + base.slice(insert.length);
    });
  }
  return txt;
};

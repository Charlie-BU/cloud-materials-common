export declare const errorRegexp: RegExp;
export declare const warningRegexp: RegExp;
export declare const successRegexp: RegExp;
export declare const transformAnsi: (str: string) => string;
/**
 * Escape carrigage returns like a terminal
 * @param {string} txt - String to escape.
 * @return {string}    - Escaped string.
 */
export declare const escapeCarriageReturn: (txt: string) => string;

import React from 'react';
import Anser, { AnserJsonEntry } from 'anser';
import { escapeRegExp } from 'lodash-es';
import { escapeCarriageReturn } from '../util';

/**
 * Converts ANSI strings into JSON output.
 * @name ansiToJSON
 * @function
 * @param {String} input The input string.
 * @param {boolean} use_classes If `true`, HTML classes will be appended
 *                              to the HTML output.
 * @return {Array} The parsed input.
 */
function ansiToJSON(input: string): AnserJsonEntry[] {
  input = escapeCarriageReturn(fixBackspace(input));
  return Anser.ansiToJson(input, {
    json: true,
    remove_empty: true,
    use_classes: false,
  });
}

interface Colors {
  color?: string;
  backgroundColor?: string;
}

/**
 * Create the style attribute.
 * @name createStyle
 * @function
 * @param {AnserJsonEntry} bundle
 * @return {Object} returns the style object
 */
function createStyle(bundle: AnserJsonEntry): Colors {
  const style: Colors = {};
  if (bundle.bg) {
    style.backgroundColor = `rgb(${bundle.bg})`;
  }
  if (bundle.fg) {
    style.color = `rgb(${bundle.fg})`;
  }

  return style;
}

/**
 * Converts an Anser bundle into a React Node.
 * @param linkify whether links should be converting into clickable anchor tags.
 * @param useClasses should render the span with a class instead of style.
 * @param bundle Anser output.
 * @param key
 */

function convertBundleIntoReact(searchText: string, bundle: AnserJsonEntry, key: number): JSX.Element {
  const style = { ...createStyle(bundle), wordBreak: 'break-all' };

  if (!searchText) {
    return React.createElement('span', { style, key }, bundle.content);
  }

  const content: React.ReactNode[] = [];

  const searchRegex = new RegExp(escapeRegExp(searchText), 'ig');
  let index = 0;
  let match: RegExpExecArray | null;
  while ((match = searchRegex.exec(bundle.content)) !== null) {
    const startIndex = match.index;
    if (startIndex > index) {
      content.push(bundle.content.substring(index, startIndex));
    }

    // Make sure the href we generate from the link is fully qualified. We assume http
    // if it starts with a www because many sites don't support https
    content.push(
      React.createElement(
        'span',
        {
          key: index,
          style: { backgroundColor: '#A2C1FF', fontWeight: 700, color: '#0c0d0e' },
        },
        searchText,
      ),
    );

    index = searchRegex.lastIndex;
  }

  if (index < bundle.content.length) {
    content.push(bundle.content.substring(index));
  }

  return React.createElement('span', { style: { ...style, wordBreak: 'break-all' }, key }, content);
}

declare interface Props {
  children?: string;
  className?: string;
  searchText?: string;
}

export default function Ansi(props: Props): JSX.Element {
  const { className, children, searchText } = props;
  return React.createElement(
    'code',
    { className },
    ansiToJSON(children ?? '').map(convertBundleIntoReact.bind(null, searchText ?? '')),
  );
}

// This is copied from the Jupyter Classic source code
// notebook/static/base/js/utils.js to handle \b in a way
// that is **compatible with Jupyter classic**.   One can
// argue that this behavior is questionable:
//   https://stackoverflow.com/questions/55440152/multiple-b-doesnt-work-as-expected-in-jupyter#
function fixBackspace(txt: string) {
  let tmp = txt;
  do {
    txt = tmp;
    // Cancel out anything-but-newline followed by backspace
    tmp = txt.replace(/[^\n]\x08/gm, '');
  } while (tmp.length < txt.length);
  return txt;
}

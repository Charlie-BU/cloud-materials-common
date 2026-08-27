import glob from 'glob';
import React from 'react';
import ReactDOM from 'react-dom';

import './mockDate';
import path from 'path';
import { render } from '@testing-library/react';

beforeAll(() => {
  ReactDOM.createPortal = jest.fn(() => {
    return null as any;
  }) as typeof ReactDOM.createPortal;
});

afterAll(() => {
  (ReactDOM.createPortal as any).mockClear();
});

function demoTest(component: string, toMatchSnapshot = true) {
  const files = glob.sync(path.resolve(__dirname, `../${component}/__docs__/*.{js,jsx,ts,tsx}`));

  files.forEach((file: string) => {
    const splits = file.split('/');
    const length = splits.length;
    const fileName = splits[length - 1];

    if (fileName.startsWith('index.')) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Demo = require(file)?.default;

    if (!Demo) return;

    it(`renders ${component}/demo/${fileName} correctly`, () => {
      const { asFragment } = render(React.createElement(Demo));
      toMatchSnapshot && expect(asFragment()).toMatchSnapshot();
    });
  });
}

export default demoTest;

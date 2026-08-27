import { CTable } from '@cloud-materials/common';
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { mockFetcher } from './mockFetcher';
import { wait } from './wait';

describe('CTable 竞态测试', () => {
  const debounceDelay = 100;

  const createConfig = ({
    fn,
    initialWait = 1000,
    searchWait = 100,
    initialTdText = 'init data',
    searchTdText = 'search data',
  }: {
    fn?: (...args: any[]) => void;
    searchWait?: number;
    initialWait?: number;
    initialTdText?: string;
    searchTdText?: string;
  } = {}) =>
    CTable.defineConfig({
      toolbar: {
        debounceDelay,
        initialValues: { instanceSearch: 'init' },
        right: [
          {
            name: 'instanceSearch',
            component: 'CSimpleSearch',
            componentProps: {
              content: {
                component: 'Input',
                componentProps: {
                  width: 240,
                  // @ts-expect-error 预期的错误
                  'data-testid': 'input',
                },
              },
            },
          },
        ],
      },
      columns: [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Now', dataIndex: 'now' },
      ],

      fetcher({ filterValues }) {
        fn?.();
        if (filterValues?.instanceSearch === 'init') {
          return mockFetcher(
            {
              data: [{ name: initialTdText, now: Date.now() }],
              total: 1,
            },
            initialWait,
          );
        }

        return mockFetcher(
          {
            data: [{ name: searchTdText, now: Date.now() }],
            total: 1,
          },
          searchWait,
        );
      },
    });
  test('初始化与搜索的竞态，未开启竞态时，总是展示最后响应的内容', async () => {
    const { getByTestId } = render(<CTable config={createConfig()} />);

    // 等待100毫秒，等初始化调用发起
    await wait(100);

    // 输入内容触发搜索
    act(() => {
      fireEvent.input(getByTestId('input'), { target: { value: 'foo' } });
    });

    // 等待最长的请求完成
    await wait(debounceDelay + 1050);

    expect(getByTestId('c-m-table-row-name')).toHaveTextContent(/^init data$/);
  });

  test('初始化与搜索的竞态，开启竞态时，总是展示最后一次请求的内容', async () => {
    const { getByTestId } = render(<CTable config={{ ...createConfig(), enableRaceCondition: true }} />);

    // 等待100毫秒，等初始化调用发起
    await wait(100);

    // 输入内容触发搜索
    act(() => {
      fireEvent.input(getByTestId('input'), { target: { value: 'foo' } });
    });

    // 等待最长的请求完成
    await wait(debounceDelay + 1050);

    expect(getByTestId('c-m-table-row-name')).toHaveTextContent(/^search data$/);
  });

  test('开启竞态处理 => 当轮询挂起，用户发起搜索时，轮询后于搜索返回，展示用户搜索的结果', async () => {
    // 自动轮询任务
    const polling = CTable.createPolling({ pollingInterval: 1e3, manual: false });
    const fn = jest.fn();
    const { getByTestId } = render(<CTable config={{ ...createConfig({ fn }), enableRaceCondition: true, polling }} />);
    // 等到2秒，确保轮询已经发起
    await wait(2050);
    // 如果开启了自动轮询，初始化时会立即发起一次请求，加上初始化请求，所以这里是 2+1
    expect(fn).toBeCalledTimes(3);
    // 输入内容触发搜索
    act(() => {
      fireEvent.input(getByTestId('input'), { target: { value: 'foo' } });
    });

    // 等待此时轮询的请求结束，轮询是用的初始化参数，响应时间为1s
    await wait(1050);

    expect(getByTestId('c-m-table-row-name')).toHaveTextContent(/^search data$/);
  });
});

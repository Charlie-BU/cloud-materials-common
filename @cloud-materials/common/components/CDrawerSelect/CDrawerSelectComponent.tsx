import React, { useMemo } from 'react';
import { isFunction, isNil } from 'lodash-es';
import CDrawer from '../CDrawer/Base';
import { useCConfigContext } from '../CConfigProvider';
import type { CDrawerTableSelectProps } from './interface';
import { Type } from './interface';
import CTableSelect from '../CForm/react/Components/TableSelect';
import { observer } from '@formily/react';
import { useControlledValue } from '../hooks';

const CDrawerSelectComponent: React.FC<CDrawerTableSelectProps> = observer(props => {
  const {
    value: defaultValue,
    visible,
    customTip,
    searchConfig,
    showRefreshIcon,
    type = Type.radio,
    footer,
    showDefaultFooter = false,
    fetcher,
    columns,
    data,
    rowKey,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    customErrorMessage,
    okButtonProps,
    tableSelectProps,
    onCancel,
    onOk,
    onChange,
    disabled,
    ...restDrawerConfig
  } = props;

  const { useCssPrefix, locale, formatLocale } = useCConfigContext();
  const cssPrefix = useCssPrefix('drawer-table-select');

  // 点击select输入框×时，组件值变更，value也要变更
  const [value, setValue] = useControlledValue({ value: defaultValue });

  // 获取错误提示信息
  const errMsg = useMemo(() => {
    // 自定义校验信息放在最后，可以覆盖前面默认的数量校验文本
    const _customErrorMessage = isFunction(customErrorMessage) ? customErrorMessage(value) : customErrorMessage;
    if (_customErrorMessage) return _customErrorMessage;
    const len = value?.length || 0;
    if (min > len) return formatLocale(locale.CDrawerSelect.minMsg, { min });
    if (len > max) return formatLocale(locale.CDrawerSelect.maxMsg, { max });
    return '';
  }, [min, max, value, customErrorMessage]);

  // 单选且未传入footer时，将footer设为null
  const _footer = type === Type.radio && isNil(footer) ? null : footer;

  const { arcoTableProps, ...otherTableSelectProps } = tableSelectProps || {};

  const getToolbar = () => {
    const { left = [], right = [] } = tableSelectProps?.toolbar || {};
    customTip &&
      left.push({
        component: () => <span className={cssPrefix`tip`}>{isFunction(customTip) ? customTip(value) : customTip}</span>,
      });
    searchConfig && right.push(...searchConfig);
    showRefreshIcon &&
      right?.push({
        component: 'FunctionBtnList',
        componentProps: {
          btnList: [{ component: 'RefreshBtn' }],
        },
      });
    return { ...tableSelectProps?.toolbar, left, right };
  };

  return (
    <CDrawer
      wrapClassName={cssPrefix`drawer`}
      visible={visible}
      footer={showDefaultFooter ? undefined : _footer}
      autoFocus={false}
      {...restDrawerConfig}
      onCancel={e => {
        // 取消的时候，重置TableSelect选中的值
        setValue(defaultValue);
        onCancel?.(e);
      }}
      okButtonProps={{ disabled: Boolean(errMsg), ...okButtonProps }}
      onOk={() => {
        onOk?.(value);
      }}
    >
      <CTableSelect
        type={type}
        data={data}
        value={value}
        rowKey={rowKey}
        toolbar={getToolbar()}
        fetcher={fetcher}
        rowSelection={{ preserveCrossPageKeys: true }}
        onChange={val => {
          setValue(val);
          // * 未使用默认footer再触发onChange，避免未点击确认按钮，抽屉还未关闭，就触发表单的onChange
          !showDefaultFooter && onChange?.(val);
          // 单选且没有配置footer时，选择值后关闭Drawer
          if (type === 'radio' && !showDefaultFooter) {
            !_footer && onOk?.(val);
          }
        }}
        disabled={disabled}
        columns={columns}
        pagination={true}
        arcoTableProps={
          isFunction(arcoTableProps)
            ? arcoTableProps
            : { ...arcoTableProps, scroll: { y: false, ...arcoTableProps?.scroll } }
        }
        {...otherTableSelectProps}
      />
      <span className={cssPrefix`error-message`}>{errMsg}</span>
    </CDrawer>
  );
});

CDrawerSelectComponent.displayName = 'CDrawerSelectComponent';

export default CDrawerSelectComponent;

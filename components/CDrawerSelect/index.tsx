import React, { useState } from 'react';
import { Select } from '@arco-design/web-react';
import type { CDrawerSelectProps } from './interface';
import { Type } from './interface';
import CDrawerSelectComponent from './CDrawerSelectComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { IconDrawerExpand, IconDrawerFold } from '@arco-design/iconbox-react-ve-o-design';
import { useControlledValue } from '../hooks';

export const cssPrefix = classNamePrefixFactory('drawer-select');

export const drawerSelectTestId = {
  container: cssPrefix`container`,
  select: cssPrefix`select`,
};

const CDrawerSelect = React.forwardRef<HTMLDivElement, CDrawerSelectProps>((props, ref) => {
  const {
    controlledValue,
    value: defaultValue,
    mode,
    arcoSelectProps,
    customRender,
    onChange,
    onOk,
    onCancel,
    unmountOnExit = false,
    rowKey,
    onValueChange,
    disabled,
    ...config
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const isControlled = 'controlledValue' in props;
  const valueProps = Object.assign({}, isControlled ? { value: controlledValue } : { defaultValue });

  const [selectValue, setSelectValue] = useControlledValue(valueProps);

  const drawerSelect = (
    // 半受控组件，内部值监听selectValue变化，同时内部进行选择，在onOk的时候调用组件的onChange触发整个组件值变更
    <CDrawerSelectComponent
      rowKey={rowKey}
      {...config}
      disabled={disabled}
      unmountOnExit={unmountOnExit}
      value={selectValue}
      onChange={onChange}
      visible={visible}
      type={mode ? Type.checkbox : Type.radio}
      onCancel={e => {
        setVisible(false);
        onCancel?.(e);
      }}
      onOk={v => {
        onOk?.(v);
        !isControlled && setSelectValue(v);
        onChange?.(v);
        onValueChange?.(v);
        setVisible(false);
      }}
    />
  );

  return (
    <div data-cy={drawerSelectTestId.container} ref={ref} className={cssPrefix``}>
      {customRender ? (
        customRender({ open: () => setVisible(true), close: () => setVisible(false) })
      ) : (
        <Select
          data-cy={drawerSelectTestId.select}
          data-testid={drawerSelectTestId.select}
          // 内置的Select必须为受控模式，因为选择行为是发生在CTableSelect内部的，必须外部控制Select的值
          value={selectValue}
          onChange={val => {
            !isControlled && setSelectValue(val);
            onChange?.(val);
            onValueChange?.(val);
          }}
          mode={mode}
          suffixIcon={visible ? <IconDrawerFold /> : <IconDrawerExpand />}
          popupVisible={false}
          onClick={() => !disabled && setVisible(true)}
          style={{ width: 448 }}
          disabled={disabled}
          {...arcoSelectProps}
        />
      )}
      {/** 如果配置了关闭后销毁，整个组件都会卸载，防止数据缓存 */}
      {unmountOnExit ? visible && drawerSelect : drawerSelect}
    </div>
  );
});

CDrawerSelect.displayName = 'CDrawerSelect';

export default CDrawerSelect;

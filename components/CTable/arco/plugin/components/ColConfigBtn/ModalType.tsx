import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from '@arco-design/web-react';
import classnames from 'classnames';
import { values } from 'lodash-es';
import { useCConfigContext } from '../../../../../CConfigProvider';
import CModal from '../../../../../CModal/Base';
import type { CModalProps } from '../../../../../CModal/interface';
import type { ColumnConfig } from '../../../types';
import { CheckboxItem } from './CheckboxItem';
import type { CommonProps } from './interface';
import { getTooltip } from './utils';
import { usePrefix } from '../../../../react';

interface Props extends CommonProps {
  CModalProps?: CModalProps;
}

export const ModalType: FC<Props> = props => {
  const {
    columns,
    CModalProps,
    defaultVisibleMap,
    showReset,
    tooltip: tooltipConfig,
    setLocalStorage,
    isColumnDisabled,
    visible,
    setVisible,
  } = props;
  const { locale } = useCConfigContext();
  const prefixCls = usePrefix('comp-col-config-btn-modal');

  const getVisibleMapFromColumns = () => {
    return columns.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr.dataIndex] = curr.visible;
      return acc;
    }, {});
  };

  // 一共有三个 visible 状态 map
  // 1. defaultVisibleMap: 每一列的默认配置，始终保持不变
  // 2. initialVisibleMap: 上一次生效的配置，可以理解为本次打开弹窗的初始值，对应column.visible属性
  // 3. tmpVisibleMap: 临时状态，在勾选、恢复默认、取消时均会被改变
  const initialVisibleMap = getVisibleMapFromColumns();
  const [tmpVisibleMap, setTmpVisibleMap] = useState(initialVisibleMap);

  // 通过 table 领域模型修改了 column 的 visible，需要修改 tmpVisibleMap，保证打开自定义列 Modal 展示的列勾选状态是最新的
  const columnsVisibleStr = columns.map(c => c.visible).join(', ');
  useEffect(() => {
    setTmpVisibleMap(getVisibleMapFromColumns());
  }, [columnsVisibleStr]);

  const isAllSelect = values(tmpVisibleMap).every(c => c);
  const isHalfSelect = values(tmpVisibleMap).some(c => c) && values(tmpVisibleMap).some(c => !c);

  // 分为三列展示，每一列展示的数量
  const columnCount = Math.ceil(columns.length / 3);

  // 恢复默认: 将 tmpVisibleMap 设为 defaultVisibleMap
  const handleReset = () => {
    setTmpVisibleMap(defaultVisibleMap);
  };

  // 取消: 将 tmpVisibleMap 设为 initialVisibleMap 并关闭弹窗
  const handleCancel = () => {
    setTmpVisibleMap(initialVisibleMap);
    setVisible(false);
  };

  // 确认: 1. 将 initialVisibleMap 设为 tmpVisibleMap, 2: 关闭弹窗, 3: 设置 localStorage
  const handleOk = () => {
    columns.forEach(c => c.setVisible(tmpVisibleMap[c.dataIndex]));
    setVisible(false);
    setLocalStorage();
  };

  // 全选
  const handleSelectAll = () => {
    setTmpVisibleMap(
      columns.reduce<Record<string, boolean>>((acc, curr) => {
        if (isColumnDisabled(curr.dataIndex)) {
          acc[curr.dataIndex] = curr.visible;
        } else {
          acc[curr.dataIndex] = !isAllSelect;
        }
        return acc;
      }, {}),
    );
  };

  return (
    <>
      {props.children}
      <CModal
        unmountOnExit={true}
        title={locale.CTable.colConfig}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <div className={`${prefixCls}-buttons`}>
            {showReset && (
              <Button className={`${prefixCls}-buttons-left`} onClick={handleReset}>
                {locale.CTable.reset}
              </Button>
            )}
            <div className={`${prefixCls}-buttons-right`}>
              <Button style={{ marginRight: 12 }} onClick={handleCancel}>
                {locale.CTable.cancel}
              </Button>
              <Button type="primary" onClick={handleOk}>
                {locale.CTable.apply}
              </Button>
            </div>
          </div>
        }
        className={classnames(`${prefixCls}`, CModalProps?.className)}
        {...CModalProps}
      >
        <div className={`${prefixCls}-content`}>
          <Checkbox
            checked={isAllSelect}
            indeterminate={isHalfSelect}
            className={`${prefixCls}-content-select-all`}
            onChange={handleSelectAll}
          >
            {locale.CTable.selectAll}
          </Checkbox>
          <div className={`${prefixCls}-content-wrapper`}>
            {/* 分成三列 */}
            {[0, columnCount, 2 * columnCount].map(startIndex => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className={`${prefixCls}-content-wrapper-column`}>
                  {columns
                    .slice(startIndex, Math.min(startIndex + columnCount, columns.length))
                    .map((column, index) => {
                      const { dataIndex = String(index), tooltip: columnTooltip } = column.config as ColumnConfig<any>;
                      const tooltip = getTooltip(tooltipConfig, dataIndex, columnTooltip);
                      return (
                        <CheckboxItem
                          key={dataIndex}
                          value={tmpVisibleMap[dataIndex]}
                          onChange={checked => setTmpVisibleMap({ ...tmpVisibleMap, [dataIndex]: checked })}
                          name={column.title}
                          disabled={isColumnDisabled(dataIndex)}
                          tooltip={tooltip}
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </CModal>
    </>
  );
};

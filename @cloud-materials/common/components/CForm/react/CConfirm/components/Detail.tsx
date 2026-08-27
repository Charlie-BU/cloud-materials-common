import React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import type { ConfirmDetail } from '../../../interface';
import type { ItemProps } from '../../../../CInfoSection/interface';
import { Space } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import CTable from '../../../../CTable';
import CInfoSection from '../../../../CInfoSection';
import { useCConfigContext } from '../../../../CConfigProvider';

export default (props: ConfirmDetail) => {
  const { detail, labelWidth = 'normal', values, form, onEdit = () => {} } = props;
  if (!detail) {
    return null;
  }
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('form-confirm');

  return (
    <div className={cssPrefix``}>
      {detail.map((step, stepIndex) => (
        <div
          className={classNames({
            [cssPrefix`wrap`]: stepIndex !== detail.length - 1,
            [cssPrefix`wrap-last`]: stepIndex === detail.length - 1,
          })}
          key={step.title}
        >
          <div className={cssPrefix`step`}>
            <Space>
              <span className={cssPrefix`title`}> {step.title}</span>
              {step.edit && <IconEdit onClick={() => onEdit(stepIndex)} />}
            </Space>
          </div>
          <div>
            <CTable
              config={{
                columns: step.section.map(item => ({
                  ...(item.columnConfig || {}),
                  dataIndex: item.title,
                  title: (
                    <Space>
                      <span> {item.title}</span>
                      {item.editAnchor && (
                        <IconEdit
                          onClick={() => onEdit(stepIndex, typeof item.editAnchor === 'string' ? item.editAnchor : '')}
                        />
                      )}
                    </Space>
                  ),
                  render: (col: ItemProps[]) => {
                    if (isFunction(item?.customRender)) {
                      // 用户自定义当前列渲染
                      return item?.customRender(values, col, form);
                    }
                    return (
                      <CInfoSection.List
                        wrapperStyle={{
                          marginTop: 0,
                        }}
                        colNumber={1}
                        listData={[
                          {
                            title: '',
                            infoItemList: col,
                          },
                        ]}
                        labelWidth={labelWidth}
                      />
                    );
                  },
                })),
                data: [
                  step.section.reduce((prev: any, curr) => {
                    prev[curr.title] = curr.fields;
                    return prev;
                  }, {}),
                ],
                pagination: false,
                ...(step.CTableProps || {}),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

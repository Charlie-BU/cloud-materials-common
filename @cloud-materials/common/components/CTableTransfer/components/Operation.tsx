import { Button } from '@arco-design/web-react';
import React, { useContext } from 'react';
import type { TableModel } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import { CTransferDirection } from '../interface';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import { mode, DataCy } from '../utils';
import { observer } from '@formily/react';
import { CConfigContext } from '../../CConfigProvider';

interface OperationProps {
  sourceTable: TableModel<any>;
  targetTable: TableModel<any>;
  cTransferProps: CTableTransferProps;
  onMove: (to: CTransferDirection) => void;
}

const Operation: React.FC<OperationProps> = ({ sourceTable, targetTable, cTransferProps, onMove }) => {
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('transfer');
  const { operationStyle = {}, operationTexts, disabled } = cTransferProps;
  const sourceActive = sourceTable.selectedRowKeys.length > 0;
  const targetActive = targetTable.selectedRowKeys.length > 0;
  // const buttons = oneWay ? [CTransferDirection.Source] : [CTransferDirection.Source, CTransferDirection.Target];
  const buttons = [CTransferDirection.Source, CTransferDirection.Target];
  const { simple } = mode({ ...cTransferProps });
  return simple ? null : (
    <div style={operationStyle} className={cssPrefix`operations`}>
      {buttons.map((source, index) => {
        let Icon;
        let _disabled;
        let dataCy = '';

        if (source === CTransferDirection.Target) {
          Icon = IconLeft;
          dataCy = DataCy.sourceOperationButton;
          _disabled = disabled || !targetActive;
        } else {
          Icon = IconRight;
          dataCy = DataCy.targetOperationButton;
          _disabled = disabled || !sourceActive;
        }

        return (
          <Button
            className={cssPrefix`operation-btn`}
            key={index}
            type="secondary"
            size="small"
            shape="round"
            disabled={_disabled}
            onClick={() => onMove(source)}
            icon={<Icon />}
            data-cy={dataCy}
          >
            {operationTexts && operationTexts[index]}
          </Button>
        );
      })}
    </div>
  );
};

export default observer(Operation);

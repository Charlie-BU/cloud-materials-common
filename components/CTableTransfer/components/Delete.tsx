import { IconClose } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';
import { CConfigContext } from '../../CConfigProvider';
import { useTable } from '../../CTable';
import { ROW_KEY } from '../constant';
import type { CTableTransferItem } from '../interface';
import { DataCy } from '../utils';

const Delete = ({ item }: { item: CTableTransferItem }) => {
  const table = useTable();
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('transfer');
  return (
    <div
      className={cssPrefix`delete-icon`}
      data-cy={DataCy.deleteItem}
      onClick={() => {
        table.selectRow([item[ROW_KEY]], { triggerSelectRowEvent: true });
      }}
    >
      <IconClose className={cssPrefix`icon`} />
    </div>
  );
};
export default Delete;

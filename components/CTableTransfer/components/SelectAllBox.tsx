import { Checkbox } from '@arco-design/web-react';
import React from 'react';
import { useTable } from '../../CTable';
import { cssPrefix, DataCy } from '../utils';

const SelectAllBox: React.FC<{
  disabled: boolean;
}> = ({ disabled }) => {
  const table = useTable();
  const { canControlRowKeys, partialSelected, allSelected } = table.getSelectedStatusInfo();
  const onChange = () => {
    table.selectRowAll(!allSelected, { triggerSelectRowEvent: true });
  };
  return (
    <Checkbox
      className={cssPrefix`check-all`}
      disabled={disabled || canControlRowKeys.length === 0}
      checked={allSelected}
      indeterminate={partialSelected}
      onClick={onChange}
      data-cy={DataCy.selectAll}
    />
  );
};
export default SelectAllBox;

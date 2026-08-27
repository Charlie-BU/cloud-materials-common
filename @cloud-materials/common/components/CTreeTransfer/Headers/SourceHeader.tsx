import React, { useContext, useState } from 'react';
import { Checkbox, Input } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/iconbox-react-ve-o-design';
import type { CheckedStatus } from '../interface';
import { useDebounceFn } from 'ahooks';
import { DataCy } from '../utils';
import { CConfigContext } from '../../CConfigProvider';

interface Props {
  extraAction?: React.ReactNode;
  onCheckAll: (isChecked: boolean) => void;
  checkAllStatus: CheckedStatus;
  onSearchChange: (searchStr: string, type: 'source') => void;
  placeholder?: string;
  sourceHeaderCustomText?: {
    checkAllTitle?: string | ((searchStr: string) => string);
  };
}

export const SourceHeader: React.FC<Props> = ({
  extraAction,
  checkAllStatus,
  placeholder,
  onCheckAll,
  onSearchChange,
  sourceHeaderCustomText,
}) => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const [searchStr, setSearchStr] = useState('');
  const customCheckAllTitle = sourceHeaderCustomText?.checkAllTitle;
  const cssPrefix = useCssPrefix('tree-transfer');
  const { run: handleSearchChange } = useDebounceFn(
    (v: string) => {
      setSearchStr(v);
      onSearchChange(v, 'source');
    },
    { wait: 200 },
  );

  const checkTitle = customCheckAllTitle
    ? typeof customCheckAllTitle === 'string'
      ? customCheckAllTitle
      : customCheckAllTitle?.(searchStr)
    : locale.CTreeTransfer.checkAll;

  return (
    <div className={cssPrefix`header`} data-cy={DataCy.sourceHeader} data-testid={DataCy.sourceHeader}>
      <div className={cssPrefix`header-content`}>
        <Checkbox
          className={cssPrefix`header-check-all`}
          onChange={onCheckAll}
          checked={checkAllStatus.checked}
          indeterminate={checkAllStatus.indeterminate}
          data-cy={DataCy.sourceCheckAll}
          data-testid={DataCy.sourceCheckAll}
        >
          {checkTitle}
        </Checkbox>
        {extraAction}
      </div>
      <Input
        prefix={<IconSearch />}
        placeholder={placeholder || locale.CTreeTransfer.searchPlaceholder}
        size="small"
        className={cssPrefix`header-search`}
        onChange={handleSearchChange}
        allowClear={true}
        data-cy={DataCy.sourceSearch}
        data-testid={DataCy.sourceSearch}
      />
    </div>
  );
};

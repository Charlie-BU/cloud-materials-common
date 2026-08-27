import React, { useContext } from 'react';
import { Input } from '@arco-design/web-react';
import { IconSearch, IconDelete } from '@arco-design/iconbox-react-ve-o-design';
import { useDebounceFn } from 'ahooks';
import { DataCy } from '../utils';
import classNames from 'classnames';
import { CConfigContext } from '../../CConfigProvider';

interface Props {
  extraAction?: React.ReactNode;
  totalChosenCount?: number;
  placeholder?: string;
  onClear: () => void;
  onSearchChange: (searchStr: string, type: 'target') => void;
  title?: React.ReactNode;
}

export const TargetHeader: React.FC<Props> = ({
  extraAction,
  totalChosenCount,
  placeholder,
  onClear,
  onSearchChange,
  title,
}) => {
  const { useCssPrefix, locale, formatLocale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('tree-transfer');
  const { run: handleSearchChange } = useDebounceFn(
    (v: string) => {
      onSearchChange(v, 'target');
    },
    { wait: 200 },
  );
  return (
    <div className={cssPrefix`header`} data-cy={DataCy.targetHeader} data-testid={DataCy.targetHeader}>
      <div className={classNames(cssPrefix`header-content`, cssPrefix`target-header-content`)}>
        <div>
          {title !== undefined
            ? title
            : totalChosenCount !== undefined && (
                <span>{formatLocale(locale.CTreeTransfer.checkedCount, { count: totalChosenCount })}</span>
              )}
        </div>
        <div className={cssPrefix`header-right`}>
          {extraAction}

          <IconDelete
            className={classNames(cssPrefix`header-delete-icon`, 'c-m-icon')}
            onClick={onClear}
            data-cy={DataCy.targetClear}
            data-testid={DataCy.targetClear}
          />
        </div>
      </div>
      <Input
        prefix={<IconSearch />}
        placeholder={placeholder || locale.CTreeTransfer.searchPlaceholder}
        size="small"
        className={cssPrefix`header-search`}
        onChange={handleSearchChange}
        data-cy={DataCy.targetSearch}
        data-testid={DataCy.targetSearch}
      />
    </div>
  );
};

import type { TableConfig } from '../../CTable';
import { onRowInit } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import { DEFAULT_LABEL } from '../constant';
import type { CLocale } from '../../locales/default';

/**
 *  @description table基本配置
 * @param {CTableTransferProps<any>} cTransferProps
 * @return {*}  {TableConfig<any>}
 */
export const getTableBaseConfig = (cTransferProps: CTableTransferProps, locale: CLocale): TableConfig<any> => {
  const {
    disabled,
    rowLabel = DEFAULT_LABEL,
    searchIndex = rowLabel,
    showSearch = false,
    selectedMax,
    searchPlaceholder = locale.CTableTransfer.placeholder,
  } = cTransferProps;

  const config: TableConfig<any> = {
    extraConfig: {
      bottomLeftCheckAllCrossPage: true,
      autoFixBottomScroll: true,
    },
    toolbar: {
      right: [
        showSearch && {
          name: searchIndex,
          component: 'CSimpleSearch',
          componentProps: {
            content: {
              component: 'Input',
              componentProps: {
                placeholder: searchPlaceholder,
              },
            },
          },
        },
      ],
    },
    arcoTableProps: {
      border: {
        wrapper: false,
      },
    },
    effects() {
      if (disabled || selectedMax === 0) {
        onRowInit(({ row }) => {
          row.setSelectable(false);
        });
      }
    },
  };

  return config;
};

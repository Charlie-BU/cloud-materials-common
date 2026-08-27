import { onRowInit } from '../../CTable';
import { DEFAULT_LABEL } from '../constant';
/**
 *  @description table基本配置
 * @param {CTableTransferProps<any>} cTransferProps
 * @return {*}  {TableConfig<any>}
 */
export var getTableBaseConfig = function (cTransferProps, locale) {
    var disabled = cTransferProps.disabled, _a = cTransferProps.rowLabel, rowLabel = _a === void 0 ? DEFAULT_LABEL : _a, _b = cTransferProps.searchIndex, searchIndex = _b === void 0 ? rowLabel : _b, _c = cTransferProps.showSearch, showSearch = _c === void 0 ? false : _c, selectedMax = cTransferProps.selectedMax, _d = cTransferProps.searchPlaceholder, searchPlaceholder = _d === void 0 ? locale.CTableTransfer.placeholder : _d;
    var config = {
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
        effects: function () {
            if (disabled || selectedMax === 0) {
                onRowInit(function (_a) {
                    var row = _a.row;
                    row.setSelectable(false);
                });
            }
        },
    };
    return config;
};
//# sourceMappingURL=getTableBaseConfig.js.map
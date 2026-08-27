import { __assign, __makeTemplateObject } from "tslib";
import { Button } from '@arco-design/web-react';
import React, { useContext } from 'react';
import { CTransferDirection } from '../interface';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import { mode, DataCy } from '../utils';
import { observer } from '@formily/react';
import { CConfigContext } from '../../CConfigProvider';
var Operation = function (_a) {
    var sourceTable = _a.sourceTable, targetTable = _a.targetTable, cTransferProps = _a.cTransferProps, onMove = _a.onMove;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('transfer');
    var _b = cTransferProps.operationStyle, operationStyle = _b === void 0 ? {} : _b, operationTexts = cTransferProps.operationTexts, disabled = cTransferProps.disabled;
    var sourceActive = sourceTable.selectedRowKeys.length > 0;
    var targetActive = targetTable.selectedRowKeys.length > 0;
    // const buttons = oneWay ? [CTransferDirection.Source] : [CTransferDirection.Source, CTransferDirection.Target];
    var buttons = [CTransferDirection.Source, CTransferDirection.Target];
    var simple = mode(__assign({}, cTransferProps)).simple;
    return simple ? null : (React.createElement("div", { style: operationStyle, className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["operations"], ["operations"]))) }, buttons.map(function (source, index) {
        var Icon;
        var _disabled;
        var dataCy = '';
        if (source === CTransferDirection.Target) {
            Icon = IconLeft;
            dataCy = DataCy.sourceOperationButton;
            _disabled = disabled || !targetActive;
        }
        else {
            Icon = IconRight;
            dataCy = DataCy.targetOperationButton;
            _disabled = disabled || !sourceActive;
        }
        return (React.createElement(Button, { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["operation-btn"], ["operation-btn"]))), key: index, type: "secondary", size: "small", shape: "round", disabled: _disabled, onClick: function () { return onMove(source); }, icon: React.createElement(Icon, null), "data-cy": dataCy }, operationTexts && operationTexts[index]));
    })));
};
export default observer(Operation);
var templateObject_1, templateObject_2;
//# sourceMappingURL=Operation.js.map
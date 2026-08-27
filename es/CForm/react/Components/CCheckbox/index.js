import { connect, mapProps } from '@formily/react';
import Checkbox from '../../../../CCheckbox';
var CCheckbox = connect(Checkbox.Group, mapProps(function (props, field) {
    if (!field)
        return props;
    return {
        options: (props === null || props === void 0 ? void 0 : props.options) || field.dataSource,
        value: field.value,
    };
}));
export default CCheckbox;
//# sourceMappingURL=index.js.map
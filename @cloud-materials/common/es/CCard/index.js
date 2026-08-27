import { __assign, __makeTemplateObject, __rest } from "tslib";
import React, { useMemo } from 'react';
import cs from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
import { useMergeProps } from '../hooks/useMergeProps';
import { Card, Grid } from '@arco-design/web-react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import LinkListItem from './component/LinkListItem';
var GridItem = Grid.GridItem;
export var components = {
    Grid: Grid,
    Card: Card,
    GridItem: GridItem,
};
var cssPrefix = classNamePrefixFactory('card');
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    extra: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["header-extra"], ["header-extra"]))),
    title: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header-title"], ["header-title"]))),
    icon: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-icon"], ["header-icon"]))),
};
var defaultProps = {
    bordered: true,
};
var CCardComponent = function (baseProps) {
    var props = useMergeProps(baseProps, defaultProps, {});
    var className = props.className, title = props.title, type = props.type, children = props.children, icon = props.icon, rest = __rest(props, ["className", "title", "type", "children", "icon"]);
    var typeClassName = useMemo(function () {
        switch (type) {
            case 'linkList':
                return 'link-list';
            default:
                return type;
        }
    }, [type]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix("card");
    var renderChildren = function () {
        if (type === 'linkList') {
            var cols = props.cols, items = props.items;
            return (React.createElement(Grid, { colGap: 24, cols: cols !== null && cols !== void 0 ? cols : 1, rowGap: 8 }, items
                ? //items 优先级最高
                    items.map(function (item, i) {
                        return (React.createElement(GridItem, { key: i },
                            React.createElement(LinkListItem, __assign({}, item))));
                    })
                : //如果没有配置item，则使用 Children
                    React.Children.map(children, function (element) {
                        return React.createElement(GridItem, null, element);
                    })));
        }
        return children;
    };
    return (React.createElement(Card, __assign({ title: React.createElement(React.Fragment, null,
            icon,
            title), "data-testid": testId.container }, rest, { className: cs(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""]))), cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["", ""], ["", ""])), typeClassName), className) }), renderChildren()));
};
var CCard = Object.assign(CCardComponent, {
    LinkListItem: LinkListItem,
    displayName: 'CCard',
});
export default CCard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.components = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var useMergeProps_1 = require("../hooks/useMergeProps");
var web_react_1 = require("@arco-design/web-react");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var LinkListItem_1 = tslib_1.__importDefault(require("./component/LinkListItem"));
var GridItem = web_react_1.Grid.GridItem;
exports.components = {
    Grid: web_react_1.Grid,
    Card: web_react_1.Card,
    GridItem: GridItem,
};
var cssPrefix = (0, classNamePrefixFactory_1.default)('card');
exports.testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    extra: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["header-extra"], ["header-extra"]))),
    title: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header-title"], ["header-title"]))),
    icon: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["header-icon"], ["header-icon"]))),
};
var defaultProps = {
    bordered: true,
};
var CCardComponent = function (baseProps) {
    var props = (0, useMergeProps_1.useMergeProps)(baseProps, defaultProps, {});
    var className = props.className, title = props.title, type = props.type, children = props.children, icon = props.icon, rest = tslib_1.__rest(props, ["className", "title", "type", "children", "icon"]);
    var typeClassName = (0, react_1.useMemo)(function () {
        switch (type) {
            case 'linkList':
                return 'link-list';
            default:
                return type;
        }
    }, [type]);
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix("card");
    var renderChildren = function () {
        if (type === 'linkList') {
            var cols = props.cols, items = props.items;
            return (react_1.default.createElement(web_react_1.Grid, { colGap: 24, cols: cols !== null && cols !== void 0 ? cols : 1, rowGap: 8 }, items
                ? //items 优先级最高
                    items.map(function (item, i) {
                        return (react_1.default.createElement(GridItem, { key: i },
                            react_1.default.createElement(LinkListItem_1.default, tslib_1.__assign({}, item))));
                    })
                : //如果没有配置item，则使用 Children
                    react_1.default.Children.map(children, function (element) {
                        return react_1.default.createElement(GridItem, null, element);
                    })));
        }
        return children;
    };
    return (react_1.default.createElement(web_react_1.Card, tslib_1.__assign({ title: react_1.default.createElement(react_1.default.Fragment, null,
            icon,
            title), "data-testid": exports.testId.container }, rest, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject([""], [""]))), cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), typeClassName), className) }), renderChildren()));
};
var CCard = Object.assign(CCardComponent, {
    LinkListItem: LinkListItem_1.default,
    displayName: 'CCard',
});
exports.default = CCard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraCtrlIsFeedback = exports.matchMenuFromPropsMenuByCurrentPath = exports.collectMenusFromCustomRender = exports.badgeToProps = exports.filterRootMenus = exports.getAllSubMenuKeys = exports.getNodeText = exports.batchSetStyle = exports.matchMenuFromFlatMenusByCurrentPath = exports.matchPath = exports.flatMenusFromPropMenus = exports.generateMenuItemKeyToRootKeyMapping = exports.isType = exports.testIdPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var lodash_es_1 = require("lodash-es");
exports.testIdPrefix = (0, classNamePrefixFactory_1.default)('sidebar');
function isType(type, types) {
    if (type === void 0) { type = 'menu'; }
    return types.includes(type);
}
exports.isType = isType;
/**
 * 生成菜单到跟节点的映射
 */
function generateMenuItemKeyToRootKeyMapping(menus, mapping, rootMenu) {
    return menus
        .filter(function (menu) {
        return isType(menu.type, ['sub-menu', 'menu', 'group']);
    })
        .reduce(function (prevMapping, menu) {
        var _a;
        if (menu.type === 'sub-menu' && menu.children) {
            return generateMenuItemKeyToRootKeyMapping(menu.children, prevMapping, rootMenu !== null && rootMenu !== void 0 ? rootMenu : menu);
        }
        if (menu.type === 'group' && menu.children) {
            return generateMenuItemKeyToRootKeyMapping(menu.children, prevMapping, rootMenu);
        }
        prevMapping[menu.key] = (_a = rootMenu === null || rootMenu === void 0 ? void 0 : rootMenu.key) !== null && _a !== void 0 ? _a : menu.key;
        return prevMapping;
    }, mapping);
}
exports.generateMenuItemKeyToRootKeyMapping = generateMenuItemKeyToRootKeyMapping;
/**
 * 将传入的menus展开为扁平的数组
 * @param menus
 * @returns
 */
function flatMenusFromPropMenus(menus, startMenuPath) {
    if (startMenuPath === void 0) { startMenuPath = []; }
    return menus
        .filter(function (menu) {
        return isType(menu.type, ['menu', 'sub-menu', 'group']);
    })
        .reduce(function (prev, menu) {
        // 路径取 key 不取 path
        var menuPath = startMenuPath.concat(menu.key);
        if (menu.type === 'group' || menu.type === 'sub-menu') {
            return prev.concat(menu.children ? flatMenusFromPropMenus(menu.children, menuPath) : []);
        }
        return prev.concat(tslib_1.__assign(tslib_1.__assign({}, menu), { _menuPath: menuPath }));
    }, []);
}
exports.flatMenusFromPropMenus = flatMenusFromPropMenus;
/**
 * @from https://github.com/remix-run/react-router/blob/5a43e19573c11d1469fd43ef1fddaf7be02abca5/packages/router/utils.ts#L858-L908
 */
var compilePath = function (path, end) {
    if (end === void 0) { end = true; }
    var regexpSource = '^' +
        path
            .replace(/\/*\*?$/, '') // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, '/') // Make sure it has a leading /
            .replace(/[\\.*+^$?{}|()[\]]/g, '\\$&') // Escape special regex chars
            .replace(/\/:(\w+)/g, function (_) {
            return '/([^\\/]+)';
        });
    if (path.endsWith('*')) {
        regexpSource +=
            path === '*' || path === '/*'
                ? '(.*)$' // Already matched the initial /, just match the rest
                : '(?:\\/(.+)|\\/*)$'; // Don't include the / in params["*"]
    }
    else if (end) {
        // When matching to the end, ignore trailing slashes
        regexpSource += '\\/*$';
    }
    else if (path !== '' && path !== '/') {
        // If our path is non-empty and contains anything beyond an initial slash,
        // then we have _some_ form of path in our regex so we should expect to
        // match only if we find the end of this path segment.  Look for an optional
        // non-captured trailing slash (to match a portion of the URL) or the end
        // of the path (if we've matched to the end).  We used to do this with a
        // word boundary but that gives false positives on routes like
        // /user-preferences since `-` counts as a word boundary.
        regexpSource += '(?:(?=\\/|$))';
    }
    else {
        // Nothing to match for "" or "/"
    }
    return new RegExp(regexpSource, 'i');
};
var matchPath = function (pathname, options) {
    var path = options.path, _a = options.exact, exact = _a === void 0 ? true : _a;
    return Boolean(pathname.match(compilePath(path, exact)));
};
exports.matchPath = matchPath;
function matchMenuFromFlatMenusByCurrentPath(currentPath, menuItems) {
    return menuItems.find(function (_a) {
        var key = _a.key, path = _a.path, exact = _a.exact, extraMatchKeys = _a.extraMatchKeys;
        var currentPathMatched = (path && (0, exports.matchPath)(currentPath, { path: path, exact: exact })) || (0, exports.matchPath)(currentPath, { path: key, exact: exact });
        if (currentPathMatched) {
            return true;
        }
        if (extraMatchKeys === null || extraMatchKeys === void 0 ? void 0 : extraMatchKeys.length) {
            return extraMatchKeys.some(function (extraKey) { return (0, exports.matchPath)(currentPath, { path: extraKey, exact: true }); });
        }
        return false;
    });
}
exports.matchMenuFromFlatMenusByCurrentPath = matchMenuFromFlatMenusByCurrentPath;
function batchSetStyle(refs, style) {
    refs.forEach(function (ref) {
        Object.keys(style).forEach(function (name) {
            if (ref.current) {
                ref.current.style[name] = style[name];
            }
        });
    });
}
exports.batchSetStyle = batchSetStyle;
var getNodeText = function (node) {
    var _a;
    if (!node || typeof node === 'boolean')
        return '';
    if (['string', 'number'].includes(typeof node))
        return String(node);
    if (node instanceof Array)
        return node.map(exports.getNodeText).join('');
    if (typeof node === 'object' && node)
        return (0, exports.getNodeText)((_a = node.props) === null || _a === void 0 ? void 0 : _a.children);
};
exports.getNodeText = getNodeText;
var getAllSubMenuKeys = function (menus, start) {
    if (start === void 0) { start = []; }
    return menus.reduce(function (prev, menu) {
        return menu.type === 'sub-menu' ? prev.concat(menu.key, menu.children ? (0, exports.getAllSubMenuKeys)(menu.children) : []) : prev;
    }, start);
};
exports.getAllSubMenuKeys = getAllSubMenuKeys;
/**
 * 将第一层有 icon 的菜单提取出来
 */
var filterRootMenus = function (menus) {
    var hasItemMenus = menus.filter(function (menu) {
        return isType(menu.type, ['menu', 'sub-menu', 'group']);
    });
    return hasItemMenus
        .map(function (item) {
        var _a, _b;
        if (item.type === 'group') {
            return ((_b = (_a = item.children) === null || _a === void 0 ? void 0 : _a.filter(function (menu) {
                return isType(menu.type, ['menu', 'sub-menu']);
            })) !== null && _b !== void 0 ? _b : []);
        }
        return item;
    })
        .flat()
        .filter(function (item) { return Boolean(item.icon) && !item.hidden; });
};
exports.filterRootMenus = filterRootMenus;
var badgeToProps = function (badge, defaultProps) {
    if (defaultProps === void 0) { defaultProps = {}; }
    if (badge === null || badge === void 0 ? void 0 : badge.content) {
        return tslib_1.__assign(tslib_1.__assign({}, defaultProps), badge);
    }
    return tslib_1.__assign(tslib_1.__assign({ type: 'badge', follow: false }, defaultProps), { content: badge });
};
exports.badgeToProps = badgeToProps;
var collectCustomRenderMenus = function (menus) {
    return menus.reduce(function (prev, menu) {
        var _a;
        if (menu.type === 'custom') {
            return prev.concat(menu);
        }
        if ((menu.type === 'group' || menu.type === 'sub-menu') && ((_a = menu.children) === null || _a === void 0 ? void 0 : _a.length)) {
            return prev.concat(collectCustomRenderMenus(menu.children));
        }
        return prev;
    }, []);
};
/**
 * 从自定义渲染的逻辑中拿到所有的菜单并聚合起来
 */
var collectMenusFromCustomRender = function (menus) {
    var customRenderMenus = collectCustomRenderMenus(menus);
    return customRenderMenus.reduce(function (prev, menu) {
        var prevMenus = prev;
        menu.render({
            renderMenus: function (customRenderMenus) {
                prevMenus = prevMenus.concat((0, exports.collectMenusFromCustomRender)(customRenderMenus));
                return null;
            },
        });
        return prevMenus;
    }, menus);
};
exports.collectMenusFromCustomRender = collectMenusFromCustomRender;
var matchMenuFromPropsMenuByCurrentPath = function (currentPath, menuItems) {
    return matchMenuFromFlatMenusByCurrentPath(currentPath, flatMenusFromPropMenus(menuItems));
};
exports.matchMenuFromPropsMenuByCurrentPath = matchMenuFromPropsMenuByCurrentPath;
var extraCtrlIsFeedback = function (v) {
    return react_1.default.isValidElement(v) && Boolean((0, lodash_es_1.get)(v.type, '_Feedback'));
};
exports.extraCtrlIsFeedback = extraCtrlIsFeedback;
//# sourceMappingURL=util.js.map
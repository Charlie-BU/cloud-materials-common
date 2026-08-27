var ascend = function (a, b) { return a - b; };
var descend = function (a, b) { return b - a; };
export var defaultSorter = {
    type: 'default',
    directions: ['ascend', 'descend'],
    sorterFn: function (sorterValue, a, b) {
        return sorterValue === 'ascend' ? ascend(a, b) : descend(a, b);
    },
};
//# sourceMappingURL=index.js.map
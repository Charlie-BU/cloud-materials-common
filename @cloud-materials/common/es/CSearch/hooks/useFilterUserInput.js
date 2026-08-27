export var useFilterUserInput = function (props) {
    var content = props.content, normalize = props.normalize;
    var shouldHaveNormalize = content.component && ['Input', 'AutoComplete'].includes(content.component) && normalize;
    var filterUserInput = shouldHaveNormalize
        ? typeof normalize === 'function'
            ? normalize
            : function (userInput) {
                if (!userInput) {
                    return userInput;
                }
                var formattedValue = userInput || '';
                /** 方便后续更改格式化操作顺序 */
                var LowerCaseTurn = 0;
                var UpperCaseTurn = 1;
                var IgnoreCharTurn = 2;
                for (var order = 0; order < 3; order++) {
                    if (!normalize) {
                        break;
                    }
                    if (order === LowerCaseTurn) {
                        if (normalize.letterCase === 'lowerCase') {
                            formattedValue = formattedValue === null || formattedValue === void 0 ? void 0 : formattedValue.toLowerCase();
                        }
                        continue;
                    }
                    if (order === UpperCaseTurn) {
                        if (normalize.letterCase === 'upperCase') {
                            formattedValue = formattedValue === null || formattedValue === void 0 ? void 0 : formattedValue.toUpperCase();
                        }
                        continue;
                    }
                    if (order === IgnoreCharTurn) {
                        if (Array.isArray(normalize.ignoreCharacters) && normalize.ignoreCharacters.length) {
                            formattedValue =
                                normalize.ignoreCharacters.reduce(function (res, character) {
                                    if (!character) {
                                        return res;
                                    }
                                    return res === null || res === void 0 ? void 0 : res.replaceAll(character, '');
                                }, formattedValue) || '';
                        }
                        continue;
                    }
                }
                return formattedValue;
            }
        : undefined;
    return { filterUserInput: filterUserInput };
};
//# sourceMappingURL=useFilterUserInput.js.map
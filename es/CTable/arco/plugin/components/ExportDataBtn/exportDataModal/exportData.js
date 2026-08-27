import { fallbackText } from '../../../../../utils';
// TODO 考虑抽象到 storage-base
export function exportDataToCSV(options) {
    var data = options.data, columns = options.columns, fileName = options.fileName;
    // 写入 csv 的 header 行
    var CSV = ["\uFEFF".concat(columns.map(function (c) { return c.title; }).join(','), "\r\n")];
    data.forEach(function (item) {
        CSV.push("".concat(columns
            .map(function (c) {
            var content = item["".concat(c.dataIndex)];
            if (c.formatter) {
                content = c.formatter(item);
            }
            // csv格式的限制
            // “如果该字段中有双引号，该双引号前要再加一个双引号，然后把该字段使用双引号括起来”
            if (typeof content === 'string') {
                content = content.replace(/"/g, '""');
            }
            // 用户双引号包裹内容，避免转义字符截断内容
            return "\"".concat(fallbackText(content), "\"");
        })
            .join(','), "\r\n"));
    });
    var blob = new Blob(CSV, { type: 'text/csv,charset=UTF-8' });
    var csvUrl = URL.createObjectURL(blob);
    var aEle = document.createElement('a');
    aEle.download = "".concat(fileName, ".csv");
    aEle.href = csvUrl;
    aEle.click();
}
//# sourceMappingURL=exportData.js.map
import { fallbackText } from '../../../../../utils';

export type TExportDataToCSVOptions = {
  fileName: string;
  data: Record<string, any>[];
  columns: { dataIndex: string; title: string; formatter?: (val: any) => string }[];
};

// TODO 考虑抽象到 storage-base
export function exportDataToCSV(options: TExportDataToCSVOptions) {
  const { data, columns, fileName } = options;
  // 写入 csv 的 header 行
  const CSV: string[] = [`\uFEFF${columns.map(c => c.title).join(',')}\r\n`];

  data.forEach(item => {
    CSV.push(
      `${columns
        .map(c => {
          let content = item[`${c.dataIndex}`];
          if (c.formatter) {
            content = c.formatter(item);
          }
          // csv格式的限制
          // “如果该字段中有双引号，该双引号前要再加一个双引号，然后把该字段使用双引号括起来”
          if (typeof content === 'string') {
            content = content.replace(/"/g, '""');
          }
          // 用户双引号包裹内容，避免转义字符截断内容
          return `"${fallbackText(content)}"`;
        })
        .join(',')}\r\n`,
    );
  });

  const blob = new Blob(CSV, { type: 'text/csv,charset=UTF-8' });
  const csvUrl = URL.createObjectURL(blob);
  const aEle = document.createElement('a');
  aEle.download = `${fileName}.csv`;
  aEle.href = csvUrl;
  aEle.click();
}

import { __assign } from "tslib";
import { DefaultBuiltInComponentMap } from '../../const';
import { createSchemaField } from '@formily/react';
import { SchemaItems } from '@storage-fe/formily-arco/es/ArrayItems';
import { SchemaTable } from '@storage-fe/formily-arco/es/ArrayTable';
var SchemaField = createSchemaField({
    components: Object.assign({}, __assign(__assign({}, DefaultBuiltInComponentMap), { ArrayItems: SchemaItems, ArrayTable: SchemaTable })),
});
export default SchemaField;
//# sourceMappingURL=index.js.map
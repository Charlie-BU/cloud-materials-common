import { DefaultBuiltInComponentMap } from '../../const';
import { createSchemaField } from '@formily/react';
import { SchemaItems } from '@storage-fe/formily-arco/es/ArrayItems';
import { SchemaTable } from '@storage-fe/formily-arco/es/ArrayTable';

const SchemaField = createSchemaField({
  components: Object.assign(
    {},
    {
      ...DefaultBuiltInComponentMap,
      ArrayItems: SchemaItems,
      ArrayTable: SchemaTable,
    },
  ),
});
export default SchemaField;

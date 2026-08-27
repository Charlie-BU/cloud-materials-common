import type { CFormConfirmDetail, CFormStepUnitConfig, ObjectType } from '../../interface';
import { useFormDetail } from './components/CFormDetail';
declare const _default: <T extends ObjectType = any, D extends ObjectType = any>(confirmConfig: CFormConfirmDetail<T, D>) => CFormStepUnitConfig;
export default _default;
export { useFormDetail };

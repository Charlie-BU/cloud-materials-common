import { createBuiltInForm } from '../_factory/maskableComponent';
import CForm from '../CForm';
import { BaseCModalComponent } from './Base';
export var ModalFormStep = createBuiltInForm(BaseCModalComponent, 'stepConfig', {
    defaultProps: { maskClosable: false },
    componentName: 'CModal.FormStep',
})(CForm);
//# sourceMappingURL=ModalFormStep.js.map
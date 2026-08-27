import { createBuiltInForm } from '../_factory/maskableComponent';
import CForm from '../CForm';
import { BaseCModalComponent } from './Base';

export const ModalFormStep = createBuiltInForm(BaseCModalComponent, 'stepConfig', {
  defaultProps: { maskClosable: false },
  componentName: 'CModal.FormStep',
})(CForm);

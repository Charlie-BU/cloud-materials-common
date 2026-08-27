import { createBuiltInForm } from '../_factory/maskableComponent';
import CForm from '../CForm';
import { BaseCModalComponent, testId } from './Base';

const ModalForm = createBuiltInForm(BaseCModalComponent, 'config', {
  defaultProps: {
    maskClosable: false,
    okButtonProps: {
      // @ts-ignore
      'data-testid': testId.okBtn,
    },
    cancelButtonProps: {
      // @ts-ignore
      'data-testid': testId.cancelBtn,
    },
  },
  componentName: 'CModal.Form',
})(CForm);

export default ModalForm;

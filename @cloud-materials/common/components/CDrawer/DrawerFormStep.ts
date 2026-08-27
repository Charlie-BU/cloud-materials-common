import { createBuiltInForm } from '../_factory/maskableComponent';
import CForm from '../CForm';
import { BaseCDrawerComponent } from './Base';
import MaskablePlugin from './MaskablePlugin';

const DrawerFormStep = createBuiltInForm(BaseCDrawerComponent, 'stepConfig', {
  plugin: MaskablePlugin,
  defaultProps: { maskClosable: false },
  componentName: 'CDrawer.FormStep',
})(CForm);

export default DrawerFormStep;

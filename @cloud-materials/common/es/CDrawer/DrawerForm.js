import { createBuiltInForm } from '../_factory/maskableComponent';
import CForm from '../CForm';
import { BaseCDrawerComponent } from './Base';
import MaskablePlugin from './MaskablePlugin';
var DrawerForm = createBuiltInForm(BaseCDrawerComponent, 'config', {
    plugin: MaskablePlugin,
    defaultProps: { maskClosable: false },
    componentName: 'CDrawer.Form',
})(CForm);
export default DrawerForm;
//# sourceMappingURL=DrawerForm.js.map
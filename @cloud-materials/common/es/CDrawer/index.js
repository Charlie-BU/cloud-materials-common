import { createMaskableComponent } from '../_factory/maskableComponent';
import DrawerArcoForm from './DrawerArcoForm';
import BaseCDrawer from './Base';
import DrawerForm from './DrawerForm';
import DrawerFormStep from './DrawerFormStep';
import DrawerDetail from './DrawerDetail';
var CDrawer = createMaskableComponent(BaseCDrawer, {
    Form: DrawerForm,
    Detail: DrawerDetail,
    ArcoForm: DrawerArcoForm,
    FormStep: DrawerFormStep,
});
export { CDrawer as default, DrawerForm as CDrawerForm, DrawerDetail as CDrawerDetail, DrawerFormStep as CDrawerFormStep, DrawerArcoForm as CDrawerArcoForm, };
//# sourceMappingURL=index.js.map
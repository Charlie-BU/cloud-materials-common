import { createMaskableComponent } from '../_factory/maskableComponent';
import type { CDrawerArcoFormProps } from './DrawerArcoForm';
import DrawerArcoForm from './DrawerArcoForm';
import BaseCDrawer from './Base';
import DrawerForm from './DrawerForm';
import DrawerFormStep from './DrawerFormStep';
import type { CDrawerDetailProps } from './DrawerDetail';
import DrawerDetail from './DrawerDetail';

const CDrawer = createMaskableComponent(BaseCDrawer, {
  Form: DrawerForm,
  Detail: DrawerDetail,
  ArcoForm: DrawerArcoForm,
  FormStep: DrawerFormStep,
});

export {
  CDrawer as default,
  DrawerForm as CDrawerForm,
  DrawerDetail as CDrawerDetail,
  DrawerFormStep as CDrawerFormStep,
  DrawerArcoForm as CDrawerArcoForm,
};

export type { CDrawerArcoFormProps, CDrawerDetailProps };

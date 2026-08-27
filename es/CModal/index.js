import BaseCModal from './Base';
import { createMaskableComponent } from '../_factory/maskableComponent';
import ModalArcoForm from './ModalArcoForm';
import ModalTable from './ModalTable';
import ModalForm from './ModalForm';
import { copyStaticsFromArcoModal } from './copyStaticsFromArcoModal';
import { ModalFormStep } from './ModalFormStep';
var CModal = copyStaticsFromArcoModal(createMaskableComponent(BaseCModal, {
    Form: ModalForm,
    Table: ModalTable,
    ArcoForm: ModalArcoForm,
    FormStep: ModalFormStep,
}));
export { CModal as default, ModalForm as CModalForm, ModalTable as CModalTable, ModalArcoForm as CModalArcoForm, ModalFormStep as CModalFormStep, };
//# sourceMappingURL=index.js.map
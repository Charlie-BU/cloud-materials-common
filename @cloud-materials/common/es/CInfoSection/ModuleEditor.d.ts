import type { FC } from 'react';
import type { CInfoSectionProps } from './interface';
interface SectionEditorProps {
    onClick: CInfoSectionProps['onModuleEditorClick'];
}
declare const SectionEditor: FC<SectionEditorProps & CInfoSectionProps['moduleEditor']>;
export default SectionEditor;

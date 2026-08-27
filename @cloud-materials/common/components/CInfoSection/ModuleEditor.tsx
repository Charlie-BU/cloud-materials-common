import type { FC } from 'react';
import React from 'react';
import { IconEdit } from '@arco-design/iconbox-react-ve-o-design';
import { Popover } from '@arco-design/web-react';
import type { CInfoSectionProps } from './interface';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';

interface SectionEditorProps {
  onClick: CInfoSectionProps['onModuleEditorClick'];
}

const SectionEditor: FC<SectionEditorProps & CInfoSectionProps['moduleEditor']> = props => {
  const { locale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('info-section');
  if (props?.showModuleEditor === false) {
    return <></>;
  }
  return !props.disable ? (
    <Popover {...props?.popoverProps} disabled={props?.popoverProps === undefined}>
      <div onClick={props?.onClick} className={cssPrefix`module-editor`}>
        <IconEdit height="22px" />
        <span style={{ marginLeft: 8 }}>{locale.CInfoSection.editor}</span>
      </div>
    </Popover>
  ) : (
    <Popover content={props.disableContent || locale.CInfoSection.noEditorTip}>
      <div className={classNames(cssPrefix`module-editor`, cssPrefix`module-editor-disable`)}>
        <IconEdit height="22px" />
        <span style={{ marginLeft: 8 }}>{locale.CInfoSection.editor}</span>
      </div>
    </Popover>
  );
};

export default SectionEditor;

import React from 'react';
import { Popover } from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { useDownload } from '../../../hooks/useDownload';
import { testId } from '../..';
import { useCConfigContext } from '../../../CConfigProvider';

const Download = ({ value, fileName }: { fileName: string; value: string }) => {
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('code-block');
  const iconCls = useCssPrefix('')`icon`;
  // 下载hooks
  const [{ arcoPopoverProps }, controls] = useDownload({
    value,
    fileName,
  });

  return (
    <div className={classNames(cssPrefix`download`)}>
      <Popover {...arcoPopoverProps}>
        <IconDownload
          className={classNames(iconCls, cssPrefix`download-icon`)}
          onClick={controls.downloadFile}
          data-testid={testId.downloadBtn}
        />
      </Popover>
    </div>
  );
};

export default Download;

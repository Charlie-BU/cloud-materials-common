import { useCConfigContext } from '../CConfigProvider';
import type { CStatusConfig, CStatusProps } from './interface';
import { getStatusConfig } from './config';

export const useBuildIn = () => {
  const { locale, getCPrefixCls } = useCConfigContext();

  const statusCls = getCPrefixCls('status');

  const defaultStatusMap: Record<string, CStatusConfig> = {
    Usable: { status: 'usable', text: locale.CStatus.usable },
    Error: { status: 'error', text: locale.CStatus.error },
    Warning: { status: 'warning', text: locale.CStatus.warning },
    Running: { status: 'running', text: locale.CStatus.running },
    Wait: { status: 'wait', text: locale.CStatus.wait },
    Disable: { status: 'disable', text: locale.CStatus.disable },
  };

  const mergeProps = (props: CStatusProps): CStatusProps => {
    const { statusMap: inputStatusMap, ...otherProps } = getStatusConfig();
    const statusMap = { ...defaultStatusMap, ...inputStatusMap, ...props.statusMap };
    return {
      ...otherProps,
      ...props,
      statusMap,
    };
  };
  return { defaultStatusMap, mergeProps, statusCls };
};

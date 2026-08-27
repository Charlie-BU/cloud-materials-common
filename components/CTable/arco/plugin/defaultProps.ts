import type { COperationMenuProps } from '../../../COperationMenu/interface';
import type { CNameInfoProps } from '../../../CNameInfo/interface';
import type { CAsyncSelectProps } from '../../../CAsyncSelect/interface';

export const defaultOperationMenuProps: Partial<COperationMenuProps> = {
  displayNum: 3,
};

export const defaultCellOperationMenuProps: Partial<COperationMenuProps> = {
  displayNum: 2,
  arcoButtonProps: {
    size: 'mini',
  },
  defaultButtonType: 'text',
  style: { paddingRight: 32 },
};

export const defaultCNameInfoProps: Partial<CNameInfoProps> = {
  idCopyable: true,
};

export const defaultCAsyncSelectProps: Partial<CAsyncSelectProps> = {
  style: {
    width: 240,
  },
};

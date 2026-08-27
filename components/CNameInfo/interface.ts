import type { CSSProperties } from 'react';
import type { LinkProps } from '@arco-design/web-react';
import type { CPopupEditProps } from '../CPopupEdit/interface';
import type { CCopyProps } from '../CCopy/interface';
import type { CEllipsisProps } from '../CEllipsis/interface';

/**
 * @title CNameInfoProps
 */
export interface CNameInfoProps {
  /** 自定义显示的 name */
  name?: string;
  /** 自定义显示的 ID */
  id?: string;

  /**
   * name是否可以copy
   * @defaultValue false
   */
  nameCopyable?: boolean;
  /**
   * id是否可以copy
   * @defaultValue false
   * */
  idCopyable?: boolean;
  /**
   * id是否可编辑（兼容部分老场景中，上面为Name下面为备注，且备注可修改的场景）
   * @defaultValue false
   */
  idEditable?: boolean;
  /** 编辑id的回调 */
  onIdEditOk?: CPopupEditProps['onOk'];
  /** 编辑id的规则 */
  idEditRules?: CPopupEditProps['rules'];
  /** 编辑id的弹窗placeholder */
  idEditPlaceholder?: string;

  /**
   * name是否可以编辑
   * @defaultValue false
   * */
  nameEditable?: boolean;
  /** 编辑name的回调 */
  onNameEditOk?: CPopupEditProps['onOk'];
  /** 编辑name的规则 */
  nameEditRules?: CPopupEditProps['rules'];
  /** 编辑name的弹窗placeholder */
  nameEditPlaceholder?: string;

  /** 点击name的回调 */
  onNameClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  /** 透传给 linkProps.href，配置了 href 就有 a 标签的效果，可以右键打开浏览器 tab */
  href?: string;
  arcoLinkProps?: Partial<Omit<LinkProps, 'onClick'>>;

  /**
   * 透传Link组件的disabled属性，该属性再nameRenderType='link'才生效
   */
  disableLink?: boolean;

  /**
   * nameRenderType name渲染的方式，有link和text可选
   * @defaultValue link
   */
  nameRenderType?: 'link' | 'text';

  /** 传入后缀，按照规范为CTag，protect-icon可以按需传入 */
  suffix?: React.ReactNode;

  /**
   * icon 是否hover出现，兼容部分希望copy和edit icon一直显示场景
   * @defaultValue true
   */
  isIconHoverDisplay?: boolean;

  /**
   * isIconHoverSqueezeWidth hover时icon是否会挤压已显示部分内容宽度，false：icon在未显示时也会占据宽度，hover时并不会挤压前置内容。true：icon在未显示时不会占据宽度，hover时会挤压前置内容
   * isIconHoverDisplay为false时，属性不生效
   * @defaultValue false
   */
  isIconHoverSqueezeWidth?: boolean;

  /** name弹出式编辑的props */
  nameCPopupEditProps?: Partial<CPopupEditProps>;
  /** name Copy的Props */
  nameCCopyProps?: Partial<CCopyProps>;
  /** name Ellipsis的props */
  nameCEllipsisProps?: Omit<CEllipsisProps, 'children' | 'content'>;

  /** id弹出式编辑的props */
  idCPopupEditProps?: Partial<CPopupEditProps>;
  /** id Copy的Props */
  idCCopyProps?: Partial<CCopyProps>;
  /** id Ellipsis的props */
  idCEllipsisProps?: Omit<CEllipsisProps, 'children' | 'content'>;

  /**
   * 透传给组件name的content节点的内联样式，用于修改文字样式，而不是布局
   */
  nameStyle?: CSSProperties;
  /**
   * 透传给组件id的content节点的内联样式，用于修改文字样式，而不是布局
   */
  idStyle?: CSSProperties;
  /** 透传给组件根节点的内联样式 */
  style?: CSSProperties;
  /** 挂到组件根节点的样式名 */
  className?: string | string[];
}

import type { CInfoSectionProps, ItemProps } from '../../CInfoSection/interface';
import type { ObjRecord } from '.';
import type { Tab, DetailPage, InfoSectionList } from '../core';

export type CallableReactNode<TabData extends ObjRecord, DetailData extends ObjRecord> =
  | ((option: {
      data: DetailData;
      infoSectionListModel: InfoSectionList<TabData, DetailData>;
      tab: Tab<TabData, DetailData>;
      detailPage: DetailPage<DetailData>;
    }) => React.ReactNode)
  | React.ReactNode;

export interface IInfoSectionItemProps<
  TabData extends ObjRecord,
  DetailData extends ObjRecord,
  GlobalScopeType extends ObjRecord = any,
> extends Omit<ItemProps, 'label' | 'content' | 'children' | 'hidden' | 'visible' | 'extraContent'> {
  /** 标签 */
  label?: CallableReactNode<TabData, DetailData>;
  /** 标签对应的内容 支持通用内置组件 */
  content?:
    | ItemProps['content']
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => ItemProps['content']);
  /** 子元素 */
  children?: CallableReactNode<TabData, DetailData>;
  /**
   * 是否隐藏该项，不占位
   * @defaultValue false
   */
  hidden?:
    | ItemProps['hidden']
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => ItemProps['hidden']);
  /**
   * 是否可见，占位
   * @defaultValue true
   */
  visible?:
    | ItemProps['visible']
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => ItemProps['visible']);
  /** content右侧内容，包含内置组件 */
  extraContent?:
    | ItemProps['extraContent']
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => ItemProps['extraContent']);
  /**
   * 每一个item的loading等状态
   */
  itemStatus?:
    | IItemStatus
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => IItemStatus);
}

export interface IInfoSectionDataProps<
  TabData extends ObjRecord,
  DetailData extends ObjRecord,
  GlobalScopeType extends ObjRecord = any,
> extends Pick<CInfoSectionProps, 'moduleEditor' | 'layout' | 'colNumber' | 'labelWidth' | 'className'> {
  /** 支持自动分割或者手动分割 */
  infoItemList?: IInfoSectionItemProps<TabData, DetailData, GlobalScopeType>[];
  /**
   * 是否需要自动分割
   */
  needAutoSplit?: boolean;
  /** 模块编辑 */
  onModuleEditorClick?:
    | CInfoSectionProps['onModuleEditorClick']
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => CInfoSectionProps['onModuleEditorClick']);
  /** 支持自定义标题 */
  title?: CallableReactNode<TabData, DetailData>;
  /** 分割好的数据 */
  splitItemList?: ItemProps[][];
  hidden?:
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => boolean)
    | boolean;
  visible?:
    | ((option: {
        data: DetailData;
        infoSectionListModel: InfoSectionList<TabData, DetailData>;
        tab: Tab<TabData, DetailData>;
        detailPage: DetailPage<DetailData, GlobalScopeType>;
      }) => boolean)
    | boolean;
}

/**
 * @title IInfoSectionListProps
 */
export interface IInfoSectionListProps<
  TabData extends ObjRecord,
  DetailData extends ObjRecord,
  GlobalScopeType extends ObjRecord = any,
> {
  /** @zh 传入列表数据渲染 */
  listData: IInfoSectionDataProps<TabData, DetailData, GlobalScopeType>[];
  /**
   *  @zh 列数，支持一排一、一排二、一排三、一排四。
   * @defaultValue 2
   */
  colNumber?: CInfoSectionProps['colNumber'];
  /** @zh 整个容器区样式对象，可覆盖原容器样式 */
  style?: CInfoSectionProps['style'];
  /** @zh 内容区样式对象，可覆盖原内容区样式 */
  sectionStyle?: CInfoSectionProps['sectionStyle'];
  /**
   * @zh 定义 infoItemList 按竖或是横排列
   * @defaultValue row
   */
  direction?: CInfoSectionProps['direction'];
  layout?: CInfoSectionProps['layout'];
  itemStyle?: CInfoSectionProps['itemStyle'];
  labelStyle?: CInfoSectionProps['labelStyle'];
  contentStyle?: CInfoSectionProps['contentStyle'];
  labelWidth?: CInfoSectionProps['labelWidth'];
  auto?: CInfoSectionProps['auto'];
  className?: CInfoSectionProps['className'];
  arcoLabelColProps?: CInfoSectionProps['arcoLabelColProps'];
  arcoContentColProps?: CInfoSectionProps['arcoContentColProps'];
  arcoRowProps?: CInfoSectionProps['arcoRowProps'];
}

export interface IItemStatus {
  /**
   *加载状态
   */
  loading?: boolean;
  /**
   * 是否发生错误
   */
  hasError?: boolean;
  /**
   * 点击重新加载按钮事件
   * @returns
   */
  onReload?: () => void;
}

export type DefineInfoSectionListConfig = <
  TabData extends ObjRecord,
  DetailData extends ObjRecord,
  GlobalScopeType extends ObjRecord = any,
>(
  config: IInfoSectionListProps<TabData, DetailData, GlobalScopeType>,
) => IInfoSectionListProps<TabData, DetailData, GlobalScopeType>;

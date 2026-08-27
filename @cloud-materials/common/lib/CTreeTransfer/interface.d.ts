import type { TransferProps, TreeNodeProps } from '@arco-design/web-react';
import type { NodeProps, TreeProps } from '@arco-design/web-react/es/Tree/interface';
import type React from 'react';
export declare enum TransferCheckStrategy {
    all = "all",
    parent = "parent",
    child = "child"
}
export declare enum LoadType {
    remoteExpand = "remoteExpand"
}
export interface TreeTransferDataType extends TreeNodeProps {
    title: string | React.ReactNode;
    key: string;
    isLeaf?: boolean;
    children?: TreeTransferDataType[];
    isCheckAll?: boolean;
    extraInfo?: {
        [key: string]: string;
    };
    hasMore?: boolean | 'error';
    checked?: boolean;
    icon?: React.ReactNode;
    nodeCheckAllExtra?: string | React.ReactNode;
    isClickCheckAll?: boolean;
    childrenData?: TreeTransferDataType[];
    [key: string]: unknown;
}
export type CTreeTransferProps = LocalTreeTransferProps | LoadMoreTreeProps | RemoteExpandTreeProps;
interface BaseProps {
    /**
     * @zh 穿梭框左侧数据
     */
    treeData: TreeTransferDataType[];
    /**
     * @zh 穿梭框的 loading 状态
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * @zh 左侧 Header 的自定义额外操作，默认在顶部右侧展示
     */
    extraSourceAction?: React.ReactNode;
    /**
     * @zh 右侧 Header 的自定义额外操作，默认在顶部右侧展示
     */
    extraTargetAction?: React.ReactNode;
    /**
     * @zh 可能存在的附加信息，选中节点时会将其加载 targetNode 中
     */
    extraInfo?: {
        [key: string]: any;
    };
    /**
     * @zh 在左侧列表的 checkbox 状态需特殊处理的情况时，此时可传入该参数受控控制左侧列表的选中状态
     */
    checkInfo?: {
        checkedKeys: string[];
        halfCheckedKeys?: string[];
    };
    /**
     * @zh 左侧搜索框的 placeholder，默认: 请搜索
     */
    sourceSearchPlaceholder?: string;
    /**
     * @zh 右侧搜索框的 placeholder，默认: 请搜索
     */
    targetSearchPlaceholder?: string;
    /**
     * @zh 左侧无数据时的自定义渲染能力，为 false 时则不渲染空状态
     * @defaultValue true
     */
    sourceEmptyContent?: React.ReactElement | boolean;
    /**
     * @zh 右侧无数据时的自定义渲染能力,为 false 时则不渲染空状态
     * @defaultValue false
     */
    targetEmptyContent?: React.ReactElement | boolean;
    /**
     * @zh  左侧 Item 自定义渲染
     */
    sourceItemRender?: (item: NodeProps) => React.ReactNode;
    /**
     * @zh  右侧 Item 自定义渲染
     */
    targetItemRender?: (item: NodeProps, treeData?: TreeTransferDataType[]) => React.ReactNode;
    /**
     * @zh 外部传入 search 函数。为空时搜索将进行本地字符串匹配
     */
    onSearch?: (searchString: string, type: 'source' | 'target') => void;
    /**
     * @zh 左侧 Header 自定义渲染方法
     */
    sourceHeader?: (onSelectAll: (checked: boolean) => void, checkAllStatus: {
        checked: boolean;
        indeterminate: boolean;
    }) => React.ReactNode;
    /**
     * @zh  右侧 Header 自定义渲染方法
     */
    targetHeader?: () => React.ReactNode;
    /**
     * @zh 右侧 Header 自定义 title
     */
    targetTitle?: string | React.ReactNode;
    /**
     * @zh  Transfer 的更多属性配置
     */
    arcoTransferProps?: Pick<TransferProps, 'disabled' | 'className' | 'listStyle' | 'showSearch'>;
    /**
     * @zh  左侧 Tree 的更多属性配置
     */
    arcoSourceTreeProps?: Omit<TreeProps, 'onCheck' | 'onExpand' | 'onSelect' | 'loadMore' | 'treeData'>;
    /**
     * @zh  右侧 Tree 的更多属性配置
     */
    arcoTargetTreeProps?: Omit<TreeProps, 'onCheck' | 'onExpand' | 'onSelect' | 'loadMore' | 'treeData'>;
    /**
     * @zh 选中模式，对应 arcoTree.checkedStrategy 参数
     */
    checkedStrategy?: TransferCheckStrategy;
    /**
     * @zh 树形穿梭框模式，目前支持 LoadType.remoteExpand
     */
    loadType?: LoadType.remoteExpand;
    /**
     * 当点击反选某节点时是否触发移除该节点，由外层确定
     */
    checkNodeRemove?: (isParentCheck: boolean, targetNode: NodeProps) => Promise<boolean>;
    /**
     * @zh 子节点列表为空时是否显示加载更多
     */
    isEmptyShowLoadMore?: boolean;
    /**
     * loading 的文案提示
     */
    loadingTitle?: string | React.ReactNode;
    /**
     * @zh 选中后右侧自动展开项
     */
    isExpandTarget?: boolean;
    /**
     * @zh 选中后左侧节点自动展开
     */
    isAutoExpandSource?: boolean;
    /**
     * @zh 是否开启 fetcher 的竞态处理
     */
    enableRaceCondition?: boolean;
    /**
     * 左侧 Header 自定义文案
     */
    sourceHeaderCustomText?: {
        checkAllTitle?: string | ((searchStr: string) => string);
    };
    /**
     * disable 状态的 Node 在全选时是否可选中
     */
    isDisableItemNotCheckable?: boolean;
}
/**
 * @title 本地加载模式 Props
 */
export interface LocalTreeTransferProps extends BaseProps {
    /**
     * @zh 当 hasLoadMore 为 false 或 undefined 时，组件为本地加载模式
     * @defaultValue false
     */
    hasLoadMore?: false;
    /**
     * @zh 已选中项的 Value 值
     */
    value?: string[];
    /**
     * @zh 右侧显示当前已选择项数量，未传入时默认为所有父子节点均计算
     */
    totalCheckedCountInLocal?: number;
    /**
     * 选中项发生修改时触发的 change 方法
     */
    onChange: (newValue: string[]) => void;
}
/**
 * @title 懒加载模式 Props
 */
export interface LoadMoreTreeProps extends BaseProps {
    /**
     * @zh 当 hasLoadMore 为 true 时，组件为懒加载模式
     * @defaultValue false
     */
    hasLoadMore: true;
    /**
     * @zh source 首层是否还有加载更多节点
     * @defaultValue false
     */
    firstLevelHasMore?: boolean | 'error';
    /**
     * @zh target 首层是否还有加载更多节点
     * @defaultValue false
     */
    targetFirstLevelHasMore?: boolean | 'error';
    /**
     * @zh 去除一个全选节点下的子节点时的提示相关信息
     */
    removeChildConfirmInfo?: {
        isShowConfirm: boolean;
        title?: string;
        content?: string;
    };
    /**
     * @zh 已选节点的信息，为树形结构
     */
    targetTreeData: TreeTransferDataType[];
    /**
     * 选中项发生修改时触发的 change 方法
     */
    onChange: (newData: TreeTransferDataType[]) => void;
    /**
     * @zh 右侧显示当前已选择项数量，在懒加载模式下必须传入才会显示选中项数量
     */
    totalCheckedCount?: number;
    /**
     * @zh 左侧点击展开 or 加载更多
     */
    onSourceLoadMore?: (parentKeys: string[]) => Promise<void>;
    /**
     * @zh 右侧点击展开 or 加载更多
     */
    onTargetLoadMore?: (parentKeys: string[]) => Promise<void>;
}
export interface RemoteExpandTreeProps extends BaseProps {
    hasLoadMore?: false;
    /**
     * @zh 树形穿梭框模式，目前支持 LoadType.remoteExpand
     */
    loadType: LoadType.remoteExpand;
    /**
     * @zh 已选节点的信息，为树形结构
     */
    targetTreeData: TreeTransferDataType[];
    /**
     * 选中项发生修改时触发的 change 方法
     */
    onChange: (newData: TreeTransferDataType[]) => void;
    /**
     * 展开操作时触发，返回展开后的该节点数据及其所有子节点信息
     */
    onExpand: (expandNode: TreeTransferDataType) => Promise<TreeTransferDataType>;
}
export interface CTreeTransferHooksProps {
    hasLoadMore?: boolean;
    treeData: TreeTransferDataType[];
    localValue?: string[];
    loadMoreValue?: TreeTransferDataType[];
    checkedStrategy?: TransferCheckStrategy;
    onSearch?: (searchString: string, type: 'source' | 'target') => void;
    onLocalChange?: (newValue: string[]) => void;
    onLoadMoreChange?: (newData: TreeTransferDataType[]) => void;
    onSourceLoadMore?: (parentKeys: string[]) => Promise<void>;
    onTargetLoadMore?: (parentKeys: string[]) => Promise<void>;
    extraInfo?: any;
    removeChildConfirmInfo?: {
        isShowConfirm: boolean;
        title?: string;
        content?: string;
    };
    checkInfo?: {
        checkedKeys: string[];
        halfCheckedKeys?: string[];
    };
    loadType?: LoadType;
    /**
     * 展开操作时触发，返回展开后的该节点数据及其所有子节点信息
     */
    onExpand?: (expandNode: TreeTransferDataType) => Promise<TreeTransferDataType>;
    onChange?: (newData: TreeTransferDataType[]) => void;
    value?: TreeTransferDataType[];
    checkNodeRemove?: (isParentCheck: boolean, targetNode: NodeProps) => Promise<boolean>;
    isAutoExpandTarget?: boolean;
    /**
     * 是否开启 fetcher 的竞态处理
     */
    enableRaceCondition?: boolean;
    /**
     * disable 状态的 Node 在全选时是否可选中
     */
    isDisableItemNotCheckable?: boolean;
}
export type FlattenTreeMap = Map<string, TreeTransferDataType>;
export interface CheckedStatus {
    checked: boolean;
    indeterminate: boolean;
}
export {};

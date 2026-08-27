import type { FlattenTreeMap, TreeTransferDataType } from './interface';

export class TreeTransferHelper {
  sourceFlattenMap: FlattenTreeMap = new Map();

  targetFlattenMap: FlattenTreeMap = new Map();
  sourceData: TreeTransferDataType[] = [];
  // 保存一份 target 树形结构，便于搜索时使用
  targetData: TreeTransferDataType[] = [];

  // 一份备份的 sourceTree 数据，在设置了自动展开时根据其判断是否为新加载数据
  oldSourceFlattenMap: FlattenTreeMap = new Map();

  sourceSearchStr = '';

  targetSearchStr = '';
  /**
   * 保存 Loading 状态的 Map
   */
  loadingMap: { [key: string]: boolean } = {};

  setSourceData = (data: TreeTransferDataType[]) => {
    this.sourceData = data;
  };
  setSourceFlattenMap = (map: FlattenTreeMap) => {
    this.sourceFlattenMap = map;
  };

  setOldSourceFlattenMap = (map: FlattenTreeMap) => {
    this.oldSourceFlattenMap = map;
  };

  setTargetFlattenMap = (map: FlattenTreeMap) => {
    this.targetFlattenMap = map;
  };
  setTargetData = (data: TreeTransferDataType[]) => {
    this.targetData = data;
  };

  setSourceSearchStr = (str: string) => {
    this.sourceSearchStr = str;
  };
  setTargetSearchStr = (str: string) => {
    this.targetSearchStr = str;
  };

  // loadMore 按钮的加载状态。根据其判断是否要让按钮显示 loading 状态
  setGetDataLoading = (loadingKey: string | number, isLoading: boolean) => {
    this.loadingMap = {
      ...this.loadingMap,
      [loadingKey]: isLoading,
    };
  };

  getDataLoading = (loadingKey: string) => {
    return this.loadingMap?.[loadingKey];
  };
}

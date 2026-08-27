import type { FlattenTreeMap, TreeTransferDataType } from './interface';
export declare class TreeTransferHelper {
    sourceFlattenMap: FlattenTreeMap;
    targetFlattenMap: FlattenTreeMap;
    sourceData: TreeTransferDataType[];
    targetData: TreeTransferDataType[];
    oldSourceFlattenMap: FlattenTreeMap;
    sourceSearchStr: string;
    targetSearchStr: string;
    /**
     * 保存 Loading 状态的 Map
     */
    loadingMap: {
        [key: string]: boolean;
    };
    setSourceData: (data: TreeTransferDataType[]) => void;
    setSourceFlattenMap: (map: FlattenTreeMap) => void;
    setOldSourceFlattenMap: (map: FlattenTreeMap) => void;
    setTargetFlattenMap: (map: FlattenTreeMap) => void;
    setTargetData: (data: TreeTransferDataType[]) => void;
    setSourceSearchStr: (str: string) => void;
    setTargetSearchStr: (str: string) => void;
    setGetDataLoading: (loadingKey: string | number, isLoading: boolean) => void;
    getDataLoading: (loadingKey: string) => boolean;
}

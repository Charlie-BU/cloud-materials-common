import { define, observable } from '@formily/reactive';

import type { ObjRecord, IInfoSectionDataProps } from '../../../types';
import { InfoSectionItem } from './InfoSectionItem';
import type { InfoSectionList } from './InfoSectionList';

export class InfoSection<TabData extends ObjRecord, DetailData extends ObjRecord> {
  /**
   * 单个InfoSection的配置参数
   */
  options: IInfoSectionDataProps<TabData, DetailData>;

  /**
   * 每一项的配置
   */
  infoItemList?: InfoSectionItem<TabData, DetailData>[];

  /**
   *
   * @param options
   */

  infoSectionListModel: InfoSectionList<TabData, DetailData>;

  constructor(
    options: IInfoSectionDataProps<TabData, DetailData>,
    infoSectionListModel: InfoSectionList<TabData, DetailData>,
  ) {
    this.makeObservable();
    this.options = {
      needAutoSplit: true,
      hidden: false,
      visible: true,
      ...options,
    };
    this.infoSectionListModel = infoSectionListModel;
    this.initInfoItemList();
  }

  private makeObservable() {
    define(this, {
      options: observable,
      infoItemList: observable,
      infoSectionListModel: observable,
    });
  }

  /**
   * 初始化Section每一项
   */
  private initInfoItemList() {
    this.infoItemList = this.options?.infoItemList?.map(item => {
      return new InfoSectionItem(item, this, this.infoSectionListModel);
    });
  }
}

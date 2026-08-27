import { define, observable } from '@formily/reactive';

import type { ObjRecord, IInfoSectionListProps } from '../../../types';
import { InfoSection } from './InfoSection';

export class InfoSectionList<TabData extends ObjRecord, DetailData extends ObjRecord> {
  /** 基本配置 */
  options: IInfoSectionListProps<TabData, DetailData>;
  /** section数组对象 */
  sections: InfoSection<TabData, DetailData>[] = [];

  constructor(options: IInfoSectionListProps<TabData, DetailData>) {
    this.makeObservable();
    this.options = options;
    this.initDataFromConfig();
  }

  private makeObservable() {
    define(this, {
      options: observable,
      sections: observable,
    });
  }

  private initDataFromConfig() {
    (this.options?.listData || []).forEach(section => {
      this.sections.push(new InfoSection<TabData, DetailData>(section, this));
    });
  }
}

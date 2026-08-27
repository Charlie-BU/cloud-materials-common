import React from 'react';
import { observer } from '@formily/react';
import cls from 'classnames';

import InfoSection from '../../../../CInfoSection';
import type { InfoSectionList as InfoSectionListModel } from '../../../core';
import { useCreateInnerBasicInfoSectionList, BasicInfoSectionListProvider, useDetailPage } from '../../../react';
import { runCallable, defineInfoSectionListConfig } from '../../../shared';
import type { IInfoSectionListProps, ObjRecord, IItemStatus, DefineInfoSectionListConfig } from '../../../types';
import { InfoSectionItemLoading } from '../InfoSectionItemLoading';
import { useCConfigContext } from '../../../../CConfigProvider';

const { List } = InfoSection;

const InnerBasicDetailInfoSection: React.FC<{ infoSectionListModel: InfoSectionListModel<ObjRecord, ObjRecord> }> =
  observer(({ infoSectionListModel }) => {
    const { getCPrefixCls } = useCConfigContext();
    const cssRoot = getCPrefixCls('detail-page-info-section');
    const detailPage = useDetailPage();
    const runCallableProps = {
      data: detailPage?.data,
      infoSectionListModel,
      tab: detailPage?.getActiveTab(),
      detailPage,
    };
    const dom = (
      <BasicInfoSectionListProvider infoSectionList={infoSectionListModel}>
        <List
          {...infoSectionListModel?.options}
          listData={infoSectionListModel?.sections?.map(section => {
            const infoItemList = (section?.infoItemList || [])?.map(item => {
              const itemStatus: IItemStatus = runCallable(item?.options?.itemStatus, runCallableProps);

              const getItemContent = () => {
                if (itemStatus?.loading) {
                  return <InfoSectionItemLoading {...itemStatus} />;
                } else if (itemStatus?.hasError) {
                  return <InfoSectionItemLoading {...itemStatus} />;
                }
                return runCallable(item?.options?.content, runCallableProps);
              };
              return {
                enableEllipsis: true,
                ...item?.options,
                label: runCallable(item?.options?.label, runCallableProps),
                content: getItemContent(),
                children: runCallable(item?.options?.children, runCallableProps),
                hidden: runCallable(item?.options?.hidden, {
                  data: detailPage?.data,
                  infoSectionListModel,
                  tab: detailPage?.getActiveTab(),
                  detailPage,
                }),
                visible: runCallable(item?.options?.visible, runCallableProps),
                extraContent:
                  !itemStatus?.hasError &&
                  !itemStatus?.loading &&
                  runCallable(item?.options?.extraContent, runCallableProps),
              };
            });
            return {
              ...section?.options,
              hidden: runCallable(section?.options?.hidden, {
                data: detailPage?.data,
                infoSectionListModel,
                tab: detailPage?.getActiveTab(),
                detailPage,
              }),
              visible: runCallable(section?.options?.visible, {
                data: detailPage?.data,
                infoSectionListModel,
                tab: detailPage?.getActiveTab(),
                detailPage,
              }),
              title: runCallable(section?.options?.title, {
                data: detailPage?.data,
                infoSectionListModel,
                tab: detailPage?.getActiveTab(),
                detailPage,
              }),
              infoItemList,
              onModuleEditorClick: runCallable(section?.options?.onModuleEditorClick, {
                data: detailPage?.data,
                infoSectionListModel,
                tab: detailPage?.getActiveTab(),
                detailPage,
              }),
            };
          })}
          className={cls(cssRoot, infoSectionListModel?.options?.className)}
        />
      </BasicInfoSectionListProvider>
    );
    return dom;
  });

interface Props {
  config: IInfoSectionListProps<any, any>;
}
export const BasicDetailInfoSectionList: React.FC<Props> & {
  defineConfig: DefineInfoSectionListConfig;
} = props => {
  const infoSectionListModel = useCreateInnerBasicInfoSectionList(props.config);
  return <InnerBasicDetailInfoSection infoSectionListModel={infoSectionListModel} />;
};

BasicDetailInfoSectionList.defineConfig = defineInfoSectionListConfig;
BasicDetailInfoSectionList.displayName = 'BasicDetailInfoSectionList';

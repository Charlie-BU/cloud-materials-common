import React from 'react';
import type { DetailPage, Tab } from '../../../core';
import type { ObjRecord, ErrorConfigType, IBtnProps } from '../../../types';
import type { CResultProps } from '../../../../CLoadingV2/interface';
interface Props {
    title?: React.ReactNode;
    type: ErrorConfigType;
    detailPage: DetailPage<ObjRecord>;
    activeTab?: Tab<ObjRecord, ObjRecord>;
    reloadBtnProps?: IBtnProps;
    goBackBtnProps?: IBtnProps;
    cLoadingProps?: CResultProps;
}
export declare const LoadingError: React.FC<Props>;
export {};

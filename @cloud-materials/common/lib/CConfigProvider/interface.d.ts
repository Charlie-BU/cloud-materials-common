/// <reference types="react" />
import type { ConfigProviderProps } from '@arco-design/web-react';
import type { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface';
import type { IFormLayoutProps } from '@storage-fe/formily-arco/es/FormLayout';
import type { InfoPreviewProps } from '../CConfigPreview/interface';
import type { CDrawerArcoFormProps, CDrawerDetailProps, CDrawerForm, CDrawerFormStep } from '../CDrawer';
import type { CDrawerProps } from '../CDrawer/interface';
import type { CFeeCalculatorProps } from '../CFeeCalculator/interface';
import type { CInfoSectionListProps, CInfoSectionProps, ItemProps } from '../CInfoSection/interface';
import type { CModalArcoFormProps, CModalForm, CModalFormStep, CModalTableProps } from '../CModal';
import type { CModalProps } from '../CModal/interface';
import type { CCascaderSearchProps } from '../CSearch/interface';
import type { CSideBarProps } from '../CSideBar/interface';
import type { CTableGlobalProps } from '../CTable';
import type { LoggerFactory, OnLog } from '../_factory/Logger';
import type { CLocale } from '../locales/default';
import type { CPopupEditProps } from '../CPopupEdit/interface';
import type { CNameInfoProps } from '../CNameInfo/interface';
export type RequiredPick<T, K extends keyof T> = {
    [P in K]-?: T[P];
};
export type RequiredPartial<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export interface CComponentConfig extends ComponentConfig {
    CInfoSection?: Partial<CInfoSectionProps>;
    'CInfoSection.List'?: Partial<CInfoSectionListProps>;
    'CInfoSection.Item'?: Partial<ItemProps>;
    CModal?: CModalProps;
    /** 默认继承 CModal */
    'CModal.ArcoForm'?: Partial<CModalArcoFormProps>;
    'CModal.Form'?: Partial<React.ComponentProps<typeof CModalForm>>;
    'CModal.FormStep'?: Partial<React.ComponentProps<typeof CModalFormStep>>;
    'CModal.Table'?: Partial<CModalTableProps>;
    /** 默认继承 CDrawer */
    CDrawer?: Partial<CDrawerProps>;
    'CDrawer.ArcoForm'?: Partial<CDrawerArcoFormProps>;
    'CDrawer.Form'?: Partial<React.ComponentProps<typeof CDrawerForm>>;
    'CDrawer.FormStep'?: Partial<React.ComponentProps<typeof CDrawerFormStep>>;
    'CDrawer.Detail'?: Partial<CDrawerDetailProps>;
    CSideBar?: Partial<CSideBarProps>;
    CForm?: Partial<IFormLayoutProps> & {
        /** 是否开启 effect中fetchData 和 异步validator 的竞态处理 */
        enableRaceCondition?: boolean;
    };
    CTable?: Partial<CTableGlobalProps>;
    'CSearch.CCascaderSearch'?: Pick<CCascaderSearchProps, 'prefixAutoWidth'>;
    CFeeCalculator?: Partial<CFeeCalculatorProps>;
    CConfigPreview?: Partial<{
        infoPreview: Partial<InfoPreviewProps>;
    }>;
    CDetailPage?: {
        enableRaceCondition?: boolean;
    };
    CTreeTransfer?: {
        enableRaceCondition?: boolean;
    };
    CPopupEdit?: Partial<CPopupEditProps>;
    CNameInfo?: Partial<CNameInfoProps>;
}
/**
 * 这部分的 props 是外部既能传入，内部也能获取的
 */
interface CommonProps extends ConfigProviderProps {
    /**
     * @zh 设置语言包
     * @en Language package setting
     */
    locale?: CLocale;
    /**
     * @zh 物料组件类名前缀
     * @en Material ClassName prefix
     * @defaultValue c-m
     */
    cPrefixCls?: string;
    /**
     * 自动透传上一个CConfigProvider的props
     * @defaultValue true
     */
    keepPrevious?: boolean;
    /**
     * 日志打印事件，当组件内部有错误或其它信息时，会打印出来
     */
    onLog?: OnLog;
    cComponentConfig?: Partial<CComponentConfig>;
    storage?: {
        sessionStorage: Storage;
        localStorage: Storage;
    };
}
/**
 * @title CConfigProviderProps
 */
export interface CConfigProviderProps extends CommonProps {
    /**
     * 自动透传上一个CConfigProvider的props
     * @defaultValue true
     */
    keepPrevious?: boolean;
    /**
     * 日志打印事件，当组件内部有错误或其它信息时，会打印出来
     */
    onLog?: OnLog;
}
/**
 * @title CConfigContextValue
 */
export interface CConfigContextValue extends RequiredPartial<CommonProps, 'locale' | 'storage'> {
    /**
     * 获取组件类名前缀
     * @param componentName 组件名
     * @param customPrefix 自定义前缀 默认为 cPrefixCls 对应的值
     * @returns
     */
    getCPrefixCls: (componentName: string, customPrefix?: string) => string;
    /**
     * 获取组件类名前缀
     * @param componentName 组件名
     * @param customPrefix 自定义前缀 默认为 cPrefixCls 对应的值
     * @returns
     */
    useCssPrefix: (componentName: string, customPrefix?: string) => (string: TemplateStringsArray, ...params: any[]) => string;
    /**
     * 替换语言资源中 {name} 模板值
     * @param locale 语言
     * @param replaceParams 替换值
     * @returns
     */
    formatLocale: (locale: string, replaceParams: Record<string, string | number>) => string;
    createLogger: LoggerFactory;
}
export {};

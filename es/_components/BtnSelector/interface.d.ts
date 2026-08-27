import type { ReactNode, ReactText } from 'react';
import type { CCheckboxGroupProps, CCheckboxGroupOption } from '../../CCheckbox/interface';
import type { CTagProps } from '../../CTag/interface';
export interface BtnSelectorContentProps {
    textLineType: CCheckboxGroupProps<ReactText>['textLineType'];
    option?: CCheckboxGroupOption<ReactText>;
    iconLayout?: CCheckboxGroupProps<ReactText>['iconLayout'];
    horizontalLayout?: CCheckboxGroupProps<ReactText>['horizontalLayout'];
}
export interface BtnTagProps {
    /**
     * @zh 角标
     * @en tag
     */
    tag?: ReactNode;
    /**
     * @zh 角标的样式配置
     * @en tag cssproperties config
     */
    CTagProps?: Omit<CTagProps, 'shape' | 'type'>;
}

import React from 'react';
import type { CGuideProps } from './interface';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const testId: {
    container: string;
};
declare function CGuide(props: CGuideProps): JSX.Element;
declare namespace CGuide {
    var displayName: string;
    var CGuideFoldButton: React.FC<import("./interface").CGuideFoldButtonProps & Partial<{
        htmlType?: "submit" | "button" | "reset" | undefined;
    } & import("@arco-design/web-react/es/Button/interface").BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, "type" | "className" | "onClick"> & {
        href: string;
        target?: string | undefined;
        anchorProps?: React.HTMLProps<HTMLAnchorElement> | undefined;
    } & Omit<React.AnchorHTMLAttributes<any>, "type" | "className" | "onClick">>>;
}
export default CGuide;

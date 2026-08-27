import React from 'react';
declare const Group: React.ForwardRefExoticComponent<import("@arco-design/web-react").ButtonGroupProps & React.RefAttributes<unknown>>;
declare const CButtonComponent: React.ForwardRefExoticComponent<Partial<{
    htmlType?: "submit" | "button" | "reset" | undefined;
} & import("@arco-design/web-react/es/Button/interface").BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, "type" | "className" | "onClick"> & {
    href: string;
    target?: string | undefined;
    anchorProps?: React.HTMLProps<HTMLAnchorElement> | undefined;
} & Omit<React.AnchorHTMLAttributes<any>, "type" | "className" | "onClick">> & React.RefAttributes<any>> & {
    __BYTE_BUTTON: boolean;
    Group: typeof Group;
};
export default CButtonComponent;

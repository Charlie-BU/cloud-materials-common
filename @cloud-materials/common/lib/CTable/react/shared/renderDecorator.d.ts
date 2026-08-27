import React from 'react';
import type { Table, JSXComponent, ComponentProps } from '../../core';
export declare const renderDecorator: (table: Table, children: React.ReactNode, options: {
    scope: string;
    decoratorType?: JSXComponent<any> | undefined;
    decoratorProps?: import("../../core").R | undefined;
    renderOptions?: any;
}) => JSX.Element;

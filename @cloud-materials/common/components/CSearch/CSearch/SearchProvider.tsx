import React from 'react';
import type { ReactNode } from 'react';
import createBuiltInComponent from '../../_factory/builtInComponent';
import { components } from '../components/Component';

const SearchProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default createBuiltInComponent(SearchProvider, components);

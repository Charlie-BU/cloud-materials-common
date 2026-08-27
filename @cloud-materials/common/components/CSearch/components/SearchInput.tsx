import { Input, Popover } from '@arco-design/web-react';
import type { RefInputType, InputProps } from '@arco-design/web-react/es/Input';
import React, { useEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';

const SearchInput = (props: InputProps) => {
  const [popContent, setPopContent] = useState<string | null>(null);
  const { getCPrefixCls } = useCConfigContext();
  const componentCls = getCPrefixCls('search-component-input-popover');
  const ref = useRef<RefInputType>(null);
  const handleResize = (val?: string) => {
    if (ref.current) {
      const node = ref.current.dom;
      const process = () => {
        if (node.scrollWidth > node.offsetWidth) {
          setPopContent(val ?? null);
        } else {
          setPopContent(null);
        }
      };
      // 自适应宽度时，scrollWidth和offsetWidth的改变不在同一次event loop中
      if (props.autoWidth) {
        setTimeout(() => process(), 0);
      } else {
        process();
      }
    }
  };
  useEffect(() => {
    if (props.defaultValue || props.value) {
      handleResize(props.defaultValue || props.value);
    }
  }, []);
  return (
    <Popover content={popContent} position="bottom" className={componentCls}>
      <Input
        {...props}
        ref={ref}
        onChange={(v, e) => {
          handleResize(v);
          props.onChange?.(v, e);
        }}
      />
    </Popover>
  );
};

export default SearchInput;

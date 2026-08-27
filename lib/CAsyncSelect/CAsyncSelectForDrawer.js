// import React, { useState } from 'react';
// import { CAsyncSelectForDrawerProps } from './interface';
// import classNames from 'classnames';
// import { Select } from '@arco-design/web-react';
// import { IconDrawerSelectDefault, IconDrawerSelectActive } from '@arco-design/iconbox-react-cloud';
// import { cssPrefix, cssRoot } from './dataCy';
// const CAsyncSelectForDrawer: React.FC<CAsyncSelectForDrawerProps> = props => {
//   const { style, className, suffixClick } = props;
//   //控制drawer模式特定icon的type类型的state，仅在isProviderForDrawer为true的情况下生效
//   const [suffixDrawerIconType, setSuffixDrawerIconType] = useState<'open' | 'close' | ''>('close');
//   const customSuffixIcon = () => {
//     return (
//       <span className={cssPrefix`suffix-icon`}>
//         {suffixDrawerIconType === 'open' ? <IconDrawerSelectActive /> : <IconDrawerSelectDefault />}
//       </span>
//     );
//   };
//   const onFocus = val => {
//     props.onFocus?.(val);
//     setSuffixDrawerIconType('open');
//   };
//   const onBlur = val => {
//     props.onBlur?.(val);
//     setSuffixDrawerIconType('close');
//   };
//   return (
//     <div onClick={suffixClick}>
//       <Select
//         style={style}
//         className={classNames(cssRoot, className)}
//         suffixIcon={customSuffixIcon()}
//         {...props}
//         onFocus={onFocus}
//         onBlur={onBlur}
//         notFoundContent={null}
//       />
//     </div>
//   );
// };
// export default CAsyncSelectForDrawer;
//# sourceMappingURL=CAsyncSelectForDrawer.js.map
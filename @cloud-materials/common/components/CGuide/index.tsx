import type { CSSProperties } from 'react';
import React, { useRef, useEffect, useContext } from 'react';
import type { CGuideProps, CGuideStepProps } from './interface';
import classNames from 'classnames';
import { Button } from '@arco-design/web-react';
import CGuideFoldButton from './CGuideFoldButton';
import { CConfigContext } from '../CConfigProvider';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';

export const cssPrefix = classNamePrefixFactory('guide');
export const testId = {
  container: cssPrefix`container`,
};
interface ContainerPropsType {
  isFold: boolean;
  style?: CSSProperties;
  className?: string | string[];
}
const Container: React.FC<ContainerPropsType> = props => {
  const { isFold, style, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  const height = useRef<number>();
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('guide');
  const calculateHeight = () => {
    const children: HTMLCollection = ref?.current?.children || ({} as HTMLCollection);
    const heightList = [];
    for (let i = 0; i < children?.length; i++) {
      heightList.push((children[i] as HTMLDivElement).clientHeight);
    }
    const height = Math.max(...heightList);
    return height;
  };

  const visibleStyles = isFold
    ? {
        height: 0,
        opacity: 0,
      }
    : {
        height: 'unset',
        opacity: '1',
      };

  useEffect(() => {
    height.current = calculateHeight();
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(cssPrefix``, className, { [cssPrefix`isFold`]: isFold })}
      style={{ ...style, ...visibleStyles }}
      data-testid={testId.container}
    >
      {props.children}
    </div>
  );
};
function CGuide(props: CGuideProps) {
  const { steps, style, className, isFold = false } = props;
  const { useCssPrefix } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('guide');
  return (
    <>
      <Container isFold={isFold} style={{ ...style }} className={className}>
        {steps?.map((step: CGuideStepProps, index: number) => {
          const { title, introduction, operationButton, operationRender } = step;
          return (
            <div className={cssPrefix`step-item`} key={index}>
              <div className={cssPrefix`step-item-title`}>
                <span className={cssPrefix`step-item-title-index`}>{`0${index + 1}`}</span>
                <span className={cssPrefix`step-item-title-text`}>{title}</span>
              </div>
              <div className={cssPrefix`step-item-introduction`}>{introduction}</div>
              {operationButton && (
                <div className={cssPrefix`step-item-content`}>
                  <Button type="primary" size="small" {...operationButton}>
                    {operationButton.text}
                  </Button>
                </div>
              )}
              {operationRender && <div className={cssPrefix`step-item-content`}>{operationRender}</div>}
            </div>
          );
        })}
      </Container>
    </>
  );
}
CGuide.displayName = 'CGuide';
CGuide.CGuideFoldButton = CGuideFoldButton;
export default CGuide;

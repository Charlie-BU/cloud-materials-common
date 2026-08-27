import type { CLoadingType, CResultProps } from '../interface';
interface FallbackProps {
    type?: CLoadingType;
    onReload?: () => void;
    cResultProps?: CResultProps;
}
export declare function getFallbackResultProps({ onReload, cResultProps, type }: FallbackProps): CResultProps;
export {};

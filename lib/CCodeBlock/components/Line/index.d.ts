/// <reference types="react" />
interface LineProps {
    showRowNumber?: boolean;
    index?: number;
    value: string;
    numberWidth: number;
}
declare const Line: ({ showRowNumber, index, value, numberWidth }: LineProps) => JSX.Element;
export default Line;

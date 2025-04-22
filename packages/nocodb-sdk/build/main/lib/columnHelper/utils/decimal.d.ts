export declare const allowedDecimalRegex: RegExp;
export declare const extractDecimalFromString: (value: string) => string;
export declare const composeNewDecimalValue: (props: {
    selectionStart?: number | null;
    selectionEnd?: number | null;
    lastValue: string;
    newValue: string;
}) => string;

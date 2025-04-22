import { ColumnType } from '../../../lib/Api';
import { SerializerOrParserFnProps } from '../column.interface';
/**
 * Remove outer quotes & unescape
 */
export declare const serializeStringValue: (value: any) => any;
export declare const serializeIntValue: (value: string | null | number) => number;
export declare const serializeDecimalValue: (value: string | null | number, callback?: (val: any) => any) => number;
export declare const serializePercentValue: (value: string | null) => number;
export declare const serializeDurationValue: (value: string | null, col: ColumnType) => number;
export declare const serializeCheckboxValue: (value: boolean | string | number | '0' | '1') => boolean;
export declare const serializeJsonValue: (value: any) => string;
export declare const serializeCurrencyValue: (value: any) => number;
export declare const serializeDateOrDateTimeValue: (value: string | null, col: ColumnType) => string;
export declare const serializeTimeValue: (value: any, params: SerializerOrParserFnProps['params']) => string;
export declare const serializeYearValue: (value: any) => number;
export declare const serializeSelectValue: (value: any, col: ColumnType) => any;
export declare const serializeEmail: (v: string) => string;

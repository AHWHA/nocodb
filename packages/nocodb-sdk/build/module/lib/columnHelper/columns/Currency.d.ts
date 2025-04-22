import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class CurrencyHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        currency_locale: string;
        currency_code: string;
    };
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): number | null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | number | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string;
}

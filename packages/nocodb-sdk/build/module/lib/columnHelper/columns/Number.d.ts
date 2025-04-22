import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class NumberHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        isLocaleString: boolean;
    };
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): number | null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | number | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string;
}

import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class DecimalHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        precision: 1;
        isLocaleString: boolean;
    };
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): number | null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | number | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string;
}

import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class FormulaHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        display_column_meta: {
            meta: {};
            custom: {};
        };
        display_type: any;
    };
    serializeValue(_value: any, params: SerializerOrParserFnProps['params']): null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string;
}

import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class LookupHelper extends AbstractColumnHelper {
    columnDefaultMeta: {};
    serializeValue(_value: any, params: SerializerOrParserFnProps['params']): null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string;
}

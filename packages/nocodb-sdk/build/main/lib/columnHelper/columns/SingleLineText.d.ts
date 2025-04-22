import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class SingleLineTextHelper extends AbstractColumnHelper {
    columnDefaultMeta: {};
    serializeValue(value: any, _params: SerializerOrParserFnProps['params']): string | null;
    parseValue(value: any, _params: SerializerOrParserFnProps['params']): string | null;
    parsePlainCellValue(value: any, _params: SerializerOrParserFnProps['params']): string;
}

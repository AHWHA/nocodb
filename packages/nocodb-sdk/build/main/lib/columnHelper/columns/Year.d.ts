import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class YearHelper extends AbstractColumnHelper {
    columnDefaultMeta: {};
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): number | null;
    parseValue(value: any): string | number | null;
    parsePlainCellValue(value: any): string;
}

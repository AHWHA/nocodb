import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class DateHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        date_format: string;
    };
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
    parseValue(value: any, params: SerializerOrParserFnProps['params'] & {
        isSystemCol?: boolean;
    }): string | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params'] & {
        isSystemCol?: boolean;
    }): string | null;
}

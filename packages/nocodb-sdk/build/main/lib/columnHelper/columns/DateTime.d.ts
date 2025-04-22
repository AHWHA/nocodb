import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class DateTimeHelper extends AbstractColumnHelper {
    columnDefaultMeta: {
        date_format: string;
        time_format: string;
        is12hrFormat: boolean;
    };
    serializeValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
    parseValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
    parsePlainCellValue(value: any, params: SerializerOrParserFnProps['params']): string | null;
}

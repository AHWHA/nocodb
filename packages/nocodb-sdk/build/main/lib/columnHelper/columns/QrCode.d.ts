import AbstractColumnHelper, { SerializerOrParserFnProps } from '../column.interface';
export declare class QrCodeHelper extends AbstractColumnHelper {
    columnDefaultMeta: {};
    serializeValue(_value: any, params: SerializerOrParserFnProps['params']): undefined;
    parseValue(value: any): string | null;
    parsePlainCellValue(value: any): string;
}

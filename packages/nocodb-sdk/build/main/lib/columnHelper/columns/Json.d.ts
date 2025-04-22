import AbstractColumnHelper from '../column.interface';
export declare class JsonHelper extends AbstractColumnHelper {
    columnDefaultMeta: {};
    serializeValue(value: any): string | null;
    parseValue(value: any): string | null;
    parsePlainCellValue(value: any): string;
}

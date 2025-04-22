import { SilentTypeConversionError } from '../../../lib/error';
import AbstractColumnHelper from '../column.interface';
import { isBt, isMm, isOo } from '../utils';
import { ncIsNaN, ncIsObject } from '../../../lib/is';
export class LinksHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        var _a;
        if (!isMm(params.col))
            throw new SilentTypeConversionError();
        let parsedVal = value;
        try {
            parsedVal = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_b) { }
        if (!(parsedVal &&
            ncIsObject(parsedVal) &&
            ['rowId', 'columnId', 'fk_related_model_id', 'value'].every((key) => parsedVal.hasOwnProperty(key))) ||
            (parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.fk_related_model_id) !==
                ((_a = params.col.colOptions) === null || _a === void 0 ? void 0 : _a.fk_related_model_id)) {
            throw new SilentTypeConversionError();
        }
        return parsedVal;
    }
    parseValue(value, params) {
        if (isMm(params.col)) {
            return JSON.stringify({
                rowId: params.rowId,
                columnId: params.col.id,
                fk_related_model_id: params.col.colOptions
                    .fk_related_model_id,
                value: !ncIsNaN(value) ? +value : 0,
            });
        }
        else if (isBt(params.col) || isOo(params.col)) {
            // fk_related_model_id is used to prevent paste operation in different fk_related_model_id cell
            return JSON.stringify({
                fk_related_model_id: params.col.colOptions
                    .fk_related_model_id,
                value: value || null,
            });
        }
        return value !== null && value !== void 0 ? value : '';
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlua3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0xpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLG9CQUVOLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRy9DLE1BQU0sT0FBTyxXQUFZLFNBQVEsb0JBQW9CO0lBQXJEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQTBEekIsQ0FBQztJQXhEQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFBRSxNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUU3RCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxDQUFDO1lBQ0gsU0FBUyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BFLENBQUM7UUFBQyxXQUFNLENBQUMsQ0FBQSxDQUFDO1FBRVYsSUFDRSxDQUFDLENBQ0MsU0FBUztZQUNULFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDckIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2pFLFNBQW9CLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUMxQyxDQUNGO1lBQ0QsQ0FBQyxTQUFpQyxhQUFqQyxTQUFTLHVCQUFULFNBQVMsQ0FBMEIsbUJBQW1CO2lCQUNyRCxNQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBc0MsMENBQUUsbUJBQW1CLENBQUEsRUFDekUsQ0FBQztZQUNELE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVUsRUFBRSxNQUEyQztRQUNoRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkIsbUJBQW1CLEVBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFzQztxQkFDcEUsbUJBQW1CO2dCQUN0QixLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hELCtGQUErRjtZQUMvRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLG1CQUFtQixFQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBc0M7cUJBQ3BFLG1CQUFtQjtnQkFDdEIsS0FBSyxFQUFFLEtBQUssSUFBSSxJQUFJO2FBQ3JCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLEtBQVUsRUFDVixNQUErRDs7UUFFL0QsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGIn0=
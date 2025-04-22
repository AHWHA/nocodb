import { SilentTypeConversionError } from '../../../../lib/error';
import AbstractColumnHelper from '../../column.interface';
import { ncHasProperties } from '../../../../lib/is';
import { isMm } from '../../utils';
export class ManyToManyHelper extends AbstractColumnHelper {
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
        if (!ncHasProperties(parsedVal, [
            'rowId',
            'columnId',
            'fk_related_model_id',
            'value',
        ]) ||
            (parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.fk_related_model_id) !==
                ((_a = params.col.colOptions) === null || _a === void 0 ? void 0 : _a.fk_related_model_id)) {
            throw new SilentTypeConversionError();
        }
        return parsedVal;
    }
    parseValue(value, params) {
        return JSON.stringify({
            rowId: params.rowId,
            columnId: params.col.id,
            fk_related_model_id: params.col.colOptions
                .fk_related_model_id,
            value,
        });
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFueVRvTWFueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvTFRBUi9NYW55VG9NYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLG9CQUVOLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxvQkFBb0I7SUFBMUQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBMkN6QixDQUFDO0lBekNDLGNBQWMsQ0FBQyxLQUFVLEVBQUUsTUFBMkM7O1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUFFLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBRTdELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUM7WUFDSCxTQUFTLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEUsQ0FBQztRQUFDLFdBQU0sQ0FBQyxDQUFBLENBQUM7UUFFVixJQUNFLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtZQUMxQixPQUFPO1lBQ1AsVUFBVTtZQUNWLHFCQUFxQjtZQUNyQixPQUFPO1NBQ1IsQ0FBQztZQUNGLENBQUMsU0FBaUMsYUFBakMsU0FBUyx1QkFBVCxTQUFTLENBQTBCLG1CQUFtQjtpQkFDckQsTUFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQXNDLDBDQUFFLG1CQUFtQixDQUFBLEVBQ3pFLENBQUM7WUFDRCxNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVLEVBQUUsTUFBMkM7UUFDaEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLG1CQUFtQixFQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBc0M7aUJBQ3BFLG1CQUFtQjtZQUN0QixLQUFLO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRiJ9
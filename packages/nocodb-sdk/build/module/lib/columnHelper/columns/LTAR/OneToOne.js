import { ncHasProperties, ncIsObject } from '../../../../lib/is';
import AbstractColumnHelper from '../../column.interface';
import { SilentTypeConversionError } from '../../../../lib/error';
export class OneToOneHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        var _a;
        let parsedVal = value;
        try {
            parsedVal = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_b) { }
        if (!ncHasProperties(parsedVal, ['fk_related_model_id', 'value']) ||
            !ncIsObject(parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.value) ||
            (parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.fk_related_model_id) !==
                ((_a = params.col.colOptions) === null || _a === void 0 ? void 0 : _a.fk_related_model_id)) {
            throw new SilentTypeConversionError();
        }
        return parsedVal;
    }
    parseValue(value, params) {
        return JSON.stringify({
            fk_related_model_id: params.col.colOptions
                .fk_related_model_id,
            value: value || null,
        });
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT25lVG9PbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0xUQVIvT25lVG9PbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdkQsT0FBTyxvQkFFTixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4RCxNQUFNLE9BQU8sY0FBZSxTQUFRLG9CQUFvQjtJQUF4RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFzQ3pCLENBQUM7SUFwQ0MsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQztZQUNILFNBQVMsR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRSxDQUFDO1FBQUMsV0FBTSxDQUFDLENBQUEsQ0FBQztRQUVWLElBQ0UsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxVQUFVLENBQUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLEtBQUssQ0FBQztZQUM3QixDQUFDLFNBQWlDLGFBQWpDLFNBQVMsdUJBQVQsU0FBUyxDQUEwQixtQkFBbUI7aUJBQ3JELE1BQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFzQywwQ0FBRSxtQkFBbUIsQ0FBQSxFQUN6RSxDQUFDO1lBQ0QsTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVSxFQUFFLE1BQTJDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNwQixtQkFBbUIsRUFBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQXNDO2lCQUNwRSxtQkFBbUI7WUFDdEIsS0FBSyxFQUFFLEtBQUssSUFBSSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0YifQ==
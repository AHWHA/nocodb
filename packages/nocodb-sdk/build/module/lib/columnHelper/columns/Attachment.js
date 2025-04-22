import { parseProp } from '../../../lib/helperFunctions';
import { parseDefault } from '..';
import AbstractColumnHelper from '../column.interface';
import { ncIsArray, ncIsEmptyObject, ncIsObject } from '../../../lib/is';
import { SilentTypeConversionError } from '../../../lib/error';
export class AttachmentHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        if (!value)
            return null;
        let parsedVal = [];
        try {
            parsedVal = parseProp(value);
            if (ncIsObject(parsedVal) && !ncIsEmptyObject(parsedVal)) {
                parsedVal = [parsedVal];
            }
            else if (!ncIsArray(parsedVal)) {
                parsedVal = [];
            }
        }
        catch (_a) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            throw new SilentTypeConversionError();
        }
        if (parsedVal.some((v) => !((v === null || v === void 0 ? void 0 : v.url) || (v === null || v === void 0 ? void 0 : v.data) || (v === null || v === void 0 ? void 0 : v.path)))) {
            return null;
        }
        return parsedVal;
    }
    parseValue(value) {
        return parseDefault(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = parseDefault(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvQXR0YWNobWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsQyxPQUFPLG9CQUVOLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4RCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsb0JBQW9CO0lBQTFEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQXFDekIsQ0FBQztJQW5DQyxjQUFjLENBQUMsS0FBVSxFQUFFLE1BQTJDO1FBQ3BFLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFeEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQztZQUNILFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFN0IsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDekQsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUIsQ0FBQztpQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUM7UUFBQyxXQUFNLENBQUM7WUFDUCxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRUQsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsR0FBRyxNQUFJLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUEsS0FBSSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDaEUsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVOztRQUM1QixPQUFPLE1BQUEsWUFBWSxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGIn0=
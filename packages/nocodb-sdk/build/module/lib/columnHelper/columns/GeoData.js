import { ncIsNaN, ncIsString } from '../../../lib/is';
import AbstractColumnHelper from '../column.interface';
import { SilentTypeConversionError } from '../../../lib/error';
import { convertGeoNumberToString } from '../../../lib/geoDataUtils';
export class GeoDataHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value) {
        value = this.parseValue(value);
        if (value === null) {
            throw new SilentTypeConversionError();
        }
        return value;
    }
    parseValue(value) {
        if (!ncIsString(value))
            return null;
        const geoValue = value
            .replace(',', ';')
            .split(';')
            .map((k) => k.trim());
        if (geoValue.length === 2) {
            if (!ncIsNaN(geoValue[0]) && !ncIsNaN(geoValue[1])) {
                return geoValue
                    .map((k) => convertGeoNumberToString(Number(k)))
                    .join(';');
            }
        }
        return null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvR2VvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQyxPQUFPLG9CQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5RCxNQUFNLE9BQU8sYUFBYyxTQUFRLG9CQUFvQjtJQUF2RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFrQ3pCLENBQUM7SUFoQ0MsY0FBYyxDQUFDLEtBQVU7UUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFcEMsTUFBTSxRQUFRLEdBQUcsS0FBSzthQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV4QixJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNuRCxPQUFPLFFBQVE7cUJBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVOztRQUM1QixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRiJ9
import { SilentTypeConversionError } from '../../../lib/error';
import AbstractColumnHelper from '../column.interface';
import { parseTimeValue, serializeTimeValue } from '../utils';
export class TimeHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is12hrFormat: false,
        };
    }
    serializeValue(value, params) {
        value = serializeTimeValue(value, params);
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new SilentTypeConversionError();
            }
        }
        return value;
    }
    parseValue(value, params) {
        return parseTimeValue(value, params);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = parseTimeValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvVGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUQsTUFBTSxPQUFPLFVBQVcsU0FBUSxvQkFBb0I7SUFBcEQ7O1FBQ1Msc0JBQWlCLEdBQUc7WUFDekIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQWdDSixDQUFDO0lBOUJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUxQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Q0FDRiJ9
import { SilentTypeConversionError } from '../../../lib/error';
import { parseDecimalValue, precisionFormats, serializeDecimalValue } from '..';
import AbstractColumnHelper from '../column.interface';
export class DecimalHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            precision: precisionFormats[1],
            isLocaleString: false,
        };
    }
    serializeValue(value, params) {
        value = serializeDecimalValue(value);
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
        return parseDecimalValue(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = parseDecimalValue(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjaW1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRGVjaW1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ2hGLE9BQU8sb0JBRU4sTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLE9BQU8sYUFBYyxTQUFRLG9CQUFvQjtJQUF2RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGNBQWMsRUFBRSxLQUFLO1NBQ3RCLENBQUM7SUFnQ0osQ0FBQztJQTlCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLEdBQUcsTUFBQSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0NBQ0YifQ==
import { SilentTypeConversionError } from '../../../lib/error';
import { parsePercentValue, serializePercentValue } from '..';
import AbstractColumnHelper from '../column.interface';
export class PercentHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is_progress: false,
        };
    }
    serializeValue(value, params) {
        value = serializePercentValue(value);
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
    parseValue(value) {
        return parsePercentValue(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return `${(_a = parsePercentValue(value)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvUGVyY2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQzlELE9BQU8sb0JBRU4sTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLE9BQU8sYUFBYyxTQUFRLG9CQUFvQjtJQUF2RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO0lBMEJKLENBQUM7SUF4QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVOztRQUM1QixPQUFPLEdBQUcsTUFBQSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDN0MsQ0FBQztDQUNGIn0=
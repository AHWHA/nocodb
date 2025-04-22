import { dateFormats } from '../../../lib/dateTimeHelper';
import { parseDateValue, serializeDateOrDateTimeValue } from '..';
import AbstractColumnHelper from '../column.interface';
import { SilentTypeConversionError } from '../../../lib/error';
export class DateHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            date_format: dateFormats[0],
        };
    }
    serializeValue(value, params) {
        value = serializeDateOrDateTimeValue(value, params.col);
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
        return parseDateValue(value, params.col, params.isSystemCol);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = parseDateValue(value, params.col, params.isSystemCol)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsRSxPQUFPLG9CQUVOLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhELE1BQU0sT0FBTyxVQUFXLFNBQVEsb0JBQW9CO0lBQXBEOztRQUNFLHNCQUFpQixHQUFHO1lBQ2xCLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUM7SUFnQ0osQ0FBQztJQTlCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLEtBQUssR0FBRyw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhELElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUF1RTtRQUV2RSxPQUFPLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBdUU7O1FBRXZFLE9BQU8sTUFBQSxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDckUsQ0FBQztDQUNGIn0=
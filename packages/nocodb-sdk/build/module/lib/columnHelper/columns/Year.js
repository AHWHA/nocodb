import { SilentTypeConversionError } from '../../../lib/error';
import AbstractColumnHelper from '../column.interface';
import { parseYearValue, serializeYearValue } from '../utils';
export class YearHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        value = serializeYearValue(value);
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
        return parseYearValue(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return `${(_a = parseYearValue(value)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWVhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvWWVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFOUQsTUFBTSxPQUFPLFVBQVcsU0FBUSxvQkFBb0I7SUFBcEQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBMEJ6QixDQUFDO0lBeEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQVU7O1FBQzVCLE9BQU8sR0FBRyxNQUFBLGNBQWMsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDMUMsQ0FBQztDQUNGIn0=
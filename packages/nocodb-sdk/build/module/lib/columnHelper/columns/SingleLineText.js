import AbstractColumnHelper from '../column.interface';
import { serializeStringValue } from '../utils';
export class SingleLineTextHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, _params) {
        return serializeStringValue(value);
    }
    parseValue(value, _params) {
        var _a, _b;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : null;
    }
    parsePlainCellValue(value, _params) {
        var _a, _b;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlTGluZVRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL1NpbmdsZUxpbmVUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBRU4sTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFaEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLG9CQUFvQjtJQUE5RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFzQnpCLENBQUM7SUFwQkMsY0FBYyxDQUNaLEtBQVUsRUFDVixPQUE0QztRQUU1QyxPQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE9BQTRDOztRQUU1QyxPQUFPLE1BQUEsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFLDBDQUFFLElBQUksRUFBRSxtQ0FBSSxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsT0FBNEM7O1FBRTVDLE9BQU8sTUFBQSxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0YifQ==
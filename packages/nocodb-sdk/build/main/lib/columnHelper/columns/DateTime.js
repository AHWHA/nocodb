"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeHelper = void 0;
const dateTimeHelper_1 = require("../../../lib/dateTimeHelper");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
const error_1 = require("../../../lib/error");
class DateTimeHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            date_format: dateTimeHelper_1.dateFormats[0],
            time_format: dateTimeHelper_1.timeFormats[0],
            is12hrFormat: false,
        };
    }
    serializeValue(value, params) {
        value = (0, utils_1.serializeDateOrDateTimeValue)(value, params.col);
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new error_1.SilentTypeConversionError();
            }
        }
        return value;
    }
    parseValue(value, params) {
        return (0, utils_1.parseDateTimeValue)(value, params);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = (0, utils_1.parseDateTimeValue)(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.DateTimeHelper = DateTimeHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0RhdGVUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUFnRTtBQUNoRSwyRUFFNkI7QUFDN0Isb0NBQTRFO0FBQzVFLHVDQUF3RDtBQUV4RCxNQUFhLGNBQWUsU0FBUSwwQkFBb0I7SUFBeEQ7O1FBQ0Usc0JBQWlCLEdBQUc7WUFDbEIsV0FBVyxFQUFFLDRCQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFdBQVcsRUFBRSw0QkFBVyxDQUFDLENBQUMsQ0FBQztZQUMzQixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsSUFBQSxvQ0FBNEIsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhELElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUEyQztRQUUzQyxPQUFPLElBQUEsMEJBQWtCLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBQSwwQkFBa0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFyQ0Qsd0NBcUNDIn0=
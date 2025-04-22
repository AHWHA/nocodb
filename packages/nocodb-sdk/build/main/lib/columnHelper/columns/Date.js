"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
const dateTimeHelper_1 = require("../../../lib/dateTimeHelper");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
const error_1 = require("../../../lib/error");
class DateHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            date_format: dateTimeHelper_1.dateFormats[0],
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializeDateOrDateTimeValue)(value, params.col);
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
        return (0, __1.parseDateValue)(value, params.col, params.isSystemCol);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = (0, __1.parseDateValue)(value, params.col, params.isSystemCol)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5REFBbUQ7QUFDbkQsMEJBQWtFO0FBQ2xFLDJFQUU2QjtBQUM3Qix1Q0FBd0Q7QUFFeEQsTUFBYSxVQUFXLFNBQVEsMEJBQW9CO0lBQXBEOztRQUNFLHNCQUFpQixHQUFHO1lBQ2xCLFdBQVcsRUFBRSw0QkFBVyxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsSUFBQSxnQ0FBNEIsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXhELElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUF1RTtRQUV2RSxPQUFPLElBQUEsa0JBQWMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBdUU7O1FBRXZFLE9BQU8sTUFBQSxJQUFBLGtCQUFjLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDckUsQ0FBQztDQUNGO0FBbkNELGdDQW1DQyJ9
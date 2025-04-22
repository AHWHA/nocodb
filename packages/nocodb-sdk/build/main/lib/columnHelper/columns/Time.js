"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeHelper = void 0;
const error_1 = require("../../../lib/error");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class TimeHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is12hrFormat: false,
        };
    }
    serializeValue(value, params) {
        value = (0, utils_1.serializeTimeValue)(value, params);
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
        return (0, utils_1.parseTimeValue)(value, params);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = (0, utils_1.parseTimeValue)(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.TimeHelper = TimeHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvVGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1Q0FBd0Q7QUFDeEQsMkVBRTZCO0FBQzdCLG9DQUE4RDtBQUU5RCxNQUFhLFVBQVcsU0FBUSwwQkFBb0I7SUFBcEQ7O1FBQ1Msc0JBQWlCLEdBQUc7WUFDekIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQWdDSixDQUFDO0lBOUJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLElBQUEsMEJBQWtCLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTFDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUEyQztRQUUzQyxPQUFPLElBQUEsc0JBQWMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sTUFBQSxJQUFBLHNCQUFjLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBbkNELGdDQW1DQyJ9
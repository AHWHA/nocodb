"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
class DecimalHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            precision: __1.precisionFormats[1],
            isLocaleString: false,
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializeDecimalValue)(value);
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
        return (0, __1.parseDecimalValue)(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = (0, __1.parseDecimalValue)(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.DecimalHelper = DecimalHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjaW1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRGVjaW1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1Q0FBd0Q7QUFDeEQsMEJBQWdGO0FBQ2hGLDJFQUU2QjtBQUU3QixNQUFhLGFBQWMsU0FBUSwwQkFBb0I7SUFBdkQ7O1FBQ0Usc0JBQWlCLEdBQUc7WUFDbEIsU0FBUyxFQUFFLG9CQUFnQixDQUFDLENBQUMsQ0FBQztZQUM5QixjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsSUFBQSx5QkFBcUIsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUksaUNBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxJQUFBLHFCQUFpQixFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sR0FBRyxNQUFBLElBQUEscUJBQWlCLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDekQsQ0FBQztDQUNGO0FBcENELHNDQW9DQyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearHelper = void 0;
const error_1 = require("../../../lib/error");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class YearHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        value = (0, utils_1.serializeYearValue)(value);
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
    parseValue(value) {
        return (0, utils_1.parseYearValue)(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return `${(_a = (0, utils_1.parseYearValue)(value)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.YearHelper = YearHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWVhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvWWVhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1Q0FBd0Q7QUFDeEQsMkVBRTZCO0FBQzdCLG9DQUE4RDtBQUU5RCxNQUFhLFVBQVcsU0FBUSwwQkFBb0I7SUFBcEQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBMEJ6QixDQUFDO0lBeEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLElBQUEsMEJBQWtCLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLElBQUEsc0JBQWMsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxHQUFHLE1BQUEsSUFBQSxzQkFBYyxFQUFDLEtBQUssQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUEzQkQsZ0NBMkJDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
class PercentHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is_progress: false,
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializePercentValue)(value);
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
        return (0, __1.parsePercentValue)(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return `${(_a = (0, __1.parsePercentValue)(value)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.PercentHelper = PercentHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyY2VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvUGVyY2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1Q0FBd0Q7QUFDeEQsMEJBQThEO0FBQzlELDJFQUU2QjtBQUU3QixNQUFhLGFBQWMsU0FBUSwwQkFBb0I7SUFBdkQ7O1FBQ0Usc0JBQWlCLEdBQUc7WUFDbEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztJQTBCSixDQUFDO0lBeEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLElBQUEseUJBQXFCLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLElBQUEscUJBQWlCLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQVU7O1FBQzVCLE9BQU8sR0FBRyxNQUFBLElBQUEscUJBQWlCLEVBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsRUFBRSxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQTdCRCxzQ0E2QkMifQ==
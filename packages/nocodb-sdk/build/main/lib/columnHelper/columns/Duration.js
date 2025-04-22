"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
class DurationHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            duration: 0,
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializeDurationValue)(value, params.col);
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
        return (0, __1.parseDurationValue)(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = (0, __1.parseDurationValue)(value, params.col)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.DurationHelper = DurationHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF3RDtBQUN4RCwwQkFBZ0U7QUFDaEUsMkVBRTZCO0FBRTdCLE1BQWEsY0FBZSxTQUFRLDBCQUFvQjtJQUF4RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUM7SUFnQ0osQ0FBQztJQTlCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLEtBQUssR0FBRyxJQUFBLDBCQUFzQixFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDO1FBRTNDLE9BQU8sSUFBQSxzQkFBa0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBQSxzQkFBa0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDckQsQ0FBQztDQUNGO0FBbkNELHdDQW1DQyJ9
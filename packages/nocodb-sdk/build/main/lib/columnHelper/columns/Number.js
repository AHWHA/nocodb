"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
const helperFunctions_1 = require("../../../lib/helperFunctions");
class NumberHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            isLocaleString: false,
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializeIntValue)(value);
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new error_1.SilentTypeConversionError();
            }
        }
        return (0, helperFunctions_1.toSafeInteger)(value);
    }
    parseValue(value, params) {
        return (0, __1.parseIntValue)(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = (0, __1.parseIntValue)(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.NumberHelper = NumberHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9OdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUNBQXdEO0FBQ3hELDBCQUFzRDtBQUN0RCwyRUFFNkI7QUFDN0IsMkRBQXNEO0FBRXRELE1BQWEsWUFBYSxTQUFRLDBCQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsSUFBQSxxQkFBaUIsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUksaUNBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sSUFBQSwrQkFBYSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDO1FBRTNDLE9BQU8sSUFBQSxpQkFBYSxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sR0FBRyxNQUFBLElBQUEsaUJBQWEsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUFuQ0Qsb0NBbUNDIn0=
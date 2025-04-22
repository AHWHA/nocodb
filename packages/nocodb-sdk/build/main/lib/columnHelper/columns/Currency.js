"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
class CurrencyHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            currency_locale: 'en-US',
            currency_code: 'USD',
        };
    }
    serializeValue(value, params) {
        value = (0, __1.serializeCurrencyValue)(value);
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
        return (0, __1.parseCurrencyValue)(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.CurrencyHelper = CurrencyHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0N1cnJlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF3RDtBQUN4RCwwQkFBZ0U7QUFDaEUsMkVBRTZCO0FBRTdCLE1BQWEsY0FBZSxTQUFRLDBCQUFvQjtJQUF4RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixlQUFlLEVBQUUsT0FBTztZQUN4QixhQUFhLEVBQUUsS0FBSztTQUNyQixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsSUFBQSwwQkFBc0IsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUksaUNBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxJQUFBLHNCQUFrQixFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFwQ0Qsd0NBb0NDIn0=
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTextHelper = void 0;
const helperFunctions_1 = require("../../../lib/helperFunctions");
const globals_1 = require("../../../lib/globals");
const is_1 = require("../../../lib/is");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class LongTextHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value) {
        // This is to remove the quotes added from LongText
        return (0, utils_1.serializeStringValue)(value);
    }
    parseValue(value, params) {
        var _a;
        const columnMeta = (0, helperFunctions_1.parseProp)(params.col.meta);
        if (columnMeta[globals_1.LongTextAiMetaProp]) {
            if ((0, is_1.ncIsObject)(value)) {
                return (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : null;
            }
        }
        if (!value)
            return null;
        return `"${value.replace(/"/g, '\\"')}"`;
    }
    parsePlainCellValue(value) {
        var _a, _b;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    }
}
exports.LongTextHelper = LongTextHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9uZ1RleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0xvbmdUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDJEQUFrRDtBQUNsRCwyQ0FBbUQ7QUFDbkQsaUNBQXNDO0FBQ3RDLDJFQUU2QjtBQUM3QixvQ0FBZ0Q7QUFFaEQsTUFBYSxjQUFlLFNBQVEsMEJBQW9CO0lBQXhEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQTJCekIsQ0FBQztJQXpCUSxjQUFjLENBQUMsS0FBVTtRQUM5QixtREFBbUQ7UUFDbkQsT0FBTyxJQUFBLDRCQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxNQUFNLFVBQVUsR0FBRyxJQUFBLDJCQUFTLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFJLFVBQVUsQ0FBQyw0QkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDbkMsSUFBSSxJQUFBLGVBQVUsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN0QixPQUFPLE1BQUMsS0FBc0IsYUFBdEIsS0FBSyx1QkFBTCxLQUFLLENBQW1CLEtBQUssbUNBQUksSUFBSSxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV4QixPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMzQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsRUFBRSwwQ0FBRSxJQUFJLEVBQUUsbUNBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FDRjtBQTVCRCx3Q0E0QkMifQ==
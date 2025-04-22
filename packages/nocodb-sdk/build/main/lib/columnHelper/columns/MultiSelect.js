"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelectHelper = void 0;
const is_1 = require("../../../lib/is");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class MultiSelectHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        return (0, utils_1.serializeSelectValue)(value, params.col);
    }
    parseValue(value) {
        if (!value)
            return null;
        if ((0, is_1.ncIsArray)(value)) {
            return value.join(', ');
        }
        return value.toString().split(',').join(', ');
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.MultiSelectHelper = MultiSelectHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlTZWxlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL011bHRpU2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlDQUFxQztBQUNyQywyRUFFNkI7QUFDN0Isb0NBQWdEO0FBRWhELE1BQWEsaUJBQWtCLFNBQVEsMEJBQW9CO0lBQTNEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQXNCekIsQ0FBQztJQXBCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLE9BQU8sSUFBQSw0QkFBb0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBQSxjQUFTLEVBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQVU7O1FBQzVCLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNGO0FBdkJELDhDQXVCQyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleSelectHelper = void 0;
const is_1 = require("../../../lib/is");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class SingleSelectHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        return (0, utils_1.serializeSelectValue)(value, params.col);
    }
    parseValue(value) {
        var _a, _b;
        if (!value)
            return null;
        if ((0, is_1.ncIsArray)(value) && value.length) {
            return (_a = value[0]) === null || _a === void 0 ? void 0 : _a.toString().trim();
        }
        return (_b = value === null || value === void 0 ? void 0 : value.toString().trim()) !== null && _b !== void 0 ? _b : null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.SingleSelectHelper = SingleSelectHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9TaW5nbGVTZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQXFDO0FBQ3JDLDJFQUU2QjtBQUM3QixvQ0FBZ0Q7QUFFaEQsTUFBYSxrQkFBbUIsU0FBUSwwQkFBb0I7SUFBNUQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBc0J6QixDQUFDO0lBcEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxJQUFBLDRCQUFvQixFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVOztRQUNuQixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBQSxjQUFTLEVBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JDLE9BQU8sTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLDBDQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsT0FBTyxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLG1DQUFJLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUF2QkQsZ0RBdUJDIn0=
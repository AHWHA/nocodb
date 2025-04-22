"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleLineTextHelper = void 0;
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class SingleLineTextHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, _params) {
        return (0, utils_1.serializeStringValue)(value);
    }
    parseValue(value, _params) {
        var _a, _b;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : null;
    }
    parsePlainCellValue(value, _params) {
        var _a, _b;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.toString()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    }
}
exports.SingleLineTextHelper = SingleLineTextHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlTGluZVRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL1NpbmdsZUxpbmVUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJFQUU2QjtBQUM3QixvQ0FBZ0Q7QUFFaEQsTUFBYSxvQkFBcUIsU0FBUSwwQkFBb0I7SUFBOUQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBc0J6QixDQUFDO0lBcEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsT0FBNEM7UUFFNUMsT0FBTyxJQUFBLDRCQUFvQixFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE9BQTRDOztRQUU1QyxPQUFPLE1BQUEsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFLDBDQUFFLElBQUksRUFBRSxtQ0FBSSxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsT0FBNEM7O1FBRTVDLE9BQU8sTUFBQSxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsMENBQUUsSUFBSSxFQUFFLG1DQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUF2QkQsb0RBdUJDIn0=
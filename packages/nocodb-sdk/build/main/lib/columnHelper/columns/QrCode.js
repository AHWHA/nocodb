"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodeHelper = void 0;
const error_1 = require("../../../lib/error");
const column_interface_1 = __importDefault(require("../column.interface"));
class QrCodeHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(_value, params) {
        if (params.isMultipleCellPaste) {
            return undefined;
        }
        else {
            throw new error_1.ComputedTypePasteError();
        }
    }
    parseValue(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.QrCodeHelper = QrCodeHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXJDb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9RckNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUNBQXFEO0FBQ3JELDJFQUU2QjtBQUU3QixNQUFhLFlBQWEsU0FBUSwwQkFBb0I7SUFBdEQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBb0J6QixDQUFDO0lBbEJDLGNBQWMsQ0FDWixNQUFXLEVBQ1gsTUFBMkM7UUFFM0MsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSw4QkFBc0IsRUFBRSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7O1FBQ25CLE9BQU8sTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFLG1DQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFyQkQsb0NBcUJDIn0=
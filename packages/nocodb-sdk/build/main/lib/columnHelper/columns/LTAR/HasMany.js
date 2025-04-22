"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasManyHelper = void 0;
const error_1 = require("../../../../lib/error");
const column_interface_1 = __importDefault(require("../../column.interface"));
class HasManyHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(_value, _params) {
        throw new error_1.SilentTypeConversionError();
    }
    parseValue(value, _params) {
        return value !== null && value !== void 0 ? value : '';
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.HasManyHelper = HasManyHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFzTWFueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvTFRBUi9IYXNNYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF3RDtBQUN4RCw4RUFFZ0M7QUFFaEMsTUFBYSxhQUFjLFNBQVEsMEJBQW9CO0lBQXZEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQWdCekIsQ0FBQztJQWRDLGNBQWMsQ0FBQyxNQUFXLEVBQUUsT0FBNEM7UUFDdEUsTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVLEVBQUUsT0FBNEM7UUFDakUsT0FBTyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQWpCRCxzQ0FpQkMifQ==
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaHelper = void 0;
const column_interface_1 = __importDefault(require("../column.interface"));
const helperFunctions_1 = require("../../../lib/helperFunctions");
const column_helper_1 = require("../column-helper");
const error_1 = require("../../../lib/error");
class FormulaHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            display_column_meta: {
                meta: {},
                custom: {},
            },
            display_type: null,
        };
    }
    serializeValue(_value, params) {
        if (params.isMultipleCellPaste) {
            return undefined;
        }
        else {
            throw new error_1.ComputedTypePasteError();
        }
    }
    parseValue(value, params) {
        var _a;
        const columnMeta = (0, helperFunctions_1.parseProp)((_a = params.col) === null || _a === void 0 ? void 0 : _a.meta);
        const childColumn = Object.assign({ uidt: columnMeta.display_type }, columnMeta.display_column_meta);
        return column_helper_1.ColumnHelper.parseValue(value, Object.assign(Object.assign({}, params), { col: childColumn }));
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.FormulaHelper = FormulaHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRm9ybXVsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyRUFFNkI7QUFDN0IsMkRBQWtEO0FBQ2xELG9EQUFnRDtBQUNoRCx1Q0FBcUQ7QUFFckQsTUFBYSxhQUFjLFNBQVEsMEJBQW9CO0lBQXZEOztRQUNFLHNCQUFpQixHQUFHO1lBQ2xCLG1CQUFtQixFQUFFO2dCQUNuQixJQUFJLEVBQUUsRUFBRTtnQkFDUixNQUFNLEVBQUUsRUFBRTthQUNYO1lBQ0QsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQztJQW1DSixDQUFDO0lBakNDLGNBQWMsQ0FDWixNQUFXLEVBQ1gsTUFBMkM7UUFFM0MsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMvQixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSw4QkFBc0IsRUFBRSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsTUFBTSxVQUFVLEdBQUcsSUFBQSwyQkFBUyxFQUFDLE1BQUEsTUFBTSxDQUFDLEdBQUcsMENBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxVQUFVLENBQUMsWUFBWSxJQUMxQixVQUFVLENBQUMsbUJBQW1CLENBQ2xDLENBQUM7UUFFRixPQUFPLDRCQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssa0NBQy9CLE1BQU0sS0FDVCxHQUFHLEVBQUUsV0FBVyxJQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQTFDRCxzQ0EwQ0MifQ==
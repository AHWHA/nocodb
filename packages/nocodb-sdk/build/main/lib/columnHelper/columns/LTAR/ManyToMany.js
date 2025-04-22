"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyToManyHelper = void 0;
const error_1 = require("../../../../lib/error");
const column_interface_1 = __importDefault(require("../../column.interface"));
const is_1 = require("../../../../lib/is");
const utils_1 = require("../../utils");
class ManyToManyHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        var _a;
        if (!(0, utils_1.isMm)(params.col))
            throw new error_1.SilentTypeConversionError();
        let parsedVal = value;
        try {
            parsedVal = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_b) { }
        if (!(0, is_1.ncHasProperties)(parsedVal, [
            'rowId',
            'columnId',
            'fk_related_model_id',
            'value',
        ]) ||
            (parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.fk_related_model_id) !==
                ((_a = params.col.colOptions) === null || _a === void 0 ? void 0 : _a.fk_related_model_id)) {
            throw new error_1.SilentTypeConversionError();
        }
        return parsedVal;
    }
    parseValue(value, params) {
        return JSON.stringify({
            rowId: params.rowId,
            columnId: params.col.id,
            fk_related_model_id: params.col.colOptions
                .fk_related_model_id,
            value,
        });
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.ManyToManyHelper = ManyToManyHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFueVRvTWFueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvTFRBUi9NYW55VG9NYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF3RDtBQUN4RCw4RUFFZ0M7QUFFaEMsaUNBQTJDO0FBQzNDLHVDQUFtQztBQUVuQyxNQUFhLGdCQUFpQixTQUFRLDBCQUFvQjtJQUExRDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUEyQ3pCLENBQUM7SUF6Q0MsY0FBYyxDQUFDLEtBQVUsRUFBRSxNQUEyQzs7UUFDcEUsSUFBSSxDQUFDLElBQUEsWUFBSSxFQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFBRSxNQUFNLElBQUksaUNBQXlCLEVBQUUsQ0FBQztRQUU3RCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxDQUFDO1lBQ0gsU0FBUyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BFLENBQUM7UUFBQyxXQUFNLENBQUMsQ0FBQSxDQUFDO1FBRVYsSUFDRSxDQUFDLElBQUEsb0JBQWUsRUFBQyxTQUFTLEVBQUU7WUFDMUIsT0FBTztZQUNQLFVBQVU7WUFDVixxQkFBcUI7WUFDckIsT0FBTztTQUNSLENBQUM7WUFDRixDQUFDLFNBQWlDLGFBQWpDLFNBQVMsdUJBQVQsU0FBUyxDQUEwQixtQkFBbUI7aUJBQ3JELE1BQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFzQywwQ0FBRSxtQkFBbUIsQ0FBQSxFQUN6RSxDQUFDO1lBQ0QsTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVSxFQUFFLE1BQTJDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNwQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixtQkFBbUIsRUFBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQXNDO2lCQUNwRSxtQkFBbUI7WUFDdEIsS0FBSztTQUNOLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUE1Q0QsNENBNENDIn0=
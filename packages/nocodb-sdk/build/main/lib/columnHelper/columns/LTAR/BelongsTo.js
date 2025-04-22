"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BelongsToHelper = void 0;
const is_1 = require("../../../../lib/is");
const column_interface_1 = __importDefault(require("../../column.interface"));
const error_1 = require("../../../../lib/error");
class BelongsToHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        var _a;
        let parsedVal = value;
        try {
            parsedVal = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_b) { }
        if (!(0, is_1.ncHasProperties)(parsedVal, ['fk_related_model_id', 'value']) ||
            !(0, is_1.ncIsObject)(parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.value) ||
            (parsedVal === null || parsedVal === void 0 ? void 0 : parsedVal.fk_related_model_id) !==
                ((_a = params.col.colOptions) === null || _a === void 0 ? void 0 : _a.fk_related_model_id)) {
            throw new error_1.SilentTypeConversionError();
        }
        return parsedVal;
    }
    parseValue(value, params) {
        return JSON.stringify({
            fk_related_model_id: params.col.colOptions
                .fk_related_model_id,
            value: value || null,
        });
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.BelongsToHelper = BelongsToHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVsb25nc1RvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9MVEFSL0JlbG9uZ3NUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBdUQ7QUFDdkQsOEVBRWdDO0FBRWhDLHVDQUF3RDtBQUV4RCxNQUFhLGVBQWdCLFNBQVEsMEJBQW9CO0lBQXpEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQXNDekIsQ0FBQztJQXBDQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxDQUFDO1lBQ0gsU0FBUyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BFLENBQUM7UUFBQyxXQUFNLENBQUMsQ0FBQSxDQUFDO1FBRVYsSUFDRSxDQUFDLElBQUEsb0JBQWUsRUFBQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3RCxDQUFDLElBQUEsZUFBVSxFQUFDLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUM7WUFDN0IsQ0FBQyxTQUFpQyxhQUFqQyxTQUFTLHVCQUFULFNBQVMsQ0FBMEIsbUJBQW1CO2lCQUNyRCxNQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBc0MsMENBQUUsbUJBQW1CLENBQUEsRUFDekUsQ0FBQztZQUNELE1BQU0sSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVUsRUFBRSxNQUEyQztRQUNoRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDcEIsbUJBQW1CLEVBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFzQztpQkFDcEUsbUJBQW1CO1lBQ3RCLEtBQUssRUFBRSxLQUFLLElBQUksSUFBSTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGO0FBdkNELDBDQXVDQyJ9
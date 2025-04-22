"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentHelper = void 0;
const helperFunctions_1 = require("../../../lib/helperFunctions");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
const is_1 = require("../../../lib/is");
const error_1 = require("../../../lib/error");
class AttachmentHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        if (!value)
            return null;
        let parsedVal = [];
        try {
            parsedVal = (0, helperFunctions_1.parseProp)(value);
            if ((0, is_1.ncIsObject)(parsedVal) && !(0, is_1.ncIsEmptyObject)(parsedVal)) {
                parsedVal = [parsedVal];
            }
            else if (!(0, is_1.ncIsArray)(parsedVal)) {
                parsedVal = [];
            }
        }
        catch (_a) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            throw new error_1.SilentTypeConversionError();
        }
        if (parsedVal.some((v) => !((v === null || v === void 0 ? void 0 : v.url) || (v === null || v === void 0 ? void 0 : v.data) || (v === null || v === void 0 ? void 0 : v.path)))) {
            return null;
        }
        return parsedVal;
    }
    parseValue(value) {
        return (0, __1.parseDefault)(value);
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = (0, __1.parseDefault)(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.AttachmentHelper = AttachmentHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvQXR0YWNobWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyREFBa0Q7QUFDbEQsMEJBQWtDO0FBQ2xDLDJFQUU2QjtBQUM3QixpQ0FBa0U7QUFDbEUsdUNBQXdEO0FBRXhELE1BQWEsZ0JBQWlCLFNBQVEsMEJBQW9CO0lBQTFEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQXFDekIsQ0FBQztJQW5DQyxjQUFjLENBQUMsS0FBVSxFQUFFLE1BQTJDO1FBQ3BFLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFeEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQztZQUNILFNBQVMsR0FBRyxJQUFBLDJCQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFFN0IsSUFBSSxJQUFBLGVBQVUsRUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQWUsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2dCQUN6RCxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQixDQUFDO2lCQUFNLElBQUksQ0FBQyxJQUFBLGNBQVMsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2dCQUNqQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDO1FBQUMsV0FBTSxDQUFDO1lBQ1AsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLEdBQUcsTUFBSSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFBLEtBQUksQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hFLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLElBQUEsZ0JBQVksRUFBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLElBQUEsZ0JBQVksRUFBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQXRDRCw0Q0FzQ0MifQ==
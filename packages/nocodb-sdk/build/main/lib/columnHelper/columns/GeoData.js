"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoDataHelper = void 0;
const is_1 = require("../../../lib/is");
const column_interface_1 = __importDefault(require("../column.interface"));
const error_1 = require("../../../lib/error");
const geoDataUtils_1 = require("../../../lib/geoDataUtils");
class GeoDataHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value) {
        value = this.parseValue(value);
        if (value === null) {
            throw new error_1.SilentTypeConversionError();
        }
        return value;
    }
    parseValue(value) {
        if (!(0, is_1.ncIsString)(value))
            return null;
        const geoValue = value
            .replace(',', ';')
            .split(';')
            .map((k) => k.trim());
        if (geoValue.length === 2) {
            if (!(0, is_1.ncIsNaN)(geoValue[0]) && !(0, is_1.ncIsNaN)(geoValue[1])) {
                return geoValue
                    .map((k) => (0, geoDataUtils_1.convertGeoNumberToString)(Number(k)))
                    .join(';');
            }
        }
        return null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.GeoDataHelper = GeoDataHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvR2VvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBK0M7QUFDL0MsMkVBQXVEO0FBQ3ZELHVDQUF3RDtBQUN4RCxxREFBOEQ7QUFFOUQsTUFBYSxhQUFjLFNBQVEsMEJBQW9CO0lBQXZEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQWtDekIsQ0FBQztJQWhDQyxjQUFjLENBQUMsS0FBVTtRQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksaUNBQXlCLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXBDLE1BQU0sUUFBUSxHQUFHLEtBQUs7YUFDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7YUFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFeEIsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFBLFlBQU8sRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEsWUFBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25ELE9BQU8sUUFBUTtxQkFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsdUNBQXdCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFuQ0Qsc0NBbUNDIn0=
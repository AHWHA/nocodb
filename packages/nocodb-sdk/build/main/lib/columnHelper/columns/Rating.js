"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingHelper = void 0;
const error_1 = require("../../../lib/error");
const __1 = require("..");
const column_interface_1 = __importDefault(require("../column.interface"));
const helperFunctions_1 = require("../../../lib/helperFunctions");
class RatingHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            iconIdx: 0,
            icon: {
                full: 'mdi-star',
                empty: 'mdi-star-outline',
            },
            color: '#fcb401',
            max: 5,
        };
    }
    serializeValue(value, params) {
        var _a;
        const res = (0, __1.serializeIntValue)(value !== null && value !== void 0 ? value : 0);
        if (res === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new error_1.SilentTypeConversionError();
            }
        }
        if (res) {
            return Math.min(res, ((_a = (0, helperFunctions_1.parseProp)(params.col.meta)) === null || _a === void 0 ? void 0 : _a.max) || this.columnDefaultMeta.max);
        }
        return res;
    }
    parseValue(value) {
        return (0, __1.parseIntValue)(value);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = (0, __1.parseIntValue)(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
exports.RatingHelper = RatingHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9SYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUNBQXdEO0FBQ3hELDBCQUFzRDtBQUN0RCwyRUFFNkI7QUFDN0IsMkRBQWtEO0FBRWxELE1BQWEsWUFBYSxTQUFRLDBCQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLGtCQUFrQjthQUMxQjtZQUNELEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxDQUFDO1NBQ1AsQ0FBQztJQW9DSixDQUFDO0lBbENDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE1BQU0sR0FBRyxHQUFHLElBQUEscUJBQWlCLEVBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUMsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUNiLEdBQUcsRUFDSCxDQUFBLE1BQUEsSUFBQSwyQkFBUyxFQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDBDQUFFLEdBQUcsS0FBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUM5RCxDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLE9BQU8sSUFBQSxpQkFBYSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLEdBQUcsTUFBQSxJQUFBLGlCQUFhLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDckQsQ0FBQztDQUNGO0FBN0NELG9DQTZDQyJ9
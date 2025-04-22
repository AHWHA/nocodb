"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonHelper = void 0;
const error_1 = require("../../../lib/error");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
class JsonHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value) {
        value = (0, utils_1.serializeJsonValue)(value);
        if (value === null) {
            throw new error_1.SilentTypeConversionError();
        }
        return value;
    }
    parseValue(value) {
        return (0, utils_1.parseJsonValue)(value);
    }
    parsePlainCellValue(value) {
        return (0, utils_1.parseJsonValue)(value);
    }
}
exports.JsonHelper = JsonHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1Q0FBd0Q7QUFDeEQsMkVBQXVEO0FBQ3ZELG9DQUE4RDtBQUU5RCxNQUFhLFVBQVcsU0FBUSwwQkFBb0I7SUFBcEQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBbUJ6QixDQUFDO0lBakJDLGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLEtBQUssR0FBRyxJQUFBLDBCQUFrQixFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxpQ0FBeUIsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLElBQUEsc0JBQWMsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTtRQUM1QixPQUFPLElBQUEsc0JBQWMsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFwQkQsZ0NBb0JDIn0=
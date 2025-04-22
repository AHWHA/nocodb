"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const is_1 = require("../../../lib/is");
const column_interface_1 = __importDefault(require("../column.interface"));
const utils_1 = require("../utils");
const error_1 = require("../../../lib/error");
const helperFunctions_1 = require("../../../lib/helperFunctions");
class UserHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is_multi: false,
            notify: false,
        };
    }
    serializeValue(value, params) {
        try {
            value = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_a) { }
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new error_1.SilentTypeConversionError();
            }
        }
        const is_multi = (0, helperFunctions_1.parseProp)(params.col.meta).is_multi;
        if ((0, is_1.ncIsArray)(value) || (0, is_1.ncIsObject)(value)) {
            if ((0, is_1.ncIsObject)(value)) {
                value = [value];
            }
            value = value.reduce((acc, user) => {
                if (user.email) {
                    acc.push(user);
                }
                return acc;
            }, []);
            if (!value.length)
                return null;
            if (!is_multi) {
                return value[0];
            }
            return value;
        }
        if (!(0, is_1.ncIsString)(value))
            return null;
        if (is_multi) {
            return value
                .split(',')
                .map((val) => (0, utils_1.serializeEmail)(val))
                .filter(Boolean)
                .join(', ');
        }
        return (0, utils_1.serializeEmail)(value);
    }
    parseValue(value) {
        return (0, utils_1.parseUserValue)(value, true);
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = (0, utils_1.parseUserValue)(value)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.UserHelper = UserHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBNkQ7QUFDN0QsMkVBRTZCO0FBQzdCLG9DQUEwRDtBQUMxRCx1Q0FBd0Q7QUFFeEQsMkRBQWtEO0FBRWxELE1BQWEsVUFBVyxTQUFRLDBCQUFvQjtJQUFwRDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQztJQTZESixDQUFDO0lBM0RDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsSUFBSSxDQUFDO1lBQ0gsS0FBSyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2hFLENBQUM7UUFBQyxXQUFNLENBQUMsQ0FBQSxDQUFDO1FBRVYsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLGlDQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFBLDJCQUFTLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFckQsSUFBSSxJQUFBLGNBQVMsRUFBQyxLQUFLLENBQUMsSUFBSSxJQUFBLGVBQVUsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzFDLElBQUksSUFBQSxlQUFVLEVBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUVELEtBQUssR0FBSSxLQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsRUFBRSxFQUFnQixDQUFDLENBQUM7WUFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBRS9CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDZCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXBDLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixPQUFPLEtBQUs7aUJBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUEsc0JBQWMsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQztRQUVELE9BQU8sSUFBQSxzQkFBYyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLElBQUEsc0JBQWMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQVU7O1FBQzVCLE9BQU8sTUFBQSxJQUFBLHNCQUFjLEVBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFqRUQsZ0NBaUVDIn0=
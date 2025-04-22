"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEmail = exports.serializeSelectValue = exports.serializeYearValue = exports.serializeTimeValue = exports.serializeDateOrDateTimeValue = exports.serializeCurrencyValue = exports.serializeJsonValue = exports.serializeCheckboxValue = exports.serializeDurationValue = exports.serializePercentValue = exports.serializeDecimalValue = exports.serializeIntValue = exports.serializeStringValue = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dateTimeHelper_1 = require("../../../lib/dateTimeHelper");
const durationUtils_1 = require("../../../lib/durationUtils");
const helperFunctions_1 = require("../../../lib/helperFunctions");
const is_1 = require("../../../lib/is");
const UITypes_1 = __importDefault(require("../../../lib/UITypes"));
const error_1 = require("../../../lib/error");
/**
 * Remove outer quotes & unescape
 */
const serializeStringValue = (value) => {
    var _a;
    value = (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : null;
    if (!value)
        return null;
    if (value.match(/^"[\s\S]*"$/)) {
        value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    return value;
};
exports.serializeStringValue = serializeStringValue;
const serializeIntValue = (value) => {
    if ((0, is_1.ncIsNumber)(value)) {
        return parseInt(value.toString(), 10);
    }
    // If it's a string, remove commas and check if it's a valid number
    if ((0, is_1.ncIsString)(value)) {
        const cleanedValue = value.replace(/,/g, '').trim(); // Remove commas
        if (!cleanedValue)
            return null;
        // Try converting the cleaned value to a number
        const numberValue = Number(cleanedValue);
        // If it's a valid number, return it
        if (!isNaN(numberValue)) {
            return parseInt(numberValue.toString(), 10);
        }
    }
    return null; // Return null if it's not a valid number
};
exports.serializeIntValue = serializeIntValue;
const serializeDecimalValue = (value, callback) => {
    if ((0, is_1.ncIsNumber)(value)) {
        return Number(value);
    }
    // If it's a string, remove commas and check if it's a valid number
    if ((0, is_1.ncIsString)(value)) {
        const cleanedValue = (0, is_1.ncIsFunction)(callback)
            ? callback(value)
            : value.replace(/,/g, '').trim(); // Remove commas
        if (!cleanedValue)
            return null;
        // Try converting the cleaned value to a number
        const numberValue = Number(cleanedValue);
        // If it's a valid number, return it
        if (!isNaN(numberValue)) {
            return numberValue;
        }
    }
    return null;
};
exports.serializeDecimalValue = serializeDecimalValue;
const serializePercentValue = (value) => {
    if ((0, is_1.ncIsNumber)(value)) {
        return value;
    }
    // If it's a string, remove % and check if it's a valid number
    if ((0, is_1.ncIsString)(value)) {
        const cleanedValue = value.replace('%', ''); // Remove %
        if (!cleanedValue)
            return null;
        // Try converting the cleaned value to a number
        const numberValue = Number(cleanedValue);
        // If it's a valid number, return it
        if (!isNaN(numberValue)) {
            return numberValue;
        }
    }
    return null;
};
exports.serializePercentValue = serializePercentValue;
const serializeDurationValue = (value, col) => {
    var _a;
    // Check if the value is a pure number (interpreted as seconds)
    if (!(0, is_1.ncIsNaN)(value)) {
        return parseInt(value, 10); // Directly return seconds
    }
    const columnMeta = (0, helperFunctions_1.parseProp)(col.meta);
    const res = (0, durationUtils_1.convertDurationToSeconds)(value, (_a = columnMeta.duration) !== null && _a !== void 0 ? _a : 0);
    return res._isValid ? res._sec : null;
};
exports.serializeDurationValue = serializeDurationValue;
const serializeCheckboxValue = (value) => {
    if ((0, is_1.ncIsBoolean)(value))
        return value;
    if ((0, is_1.ncIsString)(value)) {
        const strval = value.trim().toLowerCase();
        if (strval === 'true' || strval === '1')
            return true;
        if (strval === 'false' || strval === '0' || strval === '')
            return false;
    }
    return null;
};
exports.serializeCheckboxValue = serializeCheckboxValue;
const serializeJsonValue = (value) => {
    try {
        return (0, is_1.ncIsString)(value)
            ? JSON.stringify(JSON.parse(value)) // Ensure it's a valid JSON string
            : JSON.stringify(value); // Convert object/array to JSON
    }
    catch (_a) {
        return null;
    }
};
exports.serializeJsonValue = serializeJsonValue;
const serializeCurrencyValue = (value) => {
    return (0, exports.serializeDecimalValue)(value, (value) => {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.replace(/[^0-9.]/g, '')) === null || _a === void 0 ? void 0 : _a.trim();
    });
};
exports.serializeCurrencyValue = serializeCurrencyValue;
const serializeDateOrDateTimeValue = (value, col) => {
    if (!value)
        return null;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    let parsedDateOrDateTime = (0, dayjs_1.default)(value, (0, dateTimeHelper_1.getDateTimeFormat)(value));
    if (!parsedDateOrDateTime.isValid()) {
        parsedDateOrDateTime = (0, dayjs_1.default)(value, (0, dateTimeHelper_1.getDateFormat)(value));
    }
    if (!parsedDateOrDateTime.isValid()) {
        return null;
    }
    return col.uidt === UITypes_1.default.Date
        ? parsedDateOrDateTime.format('YYYY-MM-DD')
        : parsedDateOrDateTime.utc().format('YYYY-MM-DD HH:mm:ssZ');
};
exports.serializeDateOrDateTimeValue = serializeDateOrDateTimeValue;
const serializeTimeValue = (value, params) => {
    var _a;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    let parsedTime = (0, dayjs_1.default)(value);
    if (!parsedTime.isValid()) {
        parsedTime = (0, dayjs_1.default)(value, 'HH:mm:ss');
    }
    if (!parsedTime.isValid()) {
        parsedTime = (0, dayjs_1.default)(`1999-01-01 ${value}`);
    }
    if (!parsedTime.isValid()) {
        return null;
    }
    const dateFormat = ((_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id))
        ? 'YYYY-MM-DD HH:mm:ss'
        : 'YYYY-MM-DD HH:mm:ssZ';
    return parsedTime.format(dateFormat);
};
exports.serializeTimeValue = serializeTimeValue;
const serializeYearValue = (value) => {
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    const parsedDate = (0, dayjs_1.default)(value === null || value === void 0 ? void 0 : value.toString());
    return parsedDate.isValid() ? +parsedDate.format('YYYY') : null;
};
exports.serializeYearValue = serializeYearValue;
const serializeSelectValue = (value, col) => {
    var _a;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    // return null if value is empty
    if (!value)
        return null;
    // Todo: discuss new value creation
    const availableOptions = (((_a = col.colOptions) === null || _a === void 0 ? void 0 : _a.options) || []).map((o) => o.title);
    const optionsSet = new Set(availableOptions);
    let vals = value.split(',').map((val) => val.trim());
    const invalidVals = vals.filter((v) => !optionsSet.has(v));
    if (vals.length && col.uidt === UITypes_1.default.SingleSelect) {
        vals = [vals[0]];
    }
    // return null if no valid values
    if (invalidVals.length > 0) {
        throw new error_1.SelectTypeConversionError(vals, invalidVals);
    }
    return vals.join(',');
};
exports.serializeSelectValue = serializeSelectValue;
const serializeEmail = (v) => {
    const matches = v.match(/(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})/i);
    return matches ? matches[0] : null;
};
exports.serializeEmail = serializeEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL3V0aWxzL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLHlEQUF3RTtBQUN4RSx1REFBK0Q7QUFDL0QsMkRBQWtEO0FBQ2xELGlDQU1rQjtBQUNsQiw0REFBb0M7QUFFcEMsdUNBQXdEO0FBRXhEOztHQUVHO0FBQ0ksTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFOztJQUNqRCxLQUFLLEdBQUcsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFLG1DQUFJLElBQUksQ0FBQztJQUVsQyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXhCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQy9CLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBVlcsUUFBQSxvQkFBb0Isd0JBVS9CO0FBRUssTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQTZCLEVBQUUsRUFBRTtJQUNqRSxJQUFJLElBQUEsZUFBVSxFQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdEIsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxtRUFBbUU7SUFDbkUsSUFBSSxJQUFBLGVBQVUsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFB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
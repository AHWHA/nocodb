"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserValue = exports.parseYearValue = exports.parseTimeValue = exports.parseDateTimeValue = exports.parseDateValue = exports.parseCurrencyValue = exports.parseJsonValue = exports.parseCheckboxValue = exports.parseDurationValue = exports.parsePercentValue = exports.parseDecimalValue = exports.parseIntValue = exports.parseDefault = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const durationUtils_1 = require("../../../lib/durationUtils");
const helperFunctions_1 = require("../../../lib/helperFunctions");
const is_1 = require("../../../lib/is");
const dateTimeHelper_1 = require("../../../lib/dateTimeHelper");
const parseDefault = (value) => {
    var _a;
    try {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        else {
            return (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : null;
        }
    }
    catch (_b) {
        return null;
    }
};
exports.parseDefault = parseDefault;
const parseIntValue = (value, col) => {
    if ((0, is_1.ncIsNaN)(value)) {
        return null;
    }
    value = parseInt(value.toString(), 10);
    const columnMeta = (0, helperFunctions_1.parseProp)(col === null || col === void 0 ? void 0 : col.meta);
    if (columnMeta.isLocaleString) {
        return Number(value).toLocaleString();
    }
    return Number(value);
};
exports.parseIntValue = parseIntValue;
const parseDecimalValue = (value, col) => {
    var _a, _b, _c, _d;
    if ((0, is_1.ncIsNaN)(value)) {
        return null;
    }
    const columnMeta = (0, helperFunctions_1.parseProp)(col.meta);
    if (columnMeta.isLocaleString) {
        return Number((0, helperFunctions_1.roundUpToPrecision)(Number(value), (_a = columnMeta.precision) !== null && _a !== void 0 ? _a : 1)).toLocaleString(undefined, {
            minimumFractionDigits: (_b = columnMeta.precision) !== null && _b !== void 0 ? _b : 1,
            maximumFractionDigits: (_c = columnMeta.precision) !== null && _c !== void 0 ? _c : 1,
        });
    }
    return (0, helperFunctions_1.roundUpToPrecision)(Number(value), (_d = columnMeta.precision) !== null && _d !== void 0 ? _d : 1);
};
exports.parseDecimalValue = parseDecimalValue;
const parsePercentValue = (value) => {
    if ((0, is_1.ncIsNaN)(value)) {
        return null;
    }
    return `${Number(value)}%`;
};
exports.parsePercentValue = parsePercentValue;
const parseDurationValue = (value, col) => {
    var _a;
    const durationType = ((_a = (0, helperFunctions_1.parseProp)(col.meta)) === null || _a === void 0 ? void 0 : _a.duration) || 0;
    return (0, durationUtils_1.convertMS2Duration)(value, durationType);
};
exports.parseDurationValue = parseDurationValue;
const parseCheckboxValue = (value) => {
    if ((0, is_1.ncIsBoolean)(value))
        return value;
    if ((0, is_1.ncIsString)(value)) {
        const strval = value.trim().toLowerCase();
        if (strval === 'true' || strval === '1')
            return true;
        if (strval === 'false' || strval === '0' || strval === '')
            return false;
    }
    if ((0, is_1.ncIsNumber)(value)) {
        if (value === 1)
            return true;
        if (value === 0)
            return false;
    }
    return null;
};
exports.parseCheckboxValue = parseCheckboxValue;
const parseJsonValue = (value) => {
    try {
        return (0, is_1.ncIsString)(value)
            ? JSON.stringify(JSON.parse(value)) // Ensure it's a valid JSON string
            : JSON.stringify(value); // Convert object/array to JSON
    }
    catch (_a) {
        return null;
    }
};
exports.parseJsonValue = parseJsonValue;
const parseCurrencyValue = (value, col) => {
    if ((0, is_1.ncIsNaN)(value)) {
        return null;
    }
    const columnMeta = (0, helperFunctions_1.parseProp)(col.meta);
    try {
        return new Intl.NumberFormat(columnMeta.currency_locale || 'en-US', {
            style: 'currency',
            currency: columnMeta.currency_code || 'USD',
        }).format(+value);
    }
    catch (_a) {
        return value;
    }
};
exports.parseCurrencyValue = parseCurrencyValue;
const parseDateValue = (value, col, isSystemCol) => {
    var _a, _b;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    const dateFormat = !isSystemCol
        ? (_b = (_a = (0, helperFunctions_1.parseProp)(col.meta)) === null || _a === void 0 ? void 0 : _a.date_format) !== null && _b !== void 0 ? _b : 'YYYY-MM-DD'
        : 'YYYY-MM-DD HH:mm:ss';
    if (!value || !(0, dayjs_1.default)(value).isValid()) {
        return null;
    }
    else {
        value = value === null || value === void 0 ? void 0 : value.toString().trim();
        return (0, dayjs_1.default)(/^\d+$/.test(value) ? +value : value).format(dateFormat);
    }
};
exports.parseDateValue = parseDateValue;
const parseDateTimeValue = (value, params) => {
    var _a;
    // remove `"`
    // e.g. "2023-05-12T08:03:53.000Z" -> 2023-05-12T08:03:53.000Z
    value = value.replace(/["']/g, '');
    const isMySQL = (_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id);
    let d = (0, dayjs_1.default)(value);
    if (!d.isValid()) {
        // insert a datetime value, copy the value without refreshing
        // e.g. value = 2023-05-12T03:49:25.000Z
        // feed custom parse format
        d = (0, dayjs_1.default)(value, isMySQL ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ');
    }
    // users can change the datetime format in UI
    // `value` would be always in YYYY-MM-DD HH:mm:ss(Z / +xx:yy) format
    // therefore, here we reformat to the correct datetime format based on the meta
    value = d.format((0, dateTimeHelper_1.constructDateTimeFormat)(params.col));
    if (!d.isValid()) {
        // return empty string for invalid datetime
        return null;
    }
    return value;
};
exports.parseDateTimeValue = parseDateTimeValue;
const parseTimeValue = (value, params) => {
    var _a, _b;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    // remove `"`
    // e.g. "2023-05-12T08:03:53.000Z" -> 2023-05-12T08:03:53.000Z
    value = value.replace(/["']/g, '');
    const isMySQL = (_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id);
    const isPostgres = (_b = params.isPg) === null || _b === void 0 ? void 0 : _b.call(params, params.col.source_id);
    let d = (0, dayjs_1.default)(value);
    if (!d.isValid()) {
        // insert a datetime value, copy the value without refreshing
        // e.g. value = 2023-05-12T03:49:25.000Z
        // feed custom parse format
        d = (0, dayjs_1.default)(value, isMySQL ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ');
    }
    if (!d.isValid()) {
        // MySQL and Postgres store time in HH:mm:ss format so we need to feed custom parse format
        d = isMySQL || isPostgres ? (0, dayjs_1.default)(value, 'HH:mm:ss') : (0, dayjs_1.default)(value);
    }
    if (!d.isValid()) {
        // return empty string for invalid time
        return null;
    }
    return d.format((0, dateTimeHelper_1.constructTimeFormat)(params.col));
};
exports.parseTimeValue = parseTimeValue;
const parseYearValue = (value) => {
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value || !(0, dayjs_1.default)(value).isValid()) {
        return null;
    }
    value = (0, dayjs_1.default)(value, 'YYYY').format('YYYY');
    return value ? +value : value;
};
exports.parseYearValue = parseYearValue;
const parseUserValue = (value, withDisplayName = false) => {
    let data = value;
    try {
        if (typeof value === 'string') {
            data = JSON.parse(value);
        }
    }
    catch (_a) { }
    return ((0, is_1.ncIsArray)(data) ? data : (0, is_1.ncIsObject)(data) ? [data] : [])
        .map((user) => withDisplayName && user.display_name
        ? `${user.display_name}<${user.email}>`
        : `${user.email}`)
        .join(', ');
};
exports.parseUserValue = parseUserValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvdXRpbHMvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUUxQix1REFBeUQ7QUFDekQsMkRBQXNFO0FBQ3RFLGlDQU9rQjtBQUVsQix5REFHOEI7QUFFdkIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7SUFDekMsSUFBSSxDQUFDO1FBQ0gsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsRUFBRSxtQ0FBSSxJQUFJLENBQUM7UUFDbkMsQ0FBQztJQUNILENBQUM7SUFBQyxXQUFNLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUM7QUFWVyxRQUFBLFlBQVksZ0JBVXZCO0FBRUssTUFBTSxhQUFhLEdBQUcsQ0FDM0IsS0FBNkIsRUFDN0IsR0FBZ0IsRUFDaEIsRUFBRTtJQUNGLElBQUksSUFBQSxZQUFPLEVBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV2QyxNQUFNLFVBQVUsR0FBRyxJQUFBLDJCQUFTLEVBQUMsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDO0lBRXhDLElBQUksVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNB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
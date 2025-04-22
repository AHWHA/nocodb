"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructTimeFormat = exports.constructDateFormat = exports.constructDateTimeFormat = exports.isValidTimeFormat = exports.timeAgo = exports.validateDateFormat = exports.handleTZ = exports.convertToTargetFormat = exports.parseStringDateTime = exports.parseStringDate = exports.getDateTimeFormat = exports.getDateFormat = exports.validateDateWithUnknownFormat = exports.isDateMonthFormat = exports.dateFormats = exports.timeFormats = exports.dateMonthFormats = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const relativeTime_js_1 = __importDefault(require("dayjs/plugin/relativeTime.js"));
const customParseFormat_js_1 = __importDefault(require("dayjs/plugin/customParseFormat.js"));
const duration_js_1 = __importDefault(require("dayjs/plugin/duration.js"));
const utc_js_1 = __importDefault(require("dayjs/plugin/utc.js"));
const weekday_js_1 = __importDefault(require("dayjs/plugin/weekday.js"));
const timezone_js_1 = __importDefault(require("dayjs/plugin/timezone.js"));
const helperFunctions_1 = require("./helperFunctions");
dayjs_1.default.extend(utc_js_1.default);
dayjs_1.default.extend(relativeTime_js_1.default);
dayjs_1.default.extend(customParseFormat_js_1.default);
dayjs_1.default.extend(duration_js_1.default);
dayjs_1.default.extend(weekday_js_1.default);
dayjs_1.default.extend(timezone_js_1.default);
exports.dateMonthFormats = ['YYYY-MM', 'YYYY MM'];
exports.timeFormats = ['HH:mm', 'HH:mm:ss', 'HH:mm:ss.SSS'];
exports.dateFormats = [
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'MM-DD-YYYY',
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'DD MM YYYY',
    'MM DD YYYY',
    'YYYY MM DD',
];
const isDateMonthFormat = (format) => exports.dateMonthFormats.includes(format);
exports.isDateMonthFormat = isDateMonthFormat;
function validateDateWithUnknownFormat(v) {
    for (const format of exports.dateFormats) {
        if ((0, dayjs_1.default)(v, format, true).isValid()) {
            return true;
        }
        for (const timeFormat of exports.timeFormats) {
            if ((0, dayjs_1.default)(v, `${format} ${timeFormat}`, true).isValid()) {
                return true;
            }
        }
    }
    return false;
}
exports.validateDateWithUnknownFormat = validateDateWithUnknownFormat;
function getDateFormat(v) {
    for (const format of exports.dateFormats.concat(exports.dateMonthFormats)) {
        if ((0, dayjs_1.default)(v, format, true).isValid()) {
            return format;
        }
    }
    return 'YYYY/MM/DD';
}
exports.getDateFormat = getDateFormat;
function getDateTimeFormat(v) {
    for (const format of exports.dateFormats) {
        for (const timeFormat of exports.timeFormats) {
            const dateTimeFormat = `${format} ${timeFormat}`;
            if ((0, dayjs_1.default)(v, dateTimeFormat, true).isValid()) {
                return dateTimeFormat;
            }
        }
    }
    return 'YYYY/MM/DD HH:mm';
}
exports.getDateTimeFormat = getDateTimeFormat;
function parseStringDate(v, dateFormat) {
    const dayjsObj = (0, dayjs_1.default)(v);
    if (dayjsObj.isValid()) {
        v = dayjsObj.format('YYYY-MM-DD');
    }
    else {
        v = (0, dayjs_1.default)(v, dateFormat).format('YYYY-MM-DD');
    }
    return v;
}
exports.parseStringDate = parseStringDate;
function parseStringDateTime(v, dateTimeFormat = `${exports.dateFormats[0]} ${exports.timeFormats[0]}`, toLocal = true) {
    const dayjsObj = toLocal ? (0, dayjs_1.default)(v).local() : (0, dayjs_1.default)(v);
    if (dayjsObj.isValid()) {
        v = dayjsObj.format(dateTimeFormat);
    }
    else {
        v = toLocal
            ? (0, dayjs_1.default)(v, dateTimeFormat).local().format(dateTimeFormat)
            : (0, dayjs_1.default)(v, dateTimeFormat).format(dateTimeFormat);
    }
    return v;
}
exports.parseStringDateTime = parseStringDateTime;
function convertToTargetFormat(v, oldDataFormat, newDateFormat) {
    if (!exports.dateFormats.includes(oldDataFormat) ||
        !exports.dateFormats.includes(newDateFormat))
        return v;
    return (0, dayjs_1.default)(v, oldDataFormat).format(newDateFormat);
}
exports.convertToTargetFormat = convertToTargetFormat;
const handleTZ = (val) => {
    if (val === undefined || val === null) {
        return;
    }
    if (typeof val !== 'string') {
        return val;
    }
    return val.replace(
    // match and extract dates and times in the ISO 8601 format
    /((?:-?(?:[1-9][0-9]*)?[0-9]{4})-(?:1[0-2]|0[1-9])-(?:3[01]|0[1-9]|[12][0-9])T(?:2[0-3]|[01][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])(?:\.[0-9]+)?(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9]))/g, (_, v) => {
        return (0, dayjs_1.default)(v).format('YYYY-MM-DD HH:mm');
    });
};
exports.handleTZ = handleTZ;
function validateDateFormat(v) {
    return exports.dateFormats.includes(v);
}
exports.validateDateFormat = validateDateFormat;
const timeAgo = (date) => {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
        // if there is no timezone info, consider as UTC
        // e.g. 2023-01-01 08:00:00 (MySQL)
        date += '+00:00';
    }
    // show in local time
    return (0, dayjs_1.default)(date).fromNow();
};
exports.timeAgo = timeAgo;
const isValidTimeFormat = (value, format) => {
    const regexValidator = {
        [exports.timeFormats[0]]: /^([01]\d|2[0-3]):[0-5]\d$/,
        [exports.timeFormats[1]]: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
        [exports.timeFormats[2]]: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}$/,
    };
    if (regexValidator[format]) {
        return regexValidator[format].test(value);
    }
    return false;
};
exports.isValidTimeFormat = isValidTimeFormat;
function constructDateTimeFormat(column) {
    const dateFormat = constructDateFormat(column);
    const timeFormat = constructTimeFormat(column);
    return `${dateFormat} ${timeFormat}`;
}
exports.constructDateTimeFormat = constructDateTimeFormat;
function constructDateFormat(column) {
    var _a, _b;
    return (_b = (_a = (0, helperFunctions_1.parseProp)(column === null || column === void 0 ? void 0 : column.meta)) === null || _a === void 0 ? void 0 : _a.date_format) !== null && _b !== void 0 ? _b : exports.dateFormats[0];
}
exports.constructDateFormat = constructDateFormat;
function constructTimeFormat(column) {
    var _a;
    const columnMeta = (0, helperFunctions_1.parseProp)(column === null || column === void 0 ? void 0 : column.meta);
    return (columnMeta === null || columnMeta === void 0 ? void 0 : columnMeta.is12hrFormat)
        ? 'hh:mm A'
        : (_a = columnMeta.time_format) !== null && _a !== void 0 ? _a : exports.timeFormats[0];
}
exports.constructTimeFormat = constructTimeFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RhdGVUaW1lSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixtRkFBd0Q7QUFDeEQsNkZBQWtFO0FBQ2xFLDJFQUFnRDtBQUNoRCxpRUFBc0M7QUFDdEMseUVBQThDO0FBQzlDLDJFQUFnRDtBQUVoRCx1REFBOEM7QUFFOUMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBRyxDQUFDLENBQUM7QUFDbEIsZUFBSyxDQUFDLE1BQU0sQ0FBQyx5QkFBWSxDQUFDLENBQUM7QUFDM0IsZUFBSyxDQUFDLE1BQU0sQ0FBQyw4QkFBaUIsQ0FBQyxDQUFDO0FBQ2hDLGVBQUssQ0FBQyxNQUFNLENBQUMscUJBQVEsQ0FBQyxDQUFDO0FBQ3ZCLGVBQUssQ0FBQyxNQUFNLENBQUMsb0JBQU8sQ0FBQyxDQUFDO0FBQ3RCLGVBQUssQ0FBQyxNQUFNLENBQUMscUJBQVEsQ0FBQyxDQUFDO0FBRVYsUUFBQSxnQkFBZ0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUUxQyxRQUFBLFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFcEQsUUFBQSxXQUFXLEdBQUc7SUFDekIsWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0NBQ2IsQ0FBQztBQUVLLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUNsRCx3QkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFEdkIsUUFBQSxpQkFBaUIscUJBQ007QUFFcEMsU0FBZ0IsNkJBQTZCLENBQUMsQ0FBUztJQUNyRCxLQUFLLE1BQU0sTUFBTSxJQUFJLG1CQUFXLEVBQUUs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
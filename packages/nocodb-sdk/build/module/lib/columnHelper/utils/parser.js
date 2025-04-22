import dayjs from 'dayjs';
import { convertMS2Duration } from '../../../lib/durationUtils';
import { parseProp, roundUpToPrecision } from '../../../lib/helperFunctions';
import { ncIsArray, ncIsBoolean, ncIsNaN, ncIsNumber, ncIsObject, ncIsString, } from '../../../lib/is';
import { constructDateTimeFormat, constructTimeFormat, } from '../../../lib/dateTimeHelper';
export const parseDefault = (value) => {
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
export const parseIntValue = (value, col) => {
    if (ncIsNaN(value)) {
        return null;
    }
    value = parseInt(value.toString(), 10);
    const columnMeta = parseProp(col === null || col === void 0 ? void 0 : col.meta);
    if (columnMeta.isLocaleString) {
        return Number(value).toLocaleString();
    }
    return Number(value);
};
export const parseDecimalValue = (value, col) => {
    var _a, _b, _c, _d;
    if (ncIsNaN(value)) {
        return null;
    }
    const columnMeta = parseProp(col.meta);
    if (columnMeta.isLocaleString) {
        return Number(roundUpToPrecision(Number(value), (_a = columnMeta.precision) !== null && _a !== void 0 ? _a : 1)).toLocaleString(undefined, {
            minimumFractionDigits: (_b = columnMeta.precision) !== null && _b !== void 0 ? _b : 1,
            maximumFractionDigits: (_c = columnMeta.precision) !== null && _c !== void 0 ? _c : 1,
        });
    }
    return roundUpToPrecision(Number(value), (_d = columnMeta.precision) !== null && _d !== void 0 ? _d : 1);
};
export const parsePercentValue = (value) => {
    if (ncIsNaN(value)) {
        return null;
    }
    return `${Number(value)}%`;
};
export const parseDurationValue = (value, col) => {
    var _a;
    const durationType = ((_a = parseProp(col.meta)) === null || _a === void 0 ? void 0 : _a.duration) || 0;
    return convertMS2Duration(value, durationType);
};
export const parseCheckboxValue = (value) => {
    if (ncIsBoolean(value))
        return value;
    if (ncIsString(value)) {
        const strval = value.trim().toLowerCase();
        if (strval === 'true' || strval === '1')
            return true;
        if (strval === 'false' || strval === '0' || strval === '')
            return false;
    }
    if (ncIsNumber(value)) {
        if (value === 1)
            return true;
        if (value === 0)
            return false;
    }
    return null;
};
export const parseJsonValue = (value) => {
    try {
        return ncIsString(value)
            ? JSON.stringify(JSON.parse(value)) // Ensure it's a valid JSON string
            : JSON.stringify(value); // Convert object/array to JSON
    }
    catch (_a) {
        return null;
    }
};
export const parseCurrencyValue = (value, col) => {
    if (ncIsNaN(value)) {
        return null;
    }
    const columnMeta = parseProp(col.meta);
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
export const parseDateValue = (value, col, isSystemCol) => {
    var _a, _b;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    const dateFormat = !isSystemCol
        ? (_b = (_a = parseProp(col.meta)) === null || _a === void 0 ? void 0 : _a.date_format) !== null && _b !== void 0 ? _b : 'YYYY-MM-DD'
        : 'YYYY-MM-DD HH:mm:ss';
    if (!value || !dayjs(value).isValid()) {
        return null;
    }
    else {
        value = value === null || value === void 0 ? void 0 : value.toString().trim();
        return dayjs(/^\d+$/.test(value) ? +value : value).format(dateFormat);
    }
};
export const parseDateTimeValue = (value, params) => {
    var _a;
    // remove `"`
    // e.g. "2023-05-12T08:03:53.000Z" -> 2023-05-12T08:03:53.000Z
    value = value.replace(/["']/g, '');
    const isMySQL = (_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id);
    let d = dayjs(value);
    if (!d.isValid()) {
        // insert a datetime value, copy the value without refreshing
        // e.g. value = 2023-05-12T03:49:25.000Z
        // feed custom parse format
        d = dayjs(value, isMySQL ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ');
    }
    // users can change the datetime format in UI
    // `value` would be always in YYYY-MM-DD HH:mm:ss(Z / +xx:yy) format
    // therefore, here we reformat to the correct datetime format based on the meta
    value = d.format(constructDateTimeFormat(params.col));
    if (!d.isValid()) {
        // return empty string for invalid datetime
        return null;
    }
    return value;
};
export const parseTimeValue = (value, params) => {
    var _a, _b;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    // remove `"`
    // e.g. "2023-05-12T08:03:53.000Z" -> 2023-05-12T08:03:53.000Z
    value = value.replace(/["']/g, '');
    const isMySQL = (_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id);
    const isPostgres = (_b = params.isPg) === null || _b === void 0 ? void 0 : _b.call(params, params.col.source_id);
    let d = dayjs(value);
    if (!d.isValid()) {
        // insert a datetime value, copy the value without refreshing
        // e.g. value = 2023-05-12T03:49:25.000Z
        // feed custom parse format
        d = dayjs(value, isMySQL ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ');
    }
    if (!d.isValid()) {
        // MySQL and Postgres store time in HH:mm:ss format so we need to feed custom parse format
        d = isMySQL || isPostgres ? dayjs(value, 'HH:mm:ss') : dayjs(value);
    }
    if (!d.isValid()) {
        // return empty string for invalid time
        return null;
    }
    return d.format(constructTimeFormat(params.col));
};
export const parseYearValue = (value) => {
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value || !dayjs(value).isValid()) {
        return null;
    }
    value = dayjs(value, 'YYYY').format('YYYY');
    return value ? +value : value;
};
export const parseUserValue = (value, withDisplayName = false) => {
    let data = value;
    try {
        if (typeof value === 'string') {
            data = JSON.parse(value);
        }
    }
    catch (_a) { }
    return (ncIsArray(data) ? data : ncIsObject(data) ? [data] : [])
        .map((user) => withDisplayName && user.display_name
        ? `${user.display_name}<${user.email}>`
        : `${user.email}`)
        .join(', ');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvdXRpbHMvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxHQUNYLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsbUJBQW1CLEdBQ3BCLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7O0lBQ3pDLElBQUksQ0FBQztRQUNILElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsbUNBQUksSUFBSSxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBQUMsV0FBTSxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQzNCLEtBQTZCLEVBQzdCLEdBQWdCLEVBQ2hCLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssR0FBRyxRQUFR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
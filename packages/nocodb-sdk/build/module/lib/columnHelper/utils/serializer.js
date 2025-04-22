import dayjs from 'dayjs';
import { getDateFormat, getDateTimeFormat } from '../../../lib/dateTimeHelper';
import { convertDurationToSeconds } from '../../../lib/durationUtils';
import { parseProp } from '../../../lib/helperFunctions';
import { ncIsBoolean, ncIsFunction, ncIsNaN, ncIsNumber, ncIsString, } from '../../../lib/is';
import UITypes from '../../../lib/UITypes';
import { SelectTypeConversionError } from '../../../lib/error';
/**
 * Remove outer quotes & unescape
 */
export const serializeStringValue = (value) => {
    var _a;
    value = (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : null;
    if (!value)
        return null;
    if (value.match(/^"[\s\S]*"$/)) {
        value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    return value;
};
export const serializeIntValue = (value) => {
    if (ncIsNumber(value)) {
        return parseInt(value.toString(), 10);
    }
    // If it's a string, remove commas and check if it's a valid number
    if (ncIsString(value)) {
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
export const serializeDecimalValue = (value, callback) => {
    if (ncIsNumber(value)) {
        return Number(value);
    }
    // If it's a string, remove commas and check if it's a valid number
    if (ncIsString(value)) {
        const cleanedValue = ncIsFunction(callback)
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
export const serializePercentValue = (value) => {
    if (ncIsNumber(value)) {
        return value;
    }
    // If it's a string, remove % and check if it's a valid number
    if (ncIsString(value)) {
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
export const serializeDurationValue = (value, col) => {
    var _a;
    // Check if the value is a pure number (interpreted as seconds)
    if (!ncIsNaN(value)) {
        return parseInt(value, 10); // Directly return seconds
    }
    const columnMeta = parseProp(col.meta);
    const res = convertDurationToSeconds(value, (_a = columnMeta.duration) !== null && _a !== void 0 ? _a : 0);
    return res._isValid ? res._sec : null;
};
export const serializeCheckboxValue = (value) => {
    if (ncIsBoolean(value))
        return value;
    if (ncIsString(value)) {
        const strval = value.trim().toLowerCase();
        if (strval === 'true' || strval === '1')
            return true;
        if (strval === 'false' || strval === '0' || strval === '')
            return false;
    }
    return null;
};
export const serializeJsonValue = (value) => {
    try {
        return ncIsString(value)
            ? JSON.stringify(JSON.parse(value)) // Ensure it's a valid JSON string
            : JSON.stringify(value); // Convert object/array to JSON
    }
    catch (_a) {
        return null;
    }
};
export const serializeCurrencyValue = (value) => {
    return serializeDecimalValue(value, (value) => {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.replace(/[^0-9.]/g, '')) === null || _a === void 0 ? void 0 : _a.trim();
    });
};
export const serializeDateOrDateTimeValue = (value, col) => {
    if (!value)
        return null;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    let parsedDateOrDateTime = dayjs(value, getDateTimeFormat(value));
    if (!parsedDateOrDateTime.isValid()) {
        parsedDateOrDateTime = dayjs(value, getDateFormat(value));
    }
    if (!parsedDateOrDateTime.isValid()) {
        return null;
    }
    return col.uidt === UITypes.Date
        ? parsedDateOrDateTime.format('YYYY-MM-DD')
        : parsedDateOrDateTime.utc().format('YYYY-MM-DD HH:mm:ssZ');
};
export const serializeTimeValue = (value, params) => {
    var _a;
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    let parsedTime = dayjs(value);
    if (!parsedTime.isValid()) {
        parsedTime = dayjs(value, 'HH:mm:ss');
    }
    if (!parsedTime.isValid()) {
        parsedTime = dayjs(`1999-01-01 ${value}`);
    }
    if (!parsedTime.isValid()) {
        return null;
    }
    const dateFormat = ((_a = params.isMysql) === null || _a === void 0 ? void 0 : _a.call(params, params.col.source_id))
        ? 'YYYY-MM-DD HH:mm:ss'
        : 'YYYY-MM-DD HH:mm:ssZ';
    return parsedTime.format(dateFormat);
};
export const serializeYearValue = (value) => {
    value = value === null || value === void 0 ? void 0 : value.toString().trim();
    if (!value)
        return null;
    const parsedDate = dayjs(value === null || value === void 0 ? void 0 : value.toString());
    return parsedDate.isValid() ? +parsedDate.format('YYYY') : null;
};
export const serializeSelectValue = (value, col) => {
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
    if (vals.length && col.uidt === UITypes.SingleSelect) {
        vals = [vals[0]];
    }
    // return null if no valid values
    if (invalidVals.length > 0) {
        throw new SelectTypeConversionError(vals, invalidVals);
    }
    return vals.join(',');
};
export const serializeEmail = (v) => {
    const matches = v.match(/(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})/i);
    return matches ? matches[0] : null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL3V0aWxzL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osT0FBTyxFQUNQLFVBQVUsRUFDVixVQUFVLEdBQ1gsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBRXBDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7O0lBQ2pELEtBQUssR0FBRyxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsbUNBQUksSUFBSSxDQUFDO0lBRWxDLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFeEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDL0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQTZCLEVB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
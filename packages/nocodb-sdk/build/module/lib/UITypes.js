import { ButtonActionsType, } from './Api';
import { FormulaDataTypes } from './formulaHelpers';
import { LongTextAiMetaProp, RelationTypes } from '../lib/globals';
import { parseProp } from './helperFunctions';
var UITypes;
(function (UITypes) {
    UITypes["ID"] = "ID";
    UITypes["LinkToAnotherRecord"] = "LinkToAnotherRecord";
    UITypes["ForeignKey"] = "ForeignKey";
    UITypes["Lookup"] = "Lookup";
    UITypes["SingleLineText"] = "SingleLineText";
    UITypes["LongText"] = "LongText";
    UITypes["Attachment"] = "Attachment";
    UITypes["Checkbox"] = "Checkbox";
    UITypes["MultiSelect"] = "MultiSelect";
    UITypes["SingleSelect"] = "SingleSelect";
    UITypes["Collaborator"] = "Collaborator";
    UITypes["Date"] = "Date";
    UITypes["Year"] = "Year";
    UITypes["Time"] = "Time";
    UITypes["PhoneNumber"] = "PhoneNumber";
    UITypes["GeoData"] = "GeoData";
    UITypes["Email"] = "Email";
    UITypes["URL"] = "URL";
    UITypes["Number"] = "Number";
    UITypes["Decimal"] = "Decimal";
    UITypes["Currency"] = "Currency";
    UITypes["Percent"] = "Percent";
    UITypes["Duration"] = "Duration";
    UITypes["Rating"] = "Rating";
    UITypes["Formula"] = "Formula";
    UITypes["Rollup"] = "Rollup";
    UITypes["Count"] = "Count";
    UITypes["DateTime"] = "DateTime";
    UITypes["CreatedTime"] = "CreatedTime";
    UITypes["LastModifiedTime"] = "LastModifiedTime";
    UITypes["AutoNumber"] = "AutoNumber";
    UITypes["Geometry"] = "Geometry";
    UITypes["JSON"] = "JSON";
    UITypes["SpecificDBType"] = "SpecificDBType";
    UITypes["Barcode"] = "Barcode";
    UITypes["QrCode"] = "QrCode";
    UITypes["Button"] = "Button";
    UITypes["Links"] = "Links";
    UITypes["User"] = "User";
    UITypes["CreatedBy"] = "CreatedBy";
    UITypes["LastModifiedBy"] = "LastModifiedBy";
    UITypes["Order"] = "Order";
})(UITypes || (UITypes = {}));
export const UITypesName = {
    [UITypes.ID]: 'ID',
    [UITypes.LinkToAnotherRecord]: 'Link to another record',
    [UITypes.ForeignKey]: 'Foreign key',
    [UITypes.Order]: 'Order',
    [UITypes.Lookup]: 'Lookup',
    [UITypes.SingleLineText]: 'Single line text',
    [UITypes.LongText]: 'Long text',
    RichText: 'Rich text',
    [UITypes.Attachment]: 'Attachment',
    [UITypes.Checkbox]: 'Checkbox',
    [UITypes.MultiSelect]: 'Multi select',
    [UITypes.SingleSelect]: 'Single select',
    [UITypes.Collaborator]: 'Collaborator',
    [UITypes.Date]: 'Date',
    [UITypes.Year]: 'Year',
    [UITypes.Time]: 'Time',
    [UITypes.PhoneNumber]: 'Phone number',
    [UITypes.GeoData]: 'Geo data',
    [UITypes.Email]: 'Email',
    [UITypes.URL]: 'URL',
    [UITypes.Number]: 'Number',
    [UITypes.Decimal]: 'Decimal',
    [UITypes.Currency]: 'Currency',
    [UITypes.Percent]: 'Percent',
    [UITypes.Duration]: 'Duration',
    [UITypes.Rating]: 'Rating',
    [UITypes.Formula]: 'Formula',
    [UITypes.Rollup]: 'Rollup',
    [UITypes.Count]: 'Count',
    [UITypes.DateTime]: 'Date time',
    [UITypes.CreatedTime]: 'Created time',
    [UITypes.LastModifiedTime]: 'Last modified time',
    [UITypes.AutoNumber]: 'Auto number',
    [UITypes.Geometry]: 'Geometry',
    [UITypes.JSON]: 'JSON',
    [UITypes.SpecificDBType]: 'Specific DB type',
    [UITypes.Barcode]: 'Barcode',
    [UITypes.QrCode]: 'Qr code',
    [UITypes.Button]: 'Button',
    [UITypes.Links]: 'Links',
    [UITypes.User]: 'User',
    [UITypes.CreatedBy]: 'Created by',
    [UITypes.LastModifiedBy]: 'Last modified by',
    AIButton: 'AI Button',
    AIPrompt: 'AI Prompt',
};
export const columnTypeName = (column) => {
    var _a, _b;
    if (!column)
        return '';
    switch (column.uidt) {
        case UITypes.LongText: {
            if ((_a = parseProp(column.meta)) === null || _a === void 0 ? void 0 : _a.richMode) {
                return UITypesName.RichText;
            }
            if (parseProp(column.meta)[LongTextAiMetaProp]) {
                return UITypesName.AIPrompt;
            }
            return UITypesName[column.uidt];
        }
        case UITypes.Button: {
            if (column.uidt === UITypes.Button &&
                ((_b = column === null || column === void 0 ? void 0 : column.colOptions) === null || _b === void 0 ? void 0 : _b.type) === 'ai') {
                return UITypesName.AIButton;
            }
            return UITypesName[column.uidt];
        }
        default: {
            return column.uidt ? UITypesName[column.uidt] : '';
        }
    }
};
export const FieldNameFromUITypes = {
    [UITypes.ID]: 'ID',
    [UITypes.LinkToAnotherRecord]: '{TableName}',
    [UITypes.ForeignKey]: 'Foreign key',
    [UITypes.Lookup]: '{FieldName} (from {TableName})',
    [UITypes.SingleLineText]: 'Text',
    [UITypes.LongText]: 'Notes',
    [UITypes.Attachment]: 'Attachment',
    [UITypes.Checkbox]: 'Done',
    [UITypes.MultiSelect]: 'Tags',
    [UITypes.SingleSelect]: 'Status',
    [UITypes.Collaborator]: 'User',
    [UITypes.Date]: 'Date',
    [UITypes.Year]: 'Year',
    [UITypes.Time]: 'Time',
    [UITypes.PhoneNumber]: 'Phone',
    [UITypes.GeoData]: 'Geo data',
    [UITypes.Email]: 'Email',
    [UITypes.URL]: 'URL',
    [UITypes.Number]: 'Number',
    [UITypes.Decimal]: 'Decimal',
    [UITypes.Currency]: 'Currency',
    [UITypes.Percent]: 'Percent',
    [UITypes.Duration]: 'Duration',
    [UITypes.Rating]: 'Rating',
    [UITypes.Formula]: 'Formula',
    [UITypes.Rollup]: '{RollupFunction}({FieldName}) from {TableName}',
    [UITypes.Count]: 'Count',
    [UITypes.DateTime]: 'Date time',
    [UITypes.CreatedTime]: 'Created time',
    [UITypes.LastModifiedTime]: 'Last modified time',
    [UITypes.AutoNumber]: 'Auto number',
    [UITypes.Geometry]: 'Geometry',
    [UITypes.JSON]: 'JSON',
    [UITypes.SpecificDBType]: 'Specific DB type',
    [UITypes.Barcode]: 'Barcode',
    [UITypes.QrCode]: 'Qr code',
    [UITypes.Button]: 'Button',
    [UITypes.Links]: '{TableName}',
    [UITypes.User]: 'User',
    [UITypes.CreatedBy]: 'Created by',
    [UITypes.LastModifiedBy]: 'Last modified by',
    [UITypes.Order]: 'Order',
};
export const numericUITypes = [
    UITypes.Duration,
    UITypes.Currency,
    UITypes.Percent,
    UITypes.Number,
    UITypes.Decimal,
    UITypes.Rating,
    UITypes.Rollup,
    UITypes.Year,
    UITypes.Links,
    UITypes.ID,
];
export function isNumericCol(col) {
    return numericUITypes.includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
export function isVirtualCol(col) {
    return [
        // Shouldn't be treated as virtual column (Issue with SQL View column data display)
        // UITypes.SpecificDBType,
        UITypes.LinkToAnotherRecord,
        UITypes.Formula,
        UITypes.QrCode,
        UITypes.Barcode,
        UITypes.Rollup,
        UITypes.Lookup,
        UITypes.Links,
        UITypes.CreatedTime,
        UITypes.LastModifiedTime,
        UITypes.CreatedBy,
        UITypes.LastModifiedBy,
        UITypes.Button,
        // UITypes.Count,
    ].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
export function isAIPromptCol(col) {
    var _a;
    return (col.uidt === UITypes.LongText &&
        ((_a = parseProp(col === null || col === void 0 ? void 0 : col.meta)) === null || _a === void 0 ? void 0 : _a[LongTextAiMetaProp]));
}
export function isCreatedOrLastModifiedTimeCol(col) {
    return [UITypes.CreatedTime, UITypes.LastModifiedTime].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
export function isCreatedOrLastModifiedByCol(col) {
    return [UITypes.CreatedBy, UITypes.LastModifiedBy].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
export function isOrderCol(col) {
    return [UITypes.Order].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
export function isActionButtonCol(col) {
    var _a;
    return (col.uidt === UITypes.Button &&
        [
            ButtonActionsType.Script,
            ButtonActionsType.Webhook,
            ButtonActionsType.Ai,
        ].includes((_a = col === null || col === void 0 ? void 0 : col.colOptions) === null || _a === void 0 ? void 0 : _a.type));
}
export function isHiddenCol(col, tableMeta) {
    var _a, _b;
    if (!col.system)
        return false;
    // hide belongs to column in mm tables only
    if (col.uidt === UITypes.LinkToAnotherRecord) {
        if (((_a = col.colOptions) === null || _a === void 0 ? void 0 : _a.type) === RelationTypes.BELONGS_TO && (tableMeta === null || tableMeta === void 0 ? void 0 : tableMeta.mm)) {
            return true;
        }
        // hide system columns in other tables which are has-many used for mm
        return ((_b = col.colOptions) === null || _b === void 0 ? void 0 : _b.type) === RelationTypes.HAS_MANY;
    }
    if (col.uidt === UITypes.Order) {
        return true;
    }
    return [UITypes.CreatedBy, UITypes.LastModifiedBy].includes(col.uidt);
}
export function isLinksOrLTAR(colOrUidt) {
    return [UITypes.LinkToAnotherRecord, UITypes.Links].includes((typeof colOrUidt === 'object' ? colOrUidt === null || colOrUidt === void 0 ? void 0 : colOrUidt.uidt : colOrUidt));
}
export function isSelfLinkCol(col) {
    var _a;
    return (isLinksOrLTAR(col) &&
        col.system &&
        // except has-many all other relation types are self link
        // has-many system column get created to mm table only
        ((_a = col.colOptions) === null || _a === void 0 ? void 0 : _a.type) !== RelationTypes.HAS_MANY);
}
export const getEquivalentUIType = ({ formulaColumn, }) => {
    var _a, _b;
    switch ((_b = (_a = formulaColumn === null || formulaColumn === void 0 ? void 0 : formulaColumn.colOptions) === null || _a === void 0 ? void 0 : _a.parsed_tree) === null || _b === void 0 ? void 0 : _b.dataType) {
        case FormulaDataTypes.NUMERIC:
            return UITypes.Number;
        case FormulaDataTypes.DATE:
            return UITypes.DateTime;
        case FormulaDataTypes.LOGICAL:
        case FormulaDataTypes.COND_EXP:
        case FormulaDataTypes.BOOLEAN:
            return UITypes.Checkbox;
    }
};
export const isSelectTypeCol = (colOrUidt) => {
    return [UITypes.SingleSelect, UITypes.MultiSelect, UITypes.User].includes((typeof colOrUidt === 'object' ? colOrUidt === null || colOrUidt === void 0 ? void 0 : colOrUidt.uidt : colOrUidt));
};
export default UITypes;
export const readonlyMetaAllowedTypes = [
    UITypes.Lookup,
    UITypes.Rollup,
    UITypes.Formula,
    UITypes.Button,
    UITypes.Barcode,
    UITypes.QrCode,
];
export const partialUpdateAllowedTypes = [
    // Single/Multi select is disabled for now since it involves updating type in some cases
    // UITypes.SingleSelect,
    // UITypes.MultiSelect,
    UITypes.Checkbox,
    UITypes.Number,
    UITypes.Decimal,
    UITypes.Currency,
    UITypes.Percent,
    UITypes.Duration,
    UITypes.Rating,
    UITypes.DateTime,
    UITypes.Date,
    UITypes.Time,
    UITypes.CreatedTime,
    UITypes.LastModifiedTime,
    UITypes.LinkToAnotherRecord,
    UITypes.Links,
    UITypes.PhoneNumber,
    UITypes.Email,
    UITypes.URL,
];
export const getUITypesForFormulaDataType = (dataType) => {
    switch (dataType) {
        case FormulaDataTypes.NUMERIC:
            return [
                UITypes.Decimal,
                UITypes.Currency,
                UITypes.Percent,
                UITypes.Rating,
                UITypes.Time,
            ];
        case FormulaDataTypes.DATE:
            return [UITypes.DateTime, UITypes.Date, UITypes.Time];
        case FormulaDataTypes.BOOLEAN:
        case FormulaDataTypes.COND_EXP:
            return [UITypes.Checkbox];
        case FormulaDataTypes.STRING:
            return [UITypes.Email, UITypes.URL, UITypes.PhoneNumber];
        default:
            return [];
    }
};
export const isSupportedDisplayValueColumn = (column) => {
    var _a;
    if (!(column === null || column === void 0 ? void 0 : column.uidt))
        return false;
    switch (column.uidt) {
        case UITypes.SingleLineText:
        case UITypes.Date:
        case UITypes.DateTime:
        case UITypes.Time:
        case UITypes.Year:
        case UITypes.PhoneNumber:
        case UITypes.Email:
        case UITypes.URL:
        case UITypes.Number:
        case UITypes.Currency:
        case UITypes.Percent:
        case UITypes.Duration:
        case UITypes.Decimal:
        case UITypes.Formula: {
            return true;
        }
        case UITypes.LongText: {
            if (((_a = parseProp(column.meta)) === null || _a === void 0 ? void 0 : _a.richMode) ||
                parseProp(column.meta)[LongTextAiMetaProp]) {
                return false;
            }
            return true;
        }
        default: {
            return false;
        }
    }
};
export const checkboxIconList = [
    {
        checked: 'mdi-check-bold',
        unchecked: 'mdi-crop-square',
        label: 'square',
    },
    {
        checked: 'mdi-check-circle-outline',
        unchecked: 'mdi-checkbox-blank-circle-outline',
        label: 'circle-check',
    },
    {
        checked: 'mdi-star',
        unchecked: 'mdi-star-outline',
        label: 'star',
    },
    {
        checked: 'mdi-heart',
        unchecked: 'mdi-heart-outline',
        label: 'heart',
    },
    {
        checked: 'mdi-moon-full',
        unchecked: 'mdi-moon-new',
        label: 'circle-filled',
    },
    {
        checked: 'mdi-thumb-up',
        unchecked: 'mdi-thumb-up-outline',
        label: 'thumbs-up',
    },
    {
        checked: 'mdi-flag',
        unchecked: 'mdi-flag-outline',
        label: 'flag',
    },
];
export const ratingIconList = [
    {
        full: 'mdi-star',
        empty: 'mdi-star-outline',
        label: 'star',
    },
    {
        full: 'mdi-heart',
        empty: 'mdi-heart-outline',
        label: 'heart',
    },
    {
        full: 'mdi-moon-full',
        empty: 'mdi-moon-new',
        label: 'circle-filled',
    },
    {
        full: 'mdi-thumb-up',
        empty: 'mdi-thumb-up-outline',
        label: 'thumbs-up',
    },
    {
        full: 'mdi-flag',
        empty: 'mdi-flag-outline',
        label: 'flag',
    },
];
export const durationOptions = [
    {
        id: 0,
        title: 'h:mm',
        example: '(e.g. 1:23)',
        regex: /(\d+)(?::(\d+))?/,
    },
    {
        id: 1,
        title: 'h:mm:ss',
        example: '(e.g. 3:45, 1:23:40)',
        regex: /(?=\d)(\d+)?(?::(\d+))?(?::(\d+))?/,
    },
    {
        id: 2,
        title: 'h:mm:ss.s',
        example: '(e.g. 3:34.6, 1:23:40.0)',
        regex: /(\d+)?(?::(\d+))?(?::(\d+))?(?:.(\d{0,4})?)?/,
    },
    {
        id: 3,
        title: 'h:mm:ss.ss',
        example: '(e.g. 3.45.67, 1:23:40.00)',
        regex: /(\d+)?(?::(\d+))?(?::(\d+))?(?:.(\d{0,4})?)?/,
    },
    {
        id: 4,
        title: 'h:mm:ss.sss',
        example: '(e.g. 3.45.678, 1:23:40.000)',
        regex: /(\d+)?(?::(\d+))?(?::(\d+))?(?:.(\d{0,4})?)?/,
    },
];
/**
 * Checks if a given column is read-only.
 * A column is considered read-only if it belongs to specific UI types
 * (e.g., Lookup, Rollup, Formula, etc.) or if it represents system-generated
 * metadata such as created/modified timestamps or ordering information.
 *
 * @param {ColumnType} column - The column to check.
 * @returns {boolean} - Returns `true` if the column is read-only, otherwise `false`.
 */
export const isReadOnlyColumn = (column) => {
    var _a;
    return (
    // Check if the column belongs to a predefined set of read-only UI types
    [
        UITypes.Lookup,
        UITypes.Rollup,
        UITypes.Formula,
        UITypes.Button,
        UITypes.Barcode,
        UITypes.QrCode,
        UITypes.ForeignKey,
    ].includes(column.uidt) ||
        // Check if the column is a system-generated user tracking field (CreatedBy, LastModifiedBy)
        isCreatedOrLastModifiedByCol(column) ||
        // Check if the column is a system-generated timestamp field (CreatedTime, LastModifiedTime)
        isCreatedOrLastModifiedTimeCol(column) ||
        // Check if the column is used for row ordering
        isOrderCol(column) ||
        // if primary key and auto generated then treat as readonly
        (column.pk && (column.ai || ((_a = parseProp(column.meta)) === null || _a === void 0 ? void 0 : _a.ag))));
};
/**
 * Determines whether a given column type represents a Date or DateTime field.
 *
 * @param column - The column type to check.
 * @returns `true` if the column is a Date, DateTime, CreatedTime, or LastModifiedTime field;
 *          `true` if it is a Formula column that evaluates to DateTime;
 *          otherwise, `false`.
 */
export const isDateOrDateTimeCol = (column) => {
    // Check if the column's UI type is one of the predefined date-related types
    if ([
        UITypes.Date,
        UITypes.DateTime,
        UITypes.CreatedTime,
        UITypes.LastModifiedTime,
    ].includes(column.uidt)) {
        return true;
    }
    // If the column is a Formula, determine if its evaluated type is DateTime
    if (column.uidt === UITypes.Formula) {
        return getEquivalentUIType({ formulaColumn: column }) === UITypes.DateTime;
    }
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVUlUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEdBS2xCLE1BQU0sT0FBTyxDQUFDO0FBQ2YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsSUFBSyxPQTJDSjtBQTNDRCxXQUFLLE9BQU87SUFDVixvQkFBUyxDQUFBO0lBQ1Qsc0RBQTJDLENBQUE7SUFDM0Msb0NBQXlCLENBQUE7SUFDekIsNEJBQWlCLENBQUE7SUFDakIsNENBQWlDLENBQUE7SUFDakMsZ0NBQXFCLENBQUE7SUFDckIsb0NBQXlCLENBQUE7SUFDekIsZ0NBQXFCLENBQUE7SUFDckIsc0NBQTJCLENBQUE7SUFDM0Isd0NBQTZCLENBQUE7SUFDN0Isd0NBQTZCLENBQUE7SUFDN0Isd0JBQWEsQ0FBQTtJQUNiLHdCQUFhLENBQUE7SUFDYix3QkFBYSxDQUFBO0lBQ2Isc0NBQTJCLENBQUE7SUFDM0IsOEJBQW1CLENBQUE7SUFDbkIsMEJBQWUsQ0FBQTtJQUNmLHNCQUFXLENBQUE7SUFDWCw0QkFBaUIsQ0FBQTtJQUNqQiw4QkFBbUIsQ0FBQTtJQUNuQixnQ0FBcUIsQ0FBQTtJQUNyQiw4QkFBbUIsQ0FBQTtJQUNuQixnQ0FBcUIsQ0FBQTtJQUNyQiw0QkFBaUIsQ0FBQTtJQUNqQiw4QkFBbUIsQ0FBQTtJQUNuQiw0QkFBaUIsQ0FBQTtJQUNqQiwwQkFBZSxDQUFBO0lBQ2YsZ0NBQXFCLENBQUE7SUFDckIsc0NBQTJCLENBQUE7SUFDM0IsZ0RBQXFDLENBQUE7SUFDckMsb0NBQXlCLENBQUE7SUFDekIsZ0NBQXFCLENBQUE7SUFDckIsd0JB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
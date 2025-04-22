"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateOrDateTimeCol = exports.isReadOnlyColumn = exports.durationOptions = exports.ratingIconList = exports.checkboxIconList = exports.isSupportedDisplayValueColumn = exports.getUITypesForFormulaDataType = exports.partialUpdateAllowedTypes = exports.readonlyMetaAllowedTypes = exports.isSelectTypeCol = exports.getEquivalentUIType = exports.isSelfLinkCol = exports.isLinksOrLTAR = exports.isHiddenCol = exports.isActionButtonCol = exports.isOrderCol = exports.isCreatedOrLastModifiedByCol = exports.isCreatedOrLastModifiedTimeCol = exports.isAIPromptCol = exports.isVirtualCol = exports.isNumericCol = exports.numericUITypes = exports.FieldNameFromUITypes = exports.columnTypeName = exports.UITypesName = void 0;
const Api_1 = require("./Api");
const formulaHelpers_1 = require("./formulaHelpers");
const globals_1 = require("../lib/globals");
const helperFunctions_1 = require("./helperFunctions");
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
exports.UITypesName = {
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
const columnTypeName = (column) => {
    var _a, _b;
    if (!column)
        return '';
    switch (column.uidt) {
        case UITypes.LongText: {
            if ((_a = (0, helperFunctions_1.parseProp)(column.meta)) === null || _a === void 0 ? void 0 : _a.richMode) {
                return exports.UITypesName.RichText;
            }
            if ((0, helperFunctions_1.parseProp)(column.meta)[globals_1.LongTextAiMetaProp]) {
                return exports.UITypesName.AIPrompt;
            }
            return exports.UITypesName[column.uidt];
        }
        case UITypes.Button: {
            if (column.uidt === UITypes.Button &&
                ((_b = column === null || column === void 0 ? void 0 : column.colOptions) === null || _b === void 0 ? void 0 : _b.type) === 'ai') {
                return exports.UITypesName.AIButton;
            }
            return exports.UITypesName[column.uidt];
        }
        default: {
            return column.uidt ? exports.UITypesName[column.uidt] : '';
        }
    }
};
exports.columnTypeName = columnTypeName;
exports.FieldNameFromUITypes = {
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
exports.numericUITypes = [
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
function isNumericCol(col) {
    return exports.numericUITypes.includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
exports.isNumericCol = isNumericCol;
function isVirtualCol(col) {
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
exports.isVirtualCol = isVirtualCol;
function isAIPromptCol(col) {
    var _a;
    return (col.uidt === UITypes.LongText &&
        ((_a = (0, helperFunctions_1.parseProp)(col === null || col === void 0 ? void 0 : col.meta)) === null || _a === void 0 ? void 0 : _a[globals_1.LongTextAiMetaProp]));
}
exports.isAIPromptCol = isAIPromptCol;
function isCreatedOrLastModifiedTimeCol(col) {
    return [UITypes.CreatedTime, UITypes.LastModifiedTime].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
exports.isCreatedOrLastModifiedTimeCol = isCreatedOrLastModifiedTimeCol;
function isCreatedOrLastModifiedByCol(col) {
    return [UITypes.CreatedBy, UITypes.LastModifiedBy].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
exports.isCreatedOrLastModifiedByCol = isCreatedOrLastModifiedByCol;
function isOrderCol(col) {
    return [UITypes.Order].includes((typeof col === 'object' ? col === null || col === void 0 ? void 0 : col.uidt : col));
}
exports.isOrderCol = isOrderCol;
function isActionButtonCol(col) {
    var _a;
    return (col.uidt === UITypes.Button &&
        [
            Api_1.ButtonActionsType.Script,
            Api_1.ButtonActionsType.Webhook,
            Api_1.ButtonActionsType.Ai,
        ].includes((_a = col === null || col === void 0 ? void 0 : col.colOptions) === null || _a === void 0 ? void 0 : _a.type));
}
exports.isActionButtonCol = isActionButtonCol;
function isHiddenCol(col, tableMeta) {
    var _a, _b;
    if (!col.system)
        return false;
    // hide belongs to column in mm tables only
    if (col.uidt === UITypes.LinkToAnotherRecord) {
        if (((_a = col.colOptions) === null || _a === void 0 ? void 0 : _a.type) === globals_1.RelationTypes.BELONGS_TO && (tableMeta === null || tableMeta === void 0 ? void 0 : tableMeta.mm)) {
            return true;
        }
        // hide system columns in other tables which are has-many used for mm
        return ((_b = col.colOptions) === null || _b === void 0 ? void 0 : _b.type) === globals_1.RelationTypes.HAS_MANY;
    }
    if (col.uidt === UITypes.Order) {
        return true;
    }
    return [UITypes.CreatedBy, UITypes.LastModifiedBy].includes(col.uidt);
}
exports.isHiddenCol = isHiddenCol;
function isLinksOrLTAR(colOrUidt) {
    return [UITypes.LinkToAnotherRecord, UITypes.Links].includes((typeof colOrUidt === 'object' ? colOrUidt === null || colOrUidt === void 0 ? void 0 : colOrUidt.uidt : colOrUidt));
}
exports.isLinksOrLTAR = isLinksOrLTAR;
function isSelfLinkCol(col) {
    var _a;
    return (isLinksOrLTAR(col) &&
        col.system &&
        // except has-many all other relation types are self link
        // has-many system column get created to mm table only
        ((_a = col.colOptions) === null || _a === void 0 ? void 0 : _a.type) !== globals_1.RelationTypes.HAS_MANY);
}
exports.isSelfLinkCol = isSelfLinkCol;
const getEquivalentUIType = ({ formulaColumn, }) => {
    var _a, _b;
    switch ((_b = (_a = formulaColumn === null || formulaColumn === void 0 ? void 0 : formulaColumn.colOptions) === null || _a === void 0 ? void 0 : _a.parsed_tree) === null || _b === void 0 ? void 0 : _b.dataType) {
        case formulaHelpers_1.FormulaDataTypes.NUMERIC:
            return UITypes.Number;
        case formulaHelpers_1.FormulaDataTypes.DATE:
            return UITypes.DateTime;
        case formulaHelpers_1.FormulaDataTypes.LOGICAL:
        case formulaHelpers_1.FormulaDataTypes.COND_EXP:
        case formulaHelpers_1.FormulaDataTypes.BOOLEAN:
            return UITypes.Checkbox;
    }
};
exports.getEquivalentUIType = getEquivalentUIType;
const isSelectTypeCol = (colOrUidt) => {
    return [UITypes.SingleSelect, UITypes.MultiSelect, UITypes.User].includes((typeof colOrUidt === 'object' ? colOrUidt === null || colOrUidt === void 0 ? void 0 : colOrUidt.uidt : colOrUidt));
};
exports.isSelectTypeCol = isSelectTypeCol;
exports.default = UITypes;
exports.readonlyMetaAllowedTypes = [
    UITypes.Lookup,
    UITypes.Rollup,
    UITypes.Formula,
    UITypes.Button,
    UITypes.Barcode,
    UITypes.QrCode,
];
exports.partialUpdateAllowedTypes = [
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
const getUITypesForFormulaDataType = (dataType) => {
    switch (dataType) {
        case formulaHelpers_1.FormulaDataTypes.NUMERIC:
            return [
                UITypes.Decimal,
                UITypes.Currency,
                UITypes.Percent,
                UITypes.Rating,
                UITypes.Time,
            ];
        case formulaHelpers_1.FormulaDataTypes.DATE:
            return [UITypes.DateTime, UITypes.Date, UITypes.Time];
        case formulaHelpers_1.FormulaDataTypes.BOOLEAN:
        case formulaHelpers_1.FormulaDataTypes.COND_EXP:
            return [UITypes.Checkbox];
        case formulaHelpers_1.FormulaDataTypes.STRING:
            return [UITypes.Email, UITypes.URL, UITypes.PhoneNumber];
        default:
            return [];
    }
};
exports.getUITypesForFormulaDataType = getUITypesForFormulaDataType;
const isSupportedDisplayValueColumn = (column) => {
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
            if (((_a = (0, helperFunctions_1.parseProp)(column.meta)) === null || _a === void 0 ? void 0 : _a.richMode) ||
                (0, helperFunctions_1.parseProp)(column.meta)[globals_1.LongTextAiMetaProp]) {
                return false;
            }
            return true;
        }
        default: {
            return false;
        }
    }
};
exports.isSupportedDisplayValueColumn = isSupportedDisplayValueColumn;
exports.checkboxIconList = [
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
exports.ratingIconList = [
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
exports.durationOptions = [
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
const isReadOnlyColumn = (column) => {
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
        (column.pk && (column.ai || ((_a = (0, helperFunctions_1.parseProp)(column.meta)) === null || _a === void 0 ? void 0 : _a.ag))));
};
exports.isReadOnlyColumn = isReadOnlyColumn;
/**
 * Determines whether a given column type represents a Date or DateTime field.
 *
 * @param column - The column type to check.
 * @returns `true` if the column is a Date, DateTime, CreatedTime, or LastModifiedTime field;
 *          `true` if it is a Formula column that evaluates to DateTime;
 *          otherwise, `false`.
 */
const isDateOrDateTimeCol = (column) => {
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
        return (0, exports.getEquivalentUIType)({ formulaColumn: column }) === UITypes.DateTime;
    }
    return false;
};
exports.isDateOrDateTimeCol = isDateOrDateTimeCol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVUlUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVUlUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFNZTtBQUNmLHFEQUFvRDtBQUNwRCwyQ0FBa0U7QUFDbEUsdURBQThDO0FBRTlDLElBQUssT0EyQ0o7QUEzQ0QsV0FBSyxPQUFPO0lBQ1Ysb0JBQVMsQ0FBQTtJQUNULHNEQUEyQyxDQUFBO0lBQzNDLG9DQUF5QixDQUFBO0lBQ3pCLDRCQUFpQixDQUFBO0lBQ2pCLDRDQUFpQyxDQUFBO0lBQ2pDLGdDQUFxQixDQUFBO0lBQ3JCLG9DQUF5QixDQUFBO0lBQ3pCLGdDQUFxQixDQUFBO0lBQ3JCLHNDQUEyQixDQUFBO0lBQzNCLHdDQUE2QixDQUFBO0lBQzdCLHdDQUE2QixDQUFBO0lBQzdCLHdCQUFhLENBQUE7SUFDYix3QkFBYSxDQUFBO0lBQ2Isd0JBQWEsQ0FBQTtJQUNiLHNDQUEyQixDQUFBO0lBQzNCLDhCQUFtQixDQUFBO0lBQ25CLDBCQUFlLENBQUE7SUFDZixzQkFBVyxDQUFBO0lBQ1gsNEJBQWlCLENBQUE7SUFDakIsOEJBQW1CLENBQUE7SUFDbkIsZ0NBQXFCLENBQUE7SUFDckIsOEJBQW1CLENBQUE7SUFDbkIsZ0NBQXFCLENBQUE7SUFDckIsNEJBQWlCLENBQUE7SUFDakIsOEJBQW1CLENBQUE7SUFDbkIsNEJBQWlCLENBQUE7SUFDakIsMEJBQWUsQ0FBQTtJQUNmLGdDQUFxQixDQUFBO0lBQ3JCLHNDQUEyQixDQUFBO0lBQzNCLGdEQUFxQyxDQUFBO0lBQ3JDLG9DQUF5QixDQUFBO0lBQ3pCLGdDQUFxQixDQUFBO0lBQ3JCLHdCQUFhLENBQUE7SUFDYiw0Q0FBaUMsQ0FBQTtJQUNqQyw4QkFBbUIsQ0FBQTtJQUNuQiw0QkFBaUIsQ0FBQTtJQUNqQiw0QkFBaUIsQ0FBQTtJQUNqQiwwQkFBZSxDQUFBO0lBQ2Ysd0JBQWEsQ0FBQTtJQUNiLGtDQUF1QixDQUFBO0lB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
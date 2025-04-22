"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCondition = exports.validateFilterComparison = exports.extractFilterFromXwhere = exports.IS_WITHIN_COMPARISON_SUB_OPS = exports.GROUPBY_COMPARISON_OPS = exports.COMPARISON_SUB_OPS = exports.COMPARISON_OPS = void 0;
const errorUtils_1 = require("../lib/errorUtils");
const index_1 = require("../lib/index");
var query_filter_lexer_1 = require("../lib/parser/queryFilter/query-filter-lexer");
Object.defineProperty(exports, "COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_OPS; } });
Object.defineProperty(exports, "COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_SUB_OPS; } });
Object.defineProperty(exports, "GROUPBY_COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.GROUPBY_COMPARISON_OPS; } });
Object.defineProperty(exports, "IS_WITHIN_COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.IS_WITHIN_COMPARISON_SUB_OPS; } });
function extractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    if (!str) {
        return { filters: [] };
    }
    // if array treat it as `and` group
    if (Array.isArray(str)) {
        const nestedFilters = str.map((s) => extractFilterFromXwhere(s, aliasColObjMap, throwErrorIfInvalid, errors));
        const filters = nestedFilters.reduce((acc, { filters }) => {
            if (!filters)
                return acc;
            return [...acc, ...filters];
        }, []);
        const collectedErrors = nestedFilters.reduce((acc, { errors }) => {
            if (!errors)
                return acc;
            return [...acc, ...errors];
        }, []);
        // If errors exist, return them
        if (collectedErrors.length > 0) {
            return { errors: collectedErrors };
        }
        // If there's only one filter, return it directly
        if (filters.length === 1) {
            return { filters };
        }
        // If there's only one filter, return it directly; otherwise, wrap in an AND group
        return {
            filters: [
                {
                    is_group: true,
                    logical_op: 'and',
                    children: filters,
                },
            ],
        };
    }
    // Validate input type
    if (typeof str !== 'string') {
        const error = {
            message: 'Invalid filter format. Expected string or array of strings.',
        };
        if (throwErrorIfInvalid)
            throw new Error(error.message);
        errors.push(error);
        return { errors };
    }
    let openIndex = str.indexOf('((');
    if (openIndex === -1)
        openIndex = str.indexOf('(~');
    // If it's a simple query, extract conditions directly
    if (openIndex === -1) {
        if (str !== '~not') {
            const nestedArrayConditions = str.split(/(?=~(?:or(?:not)?|and(?:not)?|not)\()/);
            return extractCondition(nestedArrayConditions, aliasColObjMap, throwErrorIfInvalid, errors);
        }
        return { filters: [] };
    }
    let closingIndex = str.indexOf('))');
    let nextOpenIndex = openIndex;
    // Iterate until the correct closing bracket is found
    while ((nextOpenIndex = str
        .substring(0, closingIndex)
        .indexOf('((', nextOpenIndex + 1)) !== -1) {
        closingIndex = str.indexOf('))', closingIndex + 1);
    }
    // If no closing bracket is found, return an error
    if (closingIndex === -1) {
        const error = {
            message: `${str
                .substring(0, openIndex + 1)
                .slice(-10)} : Closing bracket not found`,
        };
        if (throwErrorIfInvalid)
            throw new Error(error.message);
        errors.push(error);
        return { errors };
    }
    // Extract operator and left-hand side of nested query
    const operandStartIndex = str.lastIndexOf('~', openIndex);
    const operator = operandStartIndex !== -1
        ? str.substring(operandStartIndex + 1, openIndex)
        : '';
    const lhsOfNestedQuery = str.substring(0, openIndex);
    // Recursively process left-hand side, nested query, and right-hand side
    const lhsResult = extractFilterFromXwhere(lhsOfNestedQuery, aliasColObjMap, throwErrorIfInvalid, errors);
    const nestedQueryResult = extractFilterFromXwhere(str.substring(openIndex + 1, closingIndex + 1), aliasColObjMap, throwErrorIfInvalid, errors);
    const rhsResult = extractFilterFromXwhere(str.substring(closingIndex + 2), aliasColObjMap, throwErrorIfInvalid, errors);
    // If any errors occurred during recursion, return them
    if (lhsResult.errors || nestedQueryResult.errors || rhsResult.errors) {
        return {
            errors: [
                ...(lhsResult.errors || []),
                ...(nestedQueryResult.errors || []),
                ...(rhsResult.errors || []),
            ],
        };
    }
    // Return the combined filters
    return {
        filters: [
            ...(lhsResult.filters || []),
            {
                is_group: true,
                logical_op: operator,
                children: nestedQueryResult.filters || [],
            },
            ...(rhsResult.filters || []),
        ],
    };
}
exports.extractFilterFromXwhere = extractFilterFromXwhere;
/**
 * Validates a filter comparison operation and its sub-operation.
 *
 * @param {UITypes} uidt - The UI type to validate against.
 * @param {any} op - The main comparison operator.
 * @param {any} [sub_op] - The optional sub-operation.
 * @param {FilterParseError[]} [errors=[]] - An optional array to collect errors.
 * @returns {FilterParseError[]} - An array of validation errors, empty if no errors.
 *
 * This function checks if the given `op` is a valid comparison operator and, if a `sub_op` is provided,
 * ensures it is compatible with the given `uidt`. If any validation fails, errors are added to the array
 * and returned instead of throwing an exception.
 */
function validateFilterComparison(uidt, op, sub_op, errors = [], validateFilterComparison = false) {
    // Check if the main comparison operator is valid
    if (!index_1.COMPARISON_OPS.includes(op) && !index_1.GROUPBY_COMPARISON_OPS.includes(op)) {
        if (validateFilterComparison) {
            throw new errorUtils_1.BadRequest(`${op} is not supported.`);
        }
        errors.push({ message: `${op} is not supported.` });
    }
    if (sub_op) {
        // Ensure that sub-operators are only used with specific UI types
        if (![
            index_1.UITypes.Date,
            index_1.UITypes.DateTime,
            index_1.UITypes.CreatedTime,
            index_1.UITypes.LastModifiedTime,
        ].includes(uidt)) {
            if (validateFilterComparison) {
                throw new errorUtils_1.BadRequest(`'${sub_op}' is not supported for UI Type'${uidt}'.`);
            }
            errors.push({
                message: `'${sub_op}' is not supported for UI Type '${uidt}'.`,
            });
        }
        // Validate if the sub-operator exists in the allowed set
        if (!index_1.COMPARISON_SUB_OPS.includes(sub_op)) {
            if (validateFilterComparison) {
                throw new errorUtils_1.BadRequest(`'${sub_op}' is not supported.`);
            }
            errors.push({ message: `'${sub_op}' is not supported.` });
        }
        // Ensure `isWithin` has correct sub-operators, and other operators don't use `isWithin` sub-operators
        if ((op === 'isWithin' && !index_1.IS_WITHIN_COMPARISON_SUB_OPS.includes(sub_op)) ||
            (op !== 'isWithin' && index_1.IS_WITHIN_COMPARISON_SUB_OPS.includes(sub_op))) {
            if (validateFilterComparison) {
                throw new errorUtils_1.BadRequest(`'${sub_op}' is not supported for '${op}'`);
            }
            errors.push({ message: `'${sub_op}' is not supported for '${op}'.` });
        }
    }
    // Return collected errors, if any
    return errors.length > 0 ? errors : [];
}
exports.validateFilterComparison = validateFilterComparison;
function extractCondition(nestedArrayConditions, aliasColObjMap, throwErrorIfInvalid, errors) {
    if (!nestedArrayConditions || nestedArrayConditions.length === 0) {
        return { filters: [] };
    }
    const parsedFilters = nestedArrayConditions
        .map((str) => {
        var _a, _b, _c;
        let logicOp;
        let alias;
        let op;
        let value;
        [logicOp, alias, op, value] =
            ((_a = str.match(/(?:~(and|or|not))?\((.*?),(\w+),(.*)\)/)) === null || _a === void 0 ? void 0 : _a.slice(1)) || [];
        if (!alias && !op && !value) {
            // Attempt to match blank filter format
            [logicOp, alias, op, value] =
                ((_b = str.match(/(?:~(and|or|not))?\((.*?),(\w+)\)/)) === null || _b === void 0 ? void 0 : _b.slice(1)) || [];
        }
        // Normalize filter operations
        switch (op) {
            case 'is':
                if (value === 'blank') {
                    op = 'blank';
                    value = undefined;
                }
                else if (value === 'notblank') {
                    op = 'notblank';
                    value = undefined;
                }
                break;
            case 'isblank':
            case 'is_blank':
                op = 'blank';
                break;
            case 'isnotblank':
            case 'is_not_blank':
            case 'is_notblank':
                op = 'notblank';
                break;
        }
        let sub_op = null;
        if (aliasColObjMap[alias]) {
            const columnType = aliasColObjMap[alias].uidt;
            // Handle date and datetime values
            if ([
                index_1.UITypes.Date,
                index_1.UITypes.DateTime,
                index_1.UITypes.LastModifiedTime,
                index_1.UITypes.CreatedTime,
            ].includes(columnType)) {
                value = value === null || value === void 0 ? void 0 : value.split(',');
                sub_op = value === null || value === void 0 ? void 0 : value.shift();
                value = value === null || value === void 0 ? void 0 : value[0];
                if (sub_op === 'null') {
                    sub_op = undefined;
                    value = null;
                }
            }
            else if (op === 'in') {
                value = value.split(',');
            }
            validateFilterComparison(columnType, op, sub_op, errors, throwErrorIfInvalid);
        }
        else {
            const error = {
                message: alias
                    ? `Column alias '${alias}' not found.`
                    : 'Invalid filter format.',
            };
            if (throwErrorIfInvalid)
                throw new errorUtils_1.NcSDKError(error.message);
            errors.push(error);
            return null;
        }
        let columnId = (_c = aliasColObjMap[alias]) === null || _c === void 0 ? void 0 : _c.id;
        // If alias is not found, check if it matches a column ID directly
        if (!columnId &&
            Object.values(aliasColObjMap).some((col) => (col === null || col === void 0 ? void 0 : col.id) === alias)) {
            columnId = alias;
        }
        return Object.assign(Object.assign({ comparison_op: op }, (sub_op && {
            comparison_sub_op: sub_op,
        })), { fk_column_id: columnId, logical_op: logicOp, value });
    })
        .filter(Boolean);
    if (errors.length > 0) {
        return { errors };
    }
    return { filters: parsedFilters };
}
exports.extractCondition = extractCondition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVySGVscGVyc19vbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZpbHRlckhlbHBlcnNfb2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlEQUEwRDtBQUMxRCx1Q0FPcUI7QUFDckIsa0ZBS3FEO0FBSm5ELG9IQUFBLGNBQWMsT0FBQTtBQUNkLHdIQUFBLGtCQUFrQixPQUFBO0FBQ2xCLDRIQUFBLHNCQUFzQixPQUFBO0FBQ3RCLGtJQUFBLDRCQUE0QixPQUFBO0FBRzlCLFNBQWdCLHVCQUF1QixDQUNyQyxHQUFzQixFQUN0QixjQUFxRCxFQUNyRCxtQkFBbUIsR0FBRyxLQUFLLEVBQzNCLFNBQTZCLEVBQUU7SUFFL0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsbUNBQW1DO0lBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNsQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUN4RSxDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFB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
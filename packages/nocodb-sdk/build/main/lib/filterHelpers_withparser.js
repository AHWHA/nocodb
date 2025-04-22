"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFilterFromXwhere = exports.IS_WITHIN_COMPARISON_SUB_OPS = exports.GROUPBY_COMPARISON_OPS = exports.COMPARISON_SUB_OPS = exports.COMPARISON_OPS = void 0;
const errorUtils_1 = require("../lib/errorUtils");
const query_filter_parser_1 = require("../lib/parser/queryFilter/query-filter-parser");
const UITypes_1 = __importDefault(require("./UITypes"));
const filterHelpers_1 = require("./filterHelpers");
const invalid_filter_error_1 = require("./error/invalid-filter.error");
var query_filter_lexer_1 = require("../lib/parser/queryFilter/query-filter-lexer");
Object.defineProperty(exports, "COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_OPS; } });
Object.defineProperty(exports, "COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_SUB_OPS; } });
Object.defineProperty(exports, "GROUPBY_COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.GROUPBY_COMPARISON_OPS; } });
Object.defineProperty(exports, "IS_WITHIN_COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.IS_WITHIN_COMPARISON_SUB_OPS; } });
function extractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    if (!str) {
        return { filters: [] };
    }
    for (const columnName of Object.keys(aliasColObjMap)) {
        const column = aliasColObjMap[columnName];
        aliasColObjMap[column.id] = column;
    }
    return innerExtractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid, errors);
}
exports.extractFilterFromXwhere = extractFilterFromXwhere;
function innerExtractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    if (!str) {
        return { filters: [] };
    } // if array treat it as `and` group
    else if (Array.isArray(str)) {
        // calling recursively for nested query
        const nestedFilters = [].concat(...str.map((s) => extractFilterFromXwhere(s, aliasColObjMap, throwErrorIfInvalid)));
        // extract and flatten filters
        const filters = nestedFilters.reduce((acc, { filters }) => {
            if (!filters)
                return acc;
            return [...acc, ...filters];
        }, []);
        // extract and flatten errors
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
            return { filters: nestedFilters };
        }
        // Otherwise, wrap it in an AND group
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
    else if (typeof str !== 'string' && throwErrorIfInvalid) {
        const message = 'Invalid filter format. Expected string or array of strings.';
        if (throwErrorIfInvalid) {
            throw new Error(message);
        }
        else {
            errors.push({ message });
            return { errors };
        }
    }
    const parseResult = query_filter_parser_1.QueryFilterParser.parse(str);
    if ((parseResult.lexErrors.length > 0 || parseResult.parseErrors.length > 0) &&
        throwErrorIfInvalid) {
        if (throwErrorIfInvalid)
            throw new invalid_filter_error_1.InvalidFilterError({
                lexingError: parseResult.lexErrors,
                parsingError: parseResult.parseErrors,
            });
        else {
            errors.push({
                message: 'Invalid filter format.',
            });
            return { errors };
        }
    }
    const filterSubType = parseResult.parsedCst;
    const { filter, errors: parseErrors } = mapFilterGroupSubType(filterSubType, aliasColObjMap, throwErrorIfInvalid);
    if ((parseErrors === null || parseErrors === void 0 ? void 0 : parseErrors.length) > 0) {
        return { errors: parseErrors };
    }
    return { filters: [filter] };
}
function mapFilterGroupSubType(filter, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    const children = filter.children
        .map((k) => k.is_group
        ? mapFilterGroupSubType(k, aliasColObjMap, throwErrorIfInvalid, errors)
        : mapFilterClauseSubType(k, aliasColObjMap, throwErrorIfInvalid, errors))
        .filter((k) => k);
    if (children.length === 1) {
        return children[0];
    }
    else {
        return {
            filter: {
                is_group: filter.is_group,
                logical_op: filter.logical_op,
                children: children.map((k) => k.filter),
            },
        };
    }
}
function mapFilterClauseSubType(filter, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    const aliasCol = aliasColObjMap[filter.field];
    if (!aliasCol) {
        if (throwErrorIfInvalid) {
            throw new invalid_filter_error_1.InvalidFilterError({
                message: `Column '${filter.field}' not found.`
            });
        }
        else {
            errors.push({
                message: `Column '${filter.field}' not found.`,
            });
            return { errors };
        }
        return {};
    }
    const result = {
        fk_column_id: aliasCol.id,
        is_group: false,
        logical_op: filter.logical_op,
        comparison_op: filter.comparison_op,
        comparison_sub_op: undefined,
        value: filter.value,
    };
    return handleDataTypes(result, aliasCol, throwErrorIfInvalid, errors);
}
function handleDataTypes(filterType, column, throwErrorIfInvalid = false, errors = []) {
    if (filterType.value === null) {
        return { filter: filterType };
    }
    if ([
        UITypes_1.default.Date,
        UITypes_1.default.DateTime,
        UITypes_1.default.CreatedTime,
        UITypes_1.default.LastModifiedTime,
    ].includes(column.uidt) &&
        filterType.value) {
        const [subOp, ...value] = Array.isArray(filterType.value)
            ? filterType.value
            : filterType.value.split(',').map((k) => k.trim());
        filterType.comparison_sub_op = subOp;
        filterType.value = value.join('');
        if (filterType.comparison_sub_op) {
            if (!filterHelpers_1.COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op)) {
                if (throwErrorIfInvalid)
                    throw new errorUtils_1.BadRequest(`'${filterType.comparison_sub_op}' is not supported.`);
                else {
                    errors.push({
                        message: `'${filterType.comparison_sub_op}' is not supported.`,
                    });
                    return { errors };
                }
            }
        }
        if ((filterType.comparison_op === 'isWithin' &&
            !filterHelpers_1.IS_WITHIN_COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op)) ||
            (filterType.comparison_op !== 'isWithin' &&
                filterHelpers_1.IS_WITHIN_COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op))) {
            if (throwErrorIfInvalid)
                throw new errorUtils_1.BadRequest(`'${filterType.comparison_sub_op}' is not supported for '${filterType.comparison_op}'`);
            else {
                errors.push({
                    message: `'${filterType.comparison_sub_op}' is not supported for '${filterType.comparison_op}'`,
                });
                return { errors };
            }
        }
        if (filterType.value === '') {
            filterType.value = undefined;
        }
    }
    return { filter: filterType };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVySGVscGVyc193aXRocGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9maWx0ZXJIZWxwZXJzX3dpdGhwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsaURBQThDO0FBSzlDLHNGQUFpRjtBQUNqRix3REFBZ0M7QUFDaEMsbURBSXlCO0FBQ3pCLHVFQUFrRTtBQUNsRSxrRkFLcUQ7QUFKbkQsb0hBQUEsY0FBYyxPQUFBO0FBQ2Qsd0hBQUEsa0JBQWtCLE9BQUE7QUFDbEIsNEhBQUEsc0JBQXNCLE9BQUE7QUFDdEIsa0lBQUEsNEJBQTRCLE9BQUE7QUFHOUIsU0FBZ0IsdUJBQXVCLENBQ3JDLEdBQXNCLEVBQ3RCLGNBQXFELEVBQ3JELG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxLQUFLLE1BQU0sVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUNELE9BQU8sNEJBQTRCLENBQ2pDLEdBQUcsRUFDSCxjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLE1BQU0sQ0FDUCxDQUFDO0FBQ0osQ0FBQztBQW5CRCwwREFtQkM7QUFFRCxTQUFTLDRCQUE0QixDQUNuQyxHQUFzQixFQUN0QixjQUFxRCxFQUNyRCxtQkFBbUIsR0FBRyxLQUFLLEVBQzNCLFNBQTZCLEVBQUU7SUFFL0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVB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
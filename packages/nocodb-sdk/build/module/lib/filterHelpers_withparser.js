import { BadRequest } from '../lib/errorUtils';
import { QueryFilterParser } from '../lib/parser/queryFilter/query-filter-parser';
import UITypes from './UITypes';
import { COMPARISON_SUB_OPS, IS_WITHIN_COMPARISON_SUB_OPS, } from './filterHelpers';
import { InvalidFilterError } from './error/invalid-filter.error';
export { COMPARISON_OPS, COMPARISON_SUB_OPS, GROUPBY_COMPARISON_OPS, IS_WITHIN_COMPARISON_SUB_OPS, } from '../lib/parser/queryFilter/query-filter-lexer';
export function extractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    if (!str) {
        return { filters: [] };
    }
    for (const columnName of Object.keys(aliasColObjMap)) {
        const column = aliasColObjMap[columnName];
        aliasColObjMap[column.id] = column;
    }
    return innerExtractFilterFromXwhere(str, aliasColObjMap, throwErrorIfInvalid, errors);
}
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
    const parseResult = QueryFilterParser.parse(str);
    if ((parseResult.lexErrors.length > 0 || parseResult.parseErrors.length > 0) &&
        throwErrorIfInvalid) {
        if (throwErrorIfInvalid)
            throw new InvalidFilterError({
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
            throw new InvalidFilterError({
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
        UITypes.Date,
        UITypes.DateTime,
        UITypes.CreatedTime,
        UITypes.LastModifiedTime,
    ].includes(column.uidt) &&
        filterType.value) {
        const [subOp, ...value] = Array.isArray(filterType.value)
            ? filterType.value
            : filterType.value.split(',').map((k) => k.trim());
        filterType.comparison_sub_op = subOp;
        filterType.value = value.join('');
        if (filterType.comparison_sub_op) {
            if (!COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op)) {
                if (throwErrorIfInvalid)
                    throw new BadRequest(`'${filterType.comparison_sub_op}' is not supported.`);
                else {
                    errors.push({
                        message: `'${filterType.comparison_sub_op}' is not supported.`,
                    });
                    return { errors };
                }
            }
        }
        if ((filterType.comparison_op === 'isWithin' &&
            !IS_WITHIN_COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op)) ||
            (filterType.comparison_op !== 'isWithin' &&
                IS_WITHIN_COMPARISON_SUB_OPS.includes(filterType.comparison_sub_op))) {
            if (throwErrorIfInvalid)
                throw new BadRequest(`'${filterType.comparison_sub_op}' is not supported for '${filterType.comparison_op}'`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVySGVscGVyc193aXRocGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9maWx0ZXJIZWxwZXJzX3dpdGhwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2pGLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsa0JBQWtCLEVBRWxCLDRCQUE0QixHQUM3QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0Qiw0QkFBNEIsR0FDN0IsTUFBTSw2Q0FBNkMsQ0FBQztBQUVyRCxNQUFNLFVBQVUsdUJBQXVCLENBQ3JDLEdBQXNCLEVBQ3RCLGNBQXFELEVBQ3JELG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxLQUFLLE1BQU0sVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUNELE9BQU8sNEJBQTRCLENBQ2pDLEdBQUcsRUFDSCxjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLE1BQU0sQ0FDUCxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsNEJBQTRCLENBQ25DLEdBQXNCLEVBQ3RCLGNBQXFELEVBQ3JELG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxtQ0FBbUM7U0FDaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsdUNBQXVDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQzdCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2YsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUNoRSxDQUNGLENBQUM7UUFFRiw4QkFBOEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsNkJBQTZCO1FBQzdCLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQy9ELElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLCtCQUErQjtRQUMvQixJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsaURBQWlEO1FBQ2pELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxxQ0FBcUM7UUFDckMsT0FBTztZQUNMLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxRQUFRLEVBQUUsSUFBSTtvQkFDZCxVQUFVLEVBQUUsS0FBSztvQkFDakIsUUFBUSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDMUQsTUFBTSxPQUFPLEdBQ1gsNkRBQTZELENBQUM7UUFDaEUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN6QixPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsSUFDRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDeEUsbUJBQW1CLEVBQ25CLENBQUM7UUFDRCxJQUFJLG1CQUFtQjtZQUFFLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQztnQkFDcEQsV0FBVyxFQUFFLFdBQVcsQ0FBQyxTQUFTO2dCQUNsQyxZQUFZLEVBQUUsV0FBVyxDQUFDLFdBQVc7YUFDdEMsQ0FBQyxDQUFDO2FBQ0UsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHdCQUF3QjthQUNsQyxDQUFDLENBQUM7WUFDSCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBRTVDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLHFCQUFxQixDQUMzRCxhQUFhLEVBQ2IsY0FBYyxFQUNkLG1CQUFtQixDQUNwQixDQUFDO0lBQ0YsSUFBSSxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxNQUFNLElBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQzVCLE1BQTBCLEVBQzFCLGNBQXFELEVBQ3JELG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUTtTQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNULENBQUMsQ0FBQyxRQUFRO1FBQ1IsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxzQkFBc0IsQ0FDcEIsQ0FBd0IsRUFDeEIsY0FBYyxFQUNkLG1CQUFtQixFQUNuQixNQUFNLENBQ1AsQ0FDTjtTQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTztZQUNMLE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7Z0JBQ3pCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtnQkFDN0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7YUFDMUI7U0FDaEIsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxzQkFBc0IsQ0FDN0IsTUFBMkIsRUFDM0IsY0FBcUQsRUFDckQsbUJBQW1CLEdBQUcsS0FBSyxFQUMzQixTQUE2QixFQUFFO0lBRS9CLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQztnQkFDM0IsT0FBTyxFQUFFLFdBQVcsTUFBTSxDQUFDLEtBQUssY0FBYzthQUMvQyxDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLFdBQVcsTUFBTSxDQUFDLEtBQUssY0FBYzthQUMvQyxDQUFDLENBQUM7WUFDSCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELE1BQU0sTUFBTSxHQUFlO1FBQ3pCLFlBQVksRUFBRSxRQUFRLENBQUMsRUFBRTtRQUN6QixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBaUI7UUFDcEMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFvQjtRQUMxQyxpQkFBaUIsRUFBRSxTQUFTO1FBQzVCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztLQUNwQixDQUFDO0lBQ0YsT0FBTyxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQ3RCLFVBQXNCLEVBQ3RCLE1BQWtCLEVBQ2xCLG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixJQUFJLFVBQVUsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFDRTtRQUNFLE9BQU8sQ0FBQyxJQUFJO1FBQ1osT0FBTyxDQUFDLFFBQVE7UUFDaEIsT0FBTyxDQUFDLFdBQVc7UUFDbkIsT0FBTyxDQUFDLGdCQUFnQjtLQUN6QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBZSxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxLQUFLLEVBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNsQixDQUFDLENBQUUsVUFBVSxDQUFDLEtBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFakUsVUFBVSxDQUFDLGlCQUFpQixHQUFHLEtBQVksQ0FBQztRQUM1QyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7Z0JBQy9ELElBQUksbUJBQW1CO29CQUNyQixNQUFNLElBQUksVUFBVSxDQUNsQixJQUFJLFVBQVUsQ0FBQyxpQkFBaUIscUJBQXFCLENBQ3RELENBQUM7cUJBQ0MsQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLE9BQU8sRUFBRSxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIscUJBQXFCO3FCQUMvRCxDQUFDLENBQUM7b0JBQ0gsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxJQUNFLENBQUMsVUFBVSxDQUFDLGFBQWEsS0FBSyxVQUFVO1lBQ3RDLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUNwQyxVQUFVLENBQUMsaUJBQXdCLENBQ3BDLENBQUM7WUFDSixDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssVUFBVTtnQkFDdEMsNEJBQTRCLENBQUMsUUFBUSxDQUNuQyxVQUFVLENBQUMsaUJBQXdCLENBQ3BDLENBQUMsRUFDSixDQUFDO1lBQ0QsSUFBSSxtQkFBbUI7Z0JBQ3JCLE1BQU0sSUFBSSxVQUFVLENBQ2xCLElBQUksVUFBVSxDQUFDLGlCQUFpQiwyQkFBMkIsVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUN2RixDQUFDO2lCQUNDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixPQUFPLEVBQUUsSUFBSSxVQUFVLENBQUMsaUJBQWlCLDJCQUEyQixVQUFVLENBQUMsYUFBYSxHQUFHO2lCQUNoRyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQzVCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUNoQyxDQUFDIn0=
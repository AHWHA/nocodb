"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFilterFromXwhere = exports.buildFilterTree = exports.IS_WITHIN_COMPARISON_SUB_OPS = exports.GROUPBY_COMPARISON_OPS = exports.COMPARISON_SUB_OPS = exports.COMPARISON_OPS = void 0;
var query_filter_lexer_1 = require("../lib/parser/queryFilter/query-filter-lexer");
Object.defineProperty(exports, "COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_OPS; } });
Object.defineProperty(exports, "COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.COMPARISON_SUB_OPS; } });
Object.defineProperty(exports, "GROUPBY_COMPARISON_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.GROUPBY_COMPARISON_OPS; } });
Object.defineProperty(exports, "IS_WITHIN_COMPARISON_SUB_OPS", { enumerable: true, get: function () { return query_filter_lexer_1.IS_WITHIN_COMPARISON_SUB_OPS; } });
const filterHelpers_withparser_1 = require("./filterHelpers_withparser");
const filterHelpers_old_1 = require("./filterHelpers_old");
const enums_1 = require("./enums");
/**
 * Converts a flat array of filter objects into a nested tree structure
 * @param {FilterType[]} items - Array of filter objects
 * @returns {FilterType[]} - Nested tree structure
 */
function buildFilterTree(items) {
    const itemMap = new Map();
    const rootItems = [];
    // Map items with IDs and handle items without IDs
    items.forEach((item) => {
        if (item.id) {
            itemMap.set(item.id, Object.assign(Object.assign({}, item), { children: [] }));
        }
        else {
            // Items without IDs go straight to root level
            rootItems.push(Object.assign(Object.assign({}, item), { children: [] }));
        }
    });
    // Build parent-child relationships for items with IDs
    items.forEach((item) => {
        // Skip items without IDs as they're already in rootItems
        if (!item.id)
            return;
        const mappedItem = itemMap.get(item.id);
        if (item.fk_parent_id === null) {
            rootItems.push(mappedItem);
        }
        else {
            const parent = itemMap.get(item.fk_parent_id);
            if (parent) {
                parent.children.push(mappedItem);
            }
            else {
                // If parent is not found, treat as root item
                rootItems.push(mappedItem);
            }
        }
    });
    return rootItems;
}
exports.buildFilterTree = buildFilterTree;
function extractFilterFromXwhere(context, str, aliasColObjMap, throwErrorIfInvalid = false, errors = []) {
    if (context.api_version === enums_1.NcApiVersion.V3) {
        return (0, filterHelpers_withparser_1.extractFilterFromXwhere)(str, aliasColObjMap, throwErrorIfInvalid, errors);
    }
    else if (typeof str === 'string' && str.startsWith('@')) {
        return (0, filterHelpers_withparser_1.extractFilterFromXwhere)(str.substring(1), aliasColObjMap, throwErrorIfInvalid, errors);
    }
    else {
        return (0, filterHelpers_old_1.extractFilterFromXwhere)(str, aliasColObjMap, throwErrorIfInvalid, errors);
    }
}
exports.extractFilterFromXwhere = extractFilterFromXwhere;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVySGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmlsdGVySGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxrRkFLcUQ7QUFKbkQsb0hBQUEsY0FBYyxPQUFBO0FBQ2Qsd0hBQUEsa0JBQWtCLE9BQUE7QUFDbEIsNEhBQUEsc0JBQXNCLE9BQUE7QUFDdEIsa0lBQUEsNEJBQTRCLE9BQUE7QUFFOUIseUVBQXNGO0FBQ3RGLDJEQUE0RTtBQUU1RSxtQ0FBdUM7QUFNdkM7Ozs7R0FJRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxLQUFtQjtJQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzFCLE1BQU0sU0FBUyxHQUFpQixFQUFFLENBQUM7SUFFbkMsa0RBQWtEO0lBQ2xELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsa0NBQU8sSUFBSSxLQUFFLFFBQVEsRUFBRSxFQUFFLElBQUcsQ0FBQztRQUNsRCxDQUFDO2FBQU0sQ0FBQztZQUNOLDhDQUE4QztZQUM5QyxTQUFTLENBQUMsSUFBSSxpQ0FBTSxJQUFJLEtBQUUsUUFBUSxFQUFFLEVBQUUsSUFBRyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILHNEQUFzRDtJQUN0RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckIseURBQXlEO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFFckIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5QyxJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUM7aUJBQU0sQ0FBQztnQkFDTiw2Q0FBNkM7Z0JBQzdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFuQ0QsMENBbUNDO0FBRUQsU0FBZ0IsdUJBQXVCLENBQ3JDLE9BQXVDLEVBQ3ZDLEdBQXNCLEVBQ3RCLGNBQXFELEVBQ3JELG1CQUFtQixHQUFHLEtBQUssRUFDM0IsU0FBNkIsRUFBRTtJQUUvQixJQUFJLE9BQU8sQ0FBQyxXQUFXLEtBQUssb0JBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM1QyxPQUFPLElBQUEsa0RBQWEsRUFBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDMUQsT0FBTyxJQUFBLGtEQUFhLEVBQ2xCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsTUFBTSxDQUNQLENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sSUFBQSwyQ0FBVSxFQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEUsQ0FBQztBQUNILENBQUM7QUFuQkQsMERBbUJDIn0=
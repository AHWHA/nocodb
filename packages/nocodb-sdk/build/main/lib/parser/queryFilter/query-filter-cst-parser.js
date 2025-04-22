"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCst = exports.parseCallExpression = exports.parseParenClause = exports.parseAndOrClause = exports.parseNotClause = exports.parseMultiClause = exports.parseExpressionArguments = void 0;
const common_cst_parser_1 = require("../common-cst-parser");
const parseExpressionArguments = (cst) => {
    if (cst.children.VARIABLE) {
        return (0, common_cst_parser_1.parseVariableAsArray)(cst.children.VARIABLE);
    }
    return undefined;
};
exports.parseExpressionArguments = parseExpressionArguments;
const parseMultiClause = (cst, opt) => {
    var _a;
    const result = {
        is_group: true,
        logical_op: (_a = opt === null || opt === void 0 ? void 0 : opt.logicalOperator) !== null && _a !== void 0 ? _a : 'and',
        children: [],
    };
    for (let index = 0; index < cst.children.clause.length; index++) {
        const clause = cst.children.clause[index];
        result.children.push(clause.name === 'and_or_clause'
            ? (0, exports.parseAndOrClause)(clause)
            : clause.name === 'not_clause'
                ? (0, exports.parseNotClause)(clause)
                : (0, exports.parseParenClause)(clause));
    }
    return result;
};
exports.parseMultiClause = parseMultiClause;
const parseNotClause = (cst) => {
    return (0, exports.parseParenClause)(cst.children.clause[0], {
        logicalOperator: 'not',
    });
};
exports.parseNotClause = parseNotClause;
const parseAndOrClause = (cst) => {
    return (0, exports.parseParenClause)(cst.children.clause[0], {
        logicalOperator: cst.children.operator[0].image.replace('~', ''),
    });
};
exports.parseAndOrClause = parseAndOrClause;
const parseParenClause = (cst, opt) => {
    const clause = cst.children.clause[0];
    if (clause.name === 'multi_clause') {
        return (0, exports.parseMultiClause)(clause, opt);
    }
    else {
        return (0, exports.parseCallExpression)(clause, opt);
    }
};
exports.parseParenClause = parseParenClause;
const parseCallExpression = (cst, opt) => {
    const operator = cst.children.OPERATOR[0].image;
    const result = {
        is_group: false,
        field: (0, common_cst_parser_1.parseVariableAsString)(cst.children.VARIABLE),
        comparison_op: operator,
        logical_op: opt === null || opt === void 0 ? void 0 : opt.logicalOperator,
    };
    if (cst.children.expression_arguments &&
        cst.children.expression_arguments[0]) {
        const variables = (0, exports.parseExpressionArguments)(cst.children.expression_arguments[0]);
        result.value = variables;
    }
    handleBlankOperator(result);
    handleInOperator(result);
    handleOperatorAndValue(result);
    return result;
};
exports.parseCallExpression = parseCallExpression;
const handleBlankOperator = (filter) => {
    var _a, _b;
    switch (filter.comparison_op) {
        case 'is':
            if (((_a = filter.value) === null || _a === void 0 ? void 0 : _a[0]) === 'blank') {
                filter.comparison_op = 'blank';
                filter.value = undefined;
            }
            else if (((_b = filter.value) === null || _b === void 0 ? void 0 : _b[0]) === 'notblank') {
                filter.comparison_op = 'notblank';
                filter.value = undefined;
            }
            break;
        case 'isblank':
        case 'is_blank':
            filter.comparison_op = 'blank';
            break;
        case 'isnotblank':
        case 'is_not_blank':
        case 'is_notblank':
            filter.comparison_op = 'notblank';
            break;
    }
};
const handleInOperator = (filter) => {
    var _a;
    if (filter.comparison_op === 'in' && !Array.isArray(filter.value)) {
        filter.value = (_a = filter.value) === null || _a === void 0 ? void 0 : _a.split(',');
    }
};
const handleOperatorAndValue = (filter) => {
    if (Array.isArray(filter.value) &&
        [
            'eq',
            'neq',
            'not',
            'like',
            'nlike',
            'empty',
            'notempty',
            'null',
            'notnull',
            'checked',
            'notchecked',
            'blank',
            'notblank',
            'allof',
            'anyof',
            'nallof',
            'nanyof',
            'gt',
            'lt',
            'gte',
            'lte',
            'ge',
            'le',
            'isnot',
            'is',
            'gb_eq',
        ].includes(filter.comparison_op)) {
        if (filter.value.length === filter.value.filter((k) => k === null).length) {
            filter.value = null;
        }
        else {
            filter.value = filter.value.filter((k) => k).join(',');
        }
    }
    // for equality, replace with empty string if value is undefined
    else if (filter.value === undefined &&
        ['eq', 'neq', 'gb_eq'].includes(filter.comparison_op)) {
        filter.value = '';
    }
};
const parseCst = (cst) => {
    return (0, exports.parseMultiClause)(cst);
};
exports.parseCst = parseCst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktZmlsdGVyLWNzdC1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3BhcnNlci9xdWVyeUZpbHRlci9xdWVyeS1maWx0ZXItY3N0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFJOEI7QUF5RXZCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxHQUEyQixFQUFFLEVBQUU7SUFDdEUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBQSx3Q0FBb0IsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFMVyxRQUFBLHdCQUF3Qiw0QkFLbkM7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQzlCLEdBQW1CLEVBQ25CLEdBQWtDLEVBQ2xDLEVBQUU7O0lBQ0YsTUFBTSxNQUFNLEdBQXVCO1FBQ2pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsVUFBVSxFQUFFLE1BQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLGVBQWUsbUNBQUksS0FBSztRQUN6QyxRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7SUFDRixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDaEUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2xCLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZTtZQUM3QixDQUFDLENBQUMsSUFBQSx3QkFBZ0IsRUFBQyxNQUFNLENBQUM7WUFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWTtnQkFDOUIsQ0FBQyxDQUFDLElBQUEsc0JBQWMsRUFBQyxNQUFNLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUM3QixDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQXBCVyxRQUFBLGdCQUFnQixvQkFvQjNCO0FBRUssTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFpQixFQUFFLEVBQUU7SUFDbEQsT0FBTyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzlDLGVBQWUsRUFBRSxLQUFLO0tBQ3ZCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUpXLFFBQUEsY0FBYyxrQkFJekI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBbUIsRUFBRSxFQUFFO0lBQ3RELE9BQU8sSUFBQSx3QkFBZ0IsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM5QyxlQUFlLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0tBQ2pFLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUpXLFFBQUEsZ0JBQWdCLG9CQUkzQjtBQUVLLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDOUIsR0FBbUIsRUFDbkIsR0FBa0MsRUFDbEMsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxPQUFPLElBQUEsd0JBQWdCLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxJQUFBLDJCQUFtQixFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBVlcsUUFBQSxnQkFBZ0Isb0JBVTNCO0FBQ0ssTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxHQUFzQixFQUN0QixHQUFrQyxFQUNsQyxFQUFFO0lBQ0YsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRWhELE1BQU0sTUFBTSxHQUF3QjtRQUNsQyxRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxJQUFBLHlDQUFxQixFQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ25ELGFBQWEsRUFBRSxRQUFlO1FBQzlCLFVBQVUsRUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsZUFBZTtLQUNqQyxDQUFDO0lBQ0YsSUFDRSxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQjtRQUNqQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUNwQyxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBQSxnQ0FBd0IsRUFDeEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FDckMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUF6QlcsUUFBQSxtQkFBbUIsdUJBeUI5QjtBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxNQUEyQixFQUFFLEVBQUU7O0lBQzFELFFBQVEsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdCLEtBQUssSUFBSTtZQUNQLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFHLENBQUMsQ0FBQyxNQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUNsQyxNQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztnQkFDL0IsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDM0IsQ0FBQztpQkFBTSxJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRyxDQUFDLENBQUMsTUFBSyxVQUFVLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQzNCLENBQUM7WUFDRCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLFVBQVU7WUFDYixNQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxZQUFZLENBQUM7UUFDbEIsS0FBSyxjQUFjLENBQUM7UUFDcEIsS0FBSyxhQUFhO1lBQ2hCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLE1BQU07SUFDVixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQTJCLEVBQUUsRUFBRTs7SUFDdkQsSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEUsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFDLE1BQU0sQ0FBQyxLQUFnQiwwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxNQUEyQixFQUFFLEVBQUU7SUFDN0QsSUFDRSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0I7WUFDRSxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxVQUFVO1lBQ1YsTUFBTTtZQUNOLFNBQVM7WUFDVCxTQUFTO1lBQ1QsWUFBWTtZQUNaLE9BQU87WUFDUCxVQUFVO1lBQ1YsT0FBTztZQUNQLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLElBQUk7WUFDSixJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osSUFBSTtZQUNKLE9BQU87WUFDUCxJQUFJO1lBQ0osT0FBTztTQUNSLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDaEMsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDO0lBQ0gsQ0FBQztJQUNELGdFQUFnRTtTQUMzRCxJQUNILE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUztRQUMxQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDckQsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFSyxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQW1CLEVBQUUsRUFBRTtJQUM5QyxPQUFPLElBQUEsd0JBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRlcsUUFBQSxRQUFRLFlBRW5CIn0=
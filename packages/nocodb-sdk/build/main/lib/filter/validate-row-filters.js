"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRowFilters = void 0;
const dayjs_1 = __importStar(require("dayjs"));
const customParseFormat_js_1 = __importDefault(require("dayjs/plugin/customParseFormat.js"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const relativeTime_js_1 = __importDefault(require("dayjs/plugin/relativeTime.js"));
const dateTimeHelper_1 = require("../../lib/dateTimeHelper");
const filterHelpers_1 = require("../../lib/filterHelpers");
const helperFunctions_1 = require("../../lib/helperFunctions");
const UITypes_1 = __importDefault(require("../../lib/UITypes"));
const get_lookup_column_type_1 = require("../../lib/columnHelper/utils/get-lookup-column-type");
(0, dayjs_1.extend)(relativeTime_js_1.default);
(0, dayjs_1.extend)(customParseFormat_js_1.default);
(0, dayjs_1.extend)(isSameOrBefore_1.default);
(0, dayjs_1.extend)(isSameOrAfter_1.default);
(0, dayjs_1.extend)(isBetween_1.default);
function validateRowFilters(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const { filters: _filters, data, columns, client, metas } = params;
    if (!_filters.length) {
        return true;
    }
    const filters = (0, filterHelpers_1.buildFilterTree)(_filters);
    let isValid = null;
    for (const filter of filters) {
        let res;
        if (filter.is_group && ((_a = filter.children) === null || _a === void 0 ? void 0 : _a.length)) {
            res = validateRowFilters({
                filters: filter.children,
                data: data,
                columns: columns,
                client: client,
                metas: metas,
            });
        }
        else {
            const column = columns.find((c) => c.id === filter.fk_column_id);
            if (!column) {
                continue;
            }
            const field = column.title;
            let val = data[field];
            if ([
                UITypes_1.default.Date,
                UITypes_1.default.DateTime,
                UITypes_1.default.CreatedTime,
                UITypes_1.default.LastModifiedTime,
            ].includes(column.uidt) &&
                !['empty', 'blank', 'notempty', 'notblank'].includes(filter.comparison_op)) {
                const dateFormat = client === 'mysql2' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ';
                let now = (0, dayjs_1.default)(new Date());
                const dateFormatFromMeta = (_b = (0, helperFunctions_1.parseProp)(column.meta)) === null || _b === void 0 ? void 0 : _b.date_format;
                const dataVal = val;
                let filterVal = filter.value;
                if (dateFormatFromMeta && (0, dateTimeHelper_1.isDateMonthFormat)(dateFormatFromMeta)) {
                    // reset to 1st
                    now = (0, dayjs_1.default)(now).date(1);
                    if (val)
                        val = (0, dayjs_1.default)(val).date(1);
                }
                if (filterVal)
                    res = (0, dayjs_1.default)(filterVal).isSame(dataVal, 'day');
                // handle sub operation
                switch (filter.comparison_sub_op) {
                    case 'today':
                        filterVal = now;
                        break;
                    case 'tomorrow':
                        filterVal = now.add(1, 'day');
                        break;
                    case 'yesterday':
                        filterVal = now.add(-1, 'day');
                        break;
                    case 'oneWeekAgo':
                        filterVal = now.add(-1, 'week');
                        break;
                    case 'oneWeekFromNow':
                        filterVal = now.add(1, 'week');
                        break;
                    case 'oneMonthAgo':
                        filterVal = now.add(-1, 'month');
                        break;
                    case 'oneMonthFromNow':
                        filterVal = now.add(1, 'month');
                        break;
                    case 'daysAgo':
                        if (!filterVal)
                            return null;
                        filterVal = now.add(-filterVal, 'day');
                        break;
                    case 'daysFromNow':
                        if (!filterVal)
                            return null;
                        filterVal = now.add(filterVal, 'day');
                        break;
                    case 'exactDate':
                        if (!filterVal)
                            return null;
                        break;
                    // sub-ops for `isWithin` comparison
                    case 'pastWeek':
                        filterVal = now.add(-1, 'week');
                        break;
                    case 'pastMonth':
                        filterVal = now.add(-1, 'month');
                        break;
                    case 'pastYear':
                        filterVal = now.add(-1, 'year');
                        break;
                    case 'nextWeek':
                        filterVal = now.add(1, 'week');
                        break;
                    case 'nextMonth':
                        filterVal = now.add(1, 'month');
                        break;
                    case 'nextYear':
                        filterVal = now.add(1, 'year');
                        break;
                    case 'pastNumberOfDays':
                        if (!filterVal)
                            return null;
                        filterVal = now.add(-filterVal, 'day');
                        break;
                    case 'nextNumberOfDays':
                        if (!filterVal)
                            return null;
                        filterVal = now.add(filterVal, 'day');
                        break;
                }
                if (dataVal) {
                    switch (filter.comparison_op) {
                        case 'eq':
                        case 'gb_eq':
                            res = (0, dayjs_1.default)(dataVal).isSame(filterVal, 'day');
                            break;
                        case 'neq':
                            res = !(0, dayjs_1.default)(dataVal).isSame(filterVal, 'day');
                            break;
                        case 'gt':
                            res = (0, dayjs_1.default)(dataVal).isAfter(filterVal, 'day');
                            break;
                        case 'lt':
                            res = (0, dayjs_1.default)(dataVal).isBefore(filterVal, 'day');
                            break;
                        case 'lte':
                        case 'le':
                            res = (0, dayjs_1.default)(dataVal).isSameOrBefore(filterVal, 'day');
                            break;
                        case 'gte':
                        case 'ge':
                            res = (0, dayjs_1.default)(dataVal).isSameOrAfter(filterVal, 'day');
                            break;
                        case 'empty':
                        case 'blank':
                            res = dataVal === '' || dataVal === null || dataVal === undefined;
                            break;
                        case 'notempty':
                        case 'notblank':
                            res = !(dataVal === '' ||
                                dataVal === null ||
                                dataVal === undefined);
                            break;
                        case 'isWithin': {
                            let now = (0, dayjs_1.default)(new Date()).format(dateFormat).toString();
                            now = column.uidt === UITypes_1.default.Date ? now.substring(0, 10) : now;
                            switch (filter.comparison_sub_op) {
                                case 'pastWeek':
                                case 'pastMonth':
                                case 'pastYear':
                                case 'pastNumberOfDays':
                                    res = (0, dayjs_1.default)(dataVal).isBetween(filterVal, now, 'day');
                                    break;
                                case 'nextWeek':
                                case 'nextMonth':
                                case 'nextYear':
                                case 'nextNumberOfDays':
                                    res = (0, dayjs_1.default)(dataVal).isBetween(now, filterVal, 'day');
                                    break;
                            }
                        }
                    }
                }
            }
            else {
                switch (typeof filter.value) {
                    case 'boolean':
                        val = !!data[field];
                        break;
                    case 'number':
                        val = +data[field];
                        break;
                }
                if ([UITypes_1.default.User, UITypes_1.default.CreatedBy, UITypes_1.default.LastModifiedBy].includes(column.uidt) ||
                    (column.uidt === UITypes_1.default.Lookup &&
                        [UITypes_1.default.User, UITypes_1.default.CreatedBy, UITypes_1.default.LastModifiedBy].includes((0, get_lookup_column_type_1.getLookupColumnType)({
                            col: column,
                            meta: { columns },
                            metas: metas,
                        })))) {
                    const userIds = Array.isArray(data[field])
                        ? data[field].map((user) => user.id)
                        : ((_c = data[field]) === null || _c === void 0 ? void 0 : _c.id)
                            ? [data[field].id]
                            : [];
                    const filterValues = (((_d = filter.value) === null || _d === void 0 ? void 0 : _d.split(',')) || []).map((v) => v.trim());
                    switch (filter.comparison_op) {
                        case 'anyof':
                            res = userIds.some((id) => filterValues.includes(id));
                            break;
                        case 'nanyof':
                            res = !userIds.some((id) => filterValues.includes(id));
                            break;
                        case 'allof':
                            res = filterValues.every((id) => userIds.includes(id));
                            break;
                        case 'nallof':
                            res = !filterValues.every((id) => userIds.includes(id));
                            break;
                        case 'empty':
                        case 'blank':
                            res = userIds.length === 0;
                            break;
                        case 'notempty':
                        case 'notblank':
                            res = userIds.length > 0;
                            break;
                        default:
                            res = false; // Unsupported operation for User fields
                    }
                }
                else {
                    switch (filter.comparison_op) {
                        case 'eq':
                        case 'gb_eq':
                            res = val == filter.value;
                            break;
                        case 'neq':
                            res = val != filter.value;
                            break;
                        case 'like':
                            res =
                                ((_h = (_g = (_f = (_e = data[field]) === null || _e === void 0 ? void 0 : _e.toString) === null || _f === void 0 ? void 0 : _f.call(_e)) === null || _g === void 0 ? void 0 : _g.toLowerCase()) === null || _h === void 0 ? void 0 : _h.indexOf((_j = filter.value) === null || _j === void 0 ? void 0 : _j.toLowerCase())) > -1;
                            break;
                        case 'nlike':
                            res =
                                ((_o = (_m = (_l = (_k = data[field]) === null || _k === void 0 ? void 0 : _k.toString) === null || _l === void 0 ? void 0 : _l.call(_k)) === null || _m === void 0 ? void 0 : _m.toLowerCase()) === null || _o === void 0 ? void 0 : _o.indexOf((_p = filter.value) === null || _p === void 0 ? void 0 : _p.toLowerCase())) === -1;
                            break;
                        case 'empty':
                        case 'blank':
                            res =
                                data[field] === '' ||
                                    data[field] === null ||
                                    data[field] === undefined;
                            break;
                        case 'notempty':
                        case 'notblank':
                            res = !(data[field] === '' ||
                                data[field] === null ||
                                data[field] === undefined);
                            break;
                        case 'checked':
                            res = !!data[field];
                            break;
                        case 'notchecked':
                            res = !data[field];
                            break;
                        case 'null':
                            res = res = data[field] === null;
                            break;
                        case 'notnull':
                            res = data[field] !== null;
                            break;
                        case 'allof':
                            res = ((_r = (_q = filter.value) === null || _q === void 0 ? void 0 : _q.split(',').map((item) => item.trim())) !== null && _r !== void 0 ? _r : []).every((item) => { var _a, _b; return ((_b = (_a = data[field]) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : []).includes(item); });
                            break;
                        case 'anyof':
                            res = ((_t = (_s = filter.value) === null || _s === void 0 ? void 0 : _s.split(',').map((item) => item.trim())) !== null && _t !== void 0 ? _t : []).some((item) => { var _a, _b; return ((_b = (_a = data[field]) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : []).includes(item); });
                            break;
                        case 'nallof':
                            res = !((_v = (_u = filter.value) === null || _u === void 0 ? void 0 : _u.split(',').map((item) => item.trim())) !== null && _v !== void 0 ? _v : []).every((item) => { var _a, _b; return ((_b = (_a = data[field]) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : []).includes(item); });
                            break;
                        case 'nanyof':
                            res = !((_x = (_w = filter.value) === null || _w === void 0 ? void 0 : _w.split(',').map((item) => item.trim())) !== null && _x !== void 0 ? _x : []).some((item) => { var _a, _b; return ((_b = (_a = data[field]) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : []).includes(item); });
                            break;
                        case 'lt':
                            res = +data[field] < +filter.value;
                            break;
                        case 'lte':
                        case 'le':
                            res = +data[field] <= +filter.value;
                            break;
                        case 'gt':
                            res = +data[field] > +filter.value;
                            break;
                        case 'gte':
                        case 'ge':
                            res = +data[field] >= +filter.value;
                            break;
                    }
                }
            }
        }
        switch (filter.logical_op) {
            case 'or':
                isValid = isValid || !!res;
                break;
            case 'not':
                isValid = isValid && !res;
                break;
            case 'and':
            default:
                isValid = (isValid !== null && isValid !== void 0 ? isValid : true) && res;
                break;
        }
    }
    return isValid;
}
exports.validateRowFilters = validateRowFilters;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcm93LWZpbHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2ZpbHRlci92YWxpZGF0ZS1yb3ctZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFzQztBQUN0Qyw2RkFBa0U7QUFDbEUsdUVBQStDO0FBQy9DLCtFQUF1RDtBQUN2RCxpRkFBeUQ7QUFDekQsbUZBQXdEO0FBRXhELHlEQUF5RDtBQUN6RCx1REFBc0Q7QUFDdEQsMkRBQWtEO0FBQ2xELDREQUFvQztBQUNwQyw0RkFBc0Y7QUFFdEYsSUFBQSxjQUFNLEVBQUMseUJBQVksQ0FBQyxDQUFDO0FBQ3JCLElBQUEsY0FBTSxFQUFDLDhCQUFpQixDQUFDLENBQUM7QUFDMUIsSUFBQSxjQUFNLEVBQUMsd0JBQWMsQ0FBQyxDQUFDO0FBQ3ZCLElBQUEsY0FBTSxFQUFDLHVCQUFhLENBQUMsQ0FBQztBQUN0QixJQUFBLGNBQU0sRUFBQyxtQkFBUyxDQUFDLENBQUM7QUFFbEIsU0FBZ0Isa0JBQWtCLENBQUMsTUFNbEM7O0lBQ0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBQSwrQkFBZSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTFDLElBQUksT0FBTyxHQUFtQixJQUFJLENBQUM7SUFDbkMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSSxNQUFBLE1BQU0sQ0FBQyxRQUFRLDBDQUFF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
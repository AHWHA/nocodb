import dayjs, { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { isDateMonthFormat } from '../../lib/dateTimeHelper';
import { buildFilterTree } from '../../lib/filterHelpers';
import { parseProp } from '../../lib/helperFunctions';
import UITypes from '../../lib/UITypes';
import { getLookupColumnType } from '../../lib/columnHelper/utils/get-lookup-column-type';
extend(relativeTime);
extend(customParseFormat);
extend(isSameOrBefore);
extend(isSameOrAfter);
extend(isBetween);
export function validateRowFilters(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const { filters: _filters, data, columns, client, metas } = params;
    if (!_filters.length) {
        return true;
    }
    const filters = buildFilterTree(_filters);
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
                UITypes.Date,
                UITypes.DateTime,
                UITypes.CreatedTime,
                UITypes.LastModifiedTime,
            ].includes(column.uidt) &&
                !['empty', 'blank', 'notempty', 'notblank'].includes(filter.comparison_op)) {
                const dateFormat = client === 'mysql2' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ssZ';
                let now = dayjs(new Date());
                const dateFormatFromMeta = (_b = parseProp(column.meta)) === null || _b === void 0 ? void 0 : _b.date_format;
                const dataVal = val;
                let filterVal = filter.value;
                if (dateFormatFromMeta && isDateMonthFormat(dateFormatFromMeta)) {
                    // reset to 1st
                    now = dayjs(now).date(1);
                    if (val)
                        val = dayjs(val).date(1);
                }
                if (filterVal)
                    res = dayjs(filterVal).isSame(dataVal, 'day');
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
                            res = dayjs(dataVal).isSame(filterVal, 'day');
                            break;
                        case 'neq':
                            res = !dayjs(dataVal).isSame(filterVal, 'day');
                            break;
                        case 'gt':
                            res = dayjs(dataVal).isAfter(filterVal, 'day');
                            break;
                        case 'lt':
                            res = dayjs(dataVal).isBefore(filterVal, 'day');
                            break;
                        case 'lte':
                        case 'le':
                            res = dayjs(dataVal).isSameOrBefore(filterVal, 'day');
                            break;
                        case 'gte':
                        case 'ge':
                            res = dayjs(dataVal).isSameOrAfter(filterVal, 'day');
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
                            let now = dayjs(new Date()).format(dateFormat).toString();
                            now = column.uidt === UITypes.Date ? now.substring(0, 10) : now;
                            switch (filter.comparison_sub_op) {
                                case 'pastWeek':
                                case 'pastMonth':
                                case 'pastYear':
                                case 'pastNumberOfDays':
                                    res = dayjs(dataVal).isBetween(filterVal, now, 'day');
                                    break;
                                case 'nextWeek':
                                case 'nextMonth':
                                case 'nextYear':
                                case 'nextNumberOfDays':
                                    res = dayjs(dataVal).isBetween(now, filterVal, 'day');
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
                if ([UITypes.User, UITypes.CreatedBy, UITypes.LastModifiedBy].includes(column.uidt) ||
                    (column.uidt === UITypes.Lookup &&
                        [UITypes.User, UITypes.CreatedBy, UITypes.LastModifiedBy].includes(getLookupColumnType({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcm93LWZpbHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2ZpbHRlci92YWxpZGF0ZS1yb3ctZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN0QyxPQUFPLGlCQUFpQixNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sYUFBYSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sY0FBYyxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBRXhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxPQUFPLE1BQU0sZUFBZSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRXRGLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQixNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQixNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVsQixNQUFNLFVBQVUsa0JBQWtCLENBQUMsTUFNbEM7O0lBQ0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDO0lBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFD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
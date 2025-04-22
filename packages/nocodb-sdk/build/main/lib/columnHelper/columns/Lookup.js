"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupHelper = void 0;
const column_interface_1 = __importDefault(require("../column.interface"));
const is_1 = require("../../../lib/is");
const column_helper_1 = require("../column-helper");
const error_1 = require("../../../lib/error");
class LookupHelper extends column_interface_1.default {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(_value, params) {
        if (params.isMultipleCellPaste) {
            return undefined;
        }
        else {
            throw new error_1.ComputedTypePasteError();
        }
    }
    parseValue(value, params) {
        var _a, _b;
        if (!value)
            return null;
        const { col, meta, metas } = params;
        const colOptions = col.colOptions;
        const relationColumnOptions = colOptions.fk_relation_column_id
            ? (_b = (_a = meta === null || meta === void 0 ? void 0 : meta.columns) === null || _a === void 0 ? void 0 : _a.find((c) => c.id === colOptions.fk_relation_column_id)) === null || _b === void 0 ? void 0 : _b.colOptions
            : null;
        const relatedTableMeta = (relationColumnOptions === null || relationColumnOptions === void 0 ? void 0 : relationColumnOptions.fk_related_model_id) &&
            (metas === null || metas === void 0 ? void 0 : metas[relationColumnOptions.fk_related_model_id]);
        const childColumn = relatedTableMeta === null || relatedTableMeta === void 0 ? void 0 : relatedTableMeta.columns.find((c) => c.id === colOptions.fk_lookup_column_id);
        if (!childColumn)
            return value;
        if ((0, is_1.ncIsArray)(value)) {
            return value
                .map((v) => {
                return column_helper_1.ColumnHelper.parseValue(v, Object.assign(Object.assign({}, params), { col: childColumn }));
            })
                .join(', ');
        }
        return column_helper_1.ColumnHelper.parseValue(value, Object.assign(Object.assign({}, params), { col: childColumn }));
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
exports.LookupHelper = LookupHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9va3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9Mb29rdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsMkVBRTZCO0FBQzdCLGlDQUFxQztBQUNyQyxvREFBZ0Q7QUFDaEQsdUNBQXFEO0FBRXJELE1BQWEsWUFBYSxTQUFRLDBCQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFxRHpCLENBQUM7SUFuREMsY0FBYyxDQUNaLE1BQVcsRUFDWCxNQUEyQztRQUUzQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9CLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLDhCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXhCLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUVwQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBd0IsQ0FBQztRQUNoRCxNQUFNLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxxQkFBcUI7WUFDNUQsQ0FBQyxDQUFFLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTywwQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLHFCQUFxQixDQUFDLDBDQUNsRSxVQUFzQztZQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1QsTUFBTSxnQkFBZ0IsR0FDcEIsQ0FBQSxxQkFBcUIsYUFBckIscUJBQXFCLHVCQUFyQixxQkFBcUIsQ0FBRSxtQkFBbUI7YUFDMUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLHFCQUFxQixDQUFDLG1CQUE2QixDQUFDLENBQUEsQ0FBQztRQUUvRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUNoRCxDQUFDLENBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsbUJBQW1CLENBQ2pDLENBQUM7UUFFNUIsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUvQixJQUFJLElBQUEsY0FBUyxFQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDckIsT0FBTyxLQUFLO2lCQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNULE9BQU8sNEJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxrQ0FBTyxNQUFNLEtBQUUsR0FBRyxFQUFFLFdBQVksSUFBRyxDQUFDO1lBQ3RFLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQztRQUVELE9BQU8sNEJBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxrQ0FBTyxNQUFNLEtBQUUsR0FBRyxFQUFFLFdBQVksSUFBRyxDQUFDO0lBQzFFLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUF0REQsb0NBc0RDIn0=
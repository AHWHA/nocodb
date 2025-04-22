import AbstractColumnHelper from '../column.interface';
import { ncIsArray } from '../../../lib/is';
import { ColumnHelper } from '../column-helper';
import { ComputedTypePasteError } from '../../../lib/error';
export class LookupHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(_value, params) {
        if (params.isMultipleCellPaste) {
            return undefined;
        }
        else {
            throw new ComputedTypePasteError();
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
        if (ncIsArray(value)) {
            return value
                .map((v) => {
                return ColumnHelper.parseValue(v, Object.assign(Object.assign({}, params), { col: childColumn }));
            })
                .join(', ');
        }
        return ColumnHelper.parseValue(value, Object.assign(Object.assign({}, params), { col: childColumn }));
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9va3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9Mb29rdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVyRCxNQUFNLE9BQU8sWUFBYSxTQUFRLG9CQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFxRHpCLENBQUM7SUFuREMsY0FBYyxDQUNaLE1BQVcsRUFDWCxNQUEyQztRQUUzQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9CLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXhCLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUVwQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBd0IsQ0FBQztRQUNoRCxNQUFNLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxxQkFBcUI7WUFDNUQsQ0FBQyxDQUFFLE1BQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTywwQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLHFCQUFxQixDQUFDLDBDQUNsRSxVQUFzQztZQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1QsTUFBTSxnQkFBZ0IsR0FDcEIsQ0FBQSxxQkFBcUIsYUFBckIscUJBQXFCLHVCQUFyQixxQkFBcUIsQ0FBRSxtQkFBbUI7YUFDMUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLHFCQUFxQixDQUFDLG1CQUE2QixDQUFDLENBQUEsQ0FBQztRQUUvRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUNoRCxDQUFDLENBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsbUJBQW1CLENBQ2pDLENBQUM7UUFFNUIsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUvQixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sS0FBSztpQkFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDVCxPQUFPLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxrQ0FBTyxNQUFNLEtBQUUsR0FBRyxFQUFFLFdBQVksSUFBRyxDQUFDO1lBQ3RFLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQztRQUVELE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGtDQUFPLE1BQU0sS0FBRSxHQUFHLEVBQUUsV0FBWSxJQUFHLENBQUM7SUFDMUUsQ0FBQztJQUVELG1CQUFtQixDQUNqQixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRiJ9
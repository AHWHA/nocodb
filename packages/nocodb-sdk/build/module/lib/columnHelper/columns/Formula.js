import AbstractColumnHelper from '../column.interface';
import { parseProp } from '../../../lib/helperFunctions';
import { ColumnHelper } from '../column-helper';
import { ComputedTypePasteError } from '../../../lib/error';
export class FormulaHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            display_column_meta: {
                meta: {},
                custom: {},
            },
            display_type: null,
        };
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
        var _a;
        const columnMeta = parseProp((_a = params.col) === null || _a === void 0 ? void 0 : _a.meta);
        const childColumn = Object.assign({ uidt: columnMeta.display_type }, columnMeta.display_column_meta);
        return ColumnHelper.parseValue(value, Object.assign(Object.assign({}, params), { col: childColumn }));
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvRm9ybXVsYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG9CQUVOLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckQsTUFBTSxPQUFPLGFBQWMsU0FBUSxvQkFBb0I7SUFBdkQ7O1FBQ0Usc0JBQWlCLEdBQUc7WUFDbEIsbUJBQW1CLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxFQUFFO2FBQ1g7WUFDRCxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDO0lBbUNKLENBQUM7SUFqQ0MsY0FBYyxDQUNaLE1BQVcsRUFDWCxNQUEyQztRQUUzQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9CLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLFVBQVUsQ0FBQyxZQUFZLElBQzFCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FDbEMsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGtDQUMvQixNQUFNLEtBQ1QsR0FBRyxFQUFFLFdBQVcsSUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0YifQ==
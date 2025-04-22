import { SilentTypeConversionError } from '../../../lib/error';
import { parseIntValue, serializeIntValue } from '..';
import AbstractColumnHelper from '../column.interface';
import { parseProp } from '../../../lib/helperFunctions';
export class RatingHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            iconIdx: 0,
            icon: {
                full: 'mdi-star',
                empty: 'mdi-star-outline',
            },
            color: '#fcb401',
            max: 5,
        };
    }
    serializeValue(value, params) {
        var _a;
        const res = serializeIntValue(value !== null && value !== void 0 ? value : 0);
        if (res === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new SilentTypeConversionError();
            }
        }
        if (res) {
            return Math.min(res, ((_a = parseProp(params.col.meta)) === null || _a === void 0 ? void 0 : _a.max) || this.columnDefaultMeta.max);
        }
        return res;
    }
    parseValue(value) {
        return parseIntValue(value);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = parseIntValue(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9SYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDdEQsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRCxNQUFNLE9BQU8sWUFBYSxTQUFRLG9CQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLGtCQUFrQjthQUMxQjtZQUNELEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxDQUFDO1NBQ1AsQ0FBQztJQW9DSixDQUFDO0lBbENDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7O1FBRTNDLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pCLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNSLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDYixHQUFHLEVBQ0gsQ0FBQSxNQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywwQ0FBRSxHQUFHLEtBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FDOUQsQ0FBQztRQUNKLENBQUM7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsT0FBTyxHQUFHLE1BQUEsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3JELENBQUM7Q0FDRiJ9
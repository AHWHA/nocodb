import { SilentTypeConversionError } from '../../../lib/error';
import { parseIntValue, serializeIntValue } from '..';
import AbstractColumnHelper from '../column.interface';
import { toSafeInteger } from '../../../lib/helperFunctions';
export class NumberHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            isLocaleString: false,
        };
    }
    serializeValue(value, params) {
        value = serializeIntValue(value);
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new SilentTypeConversionError();
            }
        }
        return toSafeInteger(value);
    }
    parseValue(value, params) {
        return parseIntValue(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = parseIntValue(value, params.col)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9OdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDdEQsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxNQUFNLE9BQU8sWUFBYSxTQUFRLG9CQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRztZQUNsQixjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO0lBZ0NKLENBQUM7SUE5QkMsY0FBYyxDQUNaLEtBQVUsRUFDVixNQUEyQztRQUUzQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVSxDQUNSLEtBQVUsRUFDVixNQUEyQztRQUUzQyxPQUFPLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLEdBQUcsTUFBQSxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDckQsQ0FBQztDQUNGIn0=
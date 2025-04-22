import { ComputedTypePasteError } from '../../../lib/error';
import AbstractColumnHelper from '../column.interface';
export class QrCodeHelper extends AbstractColumnHelper {
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
    parseValue(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXJDb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9RckNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JELE9BQU8sb0JBRU4sTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLE9BQU8sWUFBYSxTQUFRLG9CQUFvQjtJQUF0RDs7UUFDRSxzQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFvQnpCLENBQUM7SUFsQkMsY0FBYyxDQUNaLE1BQVcsRUFDWCxNQUEyQztRQUUzQyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQy9CLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTs7UUFDbkIsT0FBTyxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsbUNBQUksSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVOztRQUM1QixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRiJ9
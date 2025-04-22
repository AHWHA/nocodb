import { ncIsArray } from '../../../lib/is';
import AbstractColumnHelper from '../column.interface';
import { serializeSelectValue } from '../utils';
export class SingleSelectHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        return serializeSelectValue(value, params.col);
    }
    parseValue(value) {
        var _a, _b;
        if (!value)
            return null;
        if (ncIsArray(value) && value.length) {
            return (_a = value[0]) === null || _a === void 0 ? void 0 : _a.toString().trim();
        }
        return (_b = value === null || value === void 0 ? void 0 : value.toString().trim()) !== null && _b !== void 0 ? _b : null;
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvY29sdW1ucy9TaW5nbGVTZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxPQUFPLG9CQUVOLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWhELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxvQkFBb0I7SUFBNUQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBc0J6QixDQUFDO0lBcEJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTs7UUFDbkIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV4QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsT0FBTyxNQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsMENBQUUsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRCxPQUFPLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsbUNBQUksSUFBSSxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVOztRQUM1QixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRiJ9
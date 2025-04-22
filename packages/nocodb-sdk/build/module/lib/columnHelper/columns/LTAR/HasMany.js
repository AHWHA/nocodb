import { SilentTypeConversionError } from '../../../../lib/error';
import AbstractColumnHelper from '../../column.interface';
export class HasManyHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(_value, _params) {
        throw new SilentTypeConversionError();
    }
    parseValue(value, _params) {
        return value !== null && value !== void 0 ? value : '';
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFzTWFueS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvTFRBUi9IYXNNYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLG9CQUVOLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsTUFBTSxPQUFPLGFBQWMsU0FBUSxvQkFBb0I7SUFBdkQ7O1FBQ0Usc0JBQWlCLEdBQUcsRUFBRSxDQUFDO0lBZ0J6QixDQUFDO0lBZEMsY0FBYyxDQUFDLE1BQVcsRUFBRSxPQUE0QztRQUN0RSxNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVUsRUFBRSxPQUE0QztRQUNqRSxPQUFPLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUNGIn0=
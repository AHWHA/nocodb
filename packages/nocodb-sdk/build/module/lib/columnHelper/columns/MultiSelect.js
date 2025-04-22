import { ncIsArray } from '../../../lib/is';
import AbstractColumnHelper from '../column.interface';
import { serializeSelectValue } from '../utils';
export class MultiSelectHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value, params) {
        return serializeSelectValue(value, params.col);
    }
    parseValue(value) {
        if (!value)
            return null;
        if (ncIsArray(value)) {
            return value.join(', ');
        }
        return value.toString().split(',').join(', ');
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = this.parseValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlTZWxlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL011bHRpU2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVoRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsb0JBQW9CO0lBQTNEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQXNCekIsQ0FBQztJQXBCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV4QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0YifQ==
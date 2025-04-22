import { ncIsArray, ncIsObject, ncIsString } from '../../../lib/is';
import AbstractColumnHelper from '../column.interface';
import { parseUserValue, serializeEmail } from '../utils';
import { SilentTypeConversionError } from '../../../lib/error';
import { parseProp } from '../../../lib/helperFunctions';
export class UserHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            is_multi: false,
            notify: false,
        };
    }
    serializeValue(value, params) {
        try {
            value = typeof value === 'string' ? JSON.parse(value) : value;
        }
        catch (_a) { }
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new SilentTypeConversionError();
            }
        }
        const is_multi = parseProp(params.col.meta).is_multi;
        if (ncIsArray(value) || ncIsObject(value)) {
            if (ncIsObject(value)) {
                value = [value];
            }
            value = value.reduce((acc, user) => {
                if (user.email) {
                    acc.push(user);
                }
                return acc;
            }, []);
            if (!value.length)
                return null;
            if (!is_multi) {
                return value[0];
            }
            return value;
        }
        if (!ncIsString(value))
            return null;
        if (is_multi) {
            return value
                .split(',')
                .map((val) => serializeEmail(val))
                .filter(Boolean)
                .join(', ');
        }
        return serializeEmail(value);
    }
    parseValue(value) {
        return parseUserValue(value, true);
    }
    parsePlainCellValue(value) {
        var _a;
        return (_a = parseUserValue(value)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDN0QsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEQsTUFBTSxPQUFPLFVBQVcsU0FBUSxvQkFBb0I7SUFBcEQ7O1FBQ0Usc0JBQWlCLEdBQUc7WUFDbEIsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7SUE2REosQ0FBQztJQTNEQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLElBQUksQ0FBQztZQUNILEtBQUssR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNoRSxDQUFDO1FBQUMsV0FBTSxDQUFDLENBQUEsQ0FBQztRQUVWLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRXJELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFFRCxLQUFLLEdBQUksS0FBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7WUFDYixDQUFDLEVBQUUsRUFBZ0IsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUUvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFcEMsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLE9BQU8sS0FBSztpQkFDVCxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDO2lCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBRUQsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLE9BQU8sY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBVTs7UUFDNUIsT0FBTyxNQUFBLGNBQWMsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDRiJ9
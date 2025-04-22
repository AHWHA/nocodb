import { SilentTypeConversionError } from '../../../lib/error';
import { parseDurationValue, serializeDurationValue } from '..';
import AbstractColumnHelper from '../column.interface';
export class DurationHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            duration: 0,
        };
    }
    serializeValue(value, params) {
        value = serializeDurationValue(value, params.col);
        if (value === null) {
            if (params.isMultipleCellPaste) {
                return null;
            }
            else {
                throw new SilentTypeConversionError();
            }
        }
        return value;
    }
    parseValue(value, params) {
        return parseDurationValue(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return (_a = parseDurationValue(value, params.col)) !== null && _a !== void 0 ? _a : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0R1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDaEUsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE1BQU0sT0FBTyxjQUFlLFNBQVEsb0JBQW9CO0lBQXhEOztRQUNFLHNCQUFpQixHQUFHO1lBQ2xCLFFBQVEsRUFBRSxDQUFDO1NBQ1osQ0FBQztJQWdDSixDQUFDO0lBOUJDLGNBQWMsQ0FDWixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsS0FBSyxHQUFHLHNCQUFzQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxVQUFVLENBQ1IsS0FBVSxFQUNWLE1BQTJDO1FBRTNDLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLEtBQVUsRUFDVixNQUEyQzs7UUFFM0MsT0FBTyxNQUFBLGtCQUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0NBQ0YifQ==
import { SilentTypeConversionError } from '../../../lib/error';
import AbstractColumnHelper from '../column.interface';
import { parseJsonValue, serializeJsonValue } from '../utils';
export class JsonHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {};
    }
    serializeValue(value) {
        value = serializeJsonValue(value);
        if (value === null) {
            throw new SilentTypeConversionError();
        }
        return value;
    }
    parseValue(value) {
        return parseJsonValue(value);
    }
    parsePlainCellValue(value) {
        return parseJsonValue(value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL2NvbHVtbnMvSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEQsT0FBTyxvQkFBb0IsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTlELE1BQU0sT0FBTyxVQUFXLFNBQVEsb0JBQW9CO0lBQXBEOztRQUNFLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztJQW1CekIsQ0FBQztJQWpCQyxjQUFjLENBQUMsS0FBVTtRQUN2QixLQUFLLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFVO1FBQzVCLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRiJ9
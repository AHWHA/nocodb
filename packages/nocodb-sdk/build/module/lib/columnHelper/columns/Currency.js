import { SilentTypeConversionError } from '../../../lib/error';
import { parseCurrencyValue, serializeCurrencyValue } from '..';
import AbstractColumnHelper from '../column.interface';
export class CurrencyHelper extends AbstractColumnHelper {
    constructor() {
        super(...arguments);
        this.columnDefaultMeta = {
            currency_locale: 'en-US',
            currency_code: 'USD',
        };
    }
    serializeValue(value, params) {
        value = serializeCurrencyValue(value);
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
        return parseCurrencyValue(value, params.col);
    }
    parsePlainCellValue(value, params) {
        var _a;
        return `${(_a = this.parseValue(value, params)) !== null && _a !== void 0 ? _a : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci9jb2x1bW5zL0N1cnJlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDaEUsT0FBTyxvQkFFTixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE1BQU0sT0FBTyxjQUFlLFNBQVEsb0JBQW9CO0lBQXhEOztRQUNFLHNCQUFpQixHQUFHO1lBQ2xCLGVBQWUsRUFBRSxPQUFPO1lBQ3hCLGFBQWEsRUFBRSxLQUFLO1NBQ3JCLENBQUM7SUFnQ0osQ0FBQztJQTlCQyxjQUFjLENBQ1osS0FBVSxFQUNWLE1BQTJDO1FBRTNDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUkseUJBQXlCLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FDUixLQUFVLEVBQ1YsTUFBMkM7UUFFM0MsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsS0FBVSxFQUNWLE1BQTJDOztRQUUzQyxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsbUNBQUksRUFBRSxFQUFFLENBQUM7SUFDbkQsQ0FBQztDQUNGIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberize = void 0;
const numberize = (value) => {
    if (value === undefined || value === null) {
        return value;
    }
    if (typeof value === 'number') {
        return value;
    }
    else {
        const result = parseInt(value);
        if (isNaN(result)) {
            return undefined;
        }
        return result;
    }
};
exports.numberize = numberize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL251bWJlclV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBdUIsRUFBRSxFQUFFO0lBQ25ELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDMUMsT0FBTyxLQUFrQixDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzlCLE9BQU8sS0FBZSxDQUFDO0lBQ3pCLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbEIsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDLENBQUM7QUFiVyxRQUFBLFNBQVMsYUFhcEIifQ==
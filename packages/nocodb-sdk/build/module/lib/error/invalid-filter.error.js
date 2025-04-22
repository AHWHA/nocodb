import { NcSDKError } from "../errorUtils";
;
export class InvalidFilterError extends NcSDKError {
    constructor(info) {
        var _a;
        let message = (_a = info.message) !== null && _a !== void 0 ? _a : 'INVALID_FILTER';
        if (info.lexingError) {
            const lexingErrorMessage = info.lexingError.map(k => k.message).join(', ');
            message = `${message} lexing_error: ${lexingErrorMessage}`;
        }
        else if (info.parsingError) {
            const parsingErrorMessage = info.parsingError.map(k => k.message);
            message = `${message} parsing_error: ${parsingErrorMessage}`;
        }
        super(message);
        this.info = info;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1maWx0ZXIuZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Vycm9yL2ludmFsaWQtZmlsdGVyLmVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLMUMsQ0FBQztBQUNGLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxVQUFVO0lBQ2hELFlBQTRCLElBQTRCOztRQUN0RCxJQUFJLE9BQU8sR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLGdCQUFnQixDQUFDO1FBQy9DLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNFLE9BQU8sR0FBRyxHQUFHLE9BQU8sa0JBQWtCLGtCQUFrQixFQUFFLENBQUM7UUFDN0QsQ0FBQzthQUFNLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzVCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEUsT0FBTyxHQUFHLEdBQUcsT0FBTyxtQkFBbUIsbUJBQW1CLEVBQUUsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBVFksU0FBSSxHQUFKLElBQUksQ0FBd0I7SUFVeEQsQ0FBQztDQUNGIn0=
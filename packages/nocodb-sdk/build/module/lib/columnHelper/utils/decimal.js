export const allowedDecimalRegex = /[-0123456789.]/g;
export const extractDecimalFromString = (value) => {
    const extractedArrFromRegex = value.match(allowedDecimalRegex);
    if (!extractedArrFromRegex || extractedArrFromRegex.length === 0)
        return '';
    let dotExists = false;
    const isMinus = extractedArrFromRegex[0] === '-';
    const extractedValueFromRegex = extractedArrFromRegex
        .filter((k) => {
        if (k === '.' && dotExists) {
            return false;
        }
        else if (k === '.') {
            dotExists = true;
        }
        else if (k === '-') {
            return false;
        }
        return true;
    })
        .join('');
    return (isMinus ? '-' : '') + extractedValueFromRegex;
};
export const composeNewDecimalValue = (props) => {
    var _a, _b, _c;
    return extractDecimalFromString([
        props.lastValue.substring(0, (_a = props.selectionStart) !== null && _a !== void 0 ? _a : 0),
        props.newValue,
        props.lastValue.substring((_c = (_b = props.selectionEnd) !== null && _b !== void 0 ? _b : props.selectionStart) !== null && _c !== void 0 ? _c : 0),
    ].join(''));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL3V0aWxzL2RlY2ltYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUM7QUFDckQsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUN4RCxNQUFNLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvRCxJQUFJLENBQUMscUJBQXFCLElBQUkscUJBQXFCLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM1RSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsTUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0lBQ2pELE1BQU0sdUJBQXVCLEdBQUcscUJBQXFCO1NBQ2xELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyx1QkFBdUIsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEtBS3RDLEVBQUUsRUFBRTs7SUFDSCxPQUFPLHdCQUF3QixDQUM3QjtRQUNFLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFBLEtBQUssQ0FBQyxjQUFjLG1DQUFJLENBQUMsQ0FBQztRQUN2RCxLQUFLLENBQUMsUUFBUTtRQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUN2QixNQUFBLE1BQUEsS0FBSyxDQUFDLFlBQVksbUNBQUksS0FBSyxDQUFDLGNBQWMsbUNBQUksQ0FBQyxDQUNoRDtLQUNGLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNYLENBQUM7QUFDSixDQUFDLENBQUMifQ==
import { isMailtoURI, isURL } from 'validator';
export const isValidURL = (str, extraProps) => {
    var _a;
    if (str.startsWith('mailto'))
        return isMailtoURI(str);
    let require_host = (_a = extraProps === null || extraProps === void 0 ? void 0 : extraProps.require_host) !== null && _a !== void 0 ? _a : true;
    if (str.startsWith('file://') || str.startsWith('tel:')) {
        require_host = false;
    }
    return isURL(`${str}`, Object.assign(Object.assign({}, (extraProps || {})), { require_host, protocols: ['http', 'https', 'ftp', 'file', 'tel'] }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb2x1bW5IZWxwZXIvdXRpbHMvdXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFnQixNQUFNLFdBQVcsQ0FBQztBQUU3RCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXLEVBQUUsVUFBeUIsRUFBRSxFQUFFOztJQUNuRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQUUsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEQsSUFBSSxZQUFZLEdBQUcsTUFBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsWUFBWSxtQ0FBSSxJQUFJLENBQUM7SUFFcEQsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN4RCxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxPQUFPLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxrQ0FDaEIsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLEtBQ3JCLFlBQVksRUFDWixTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ2xELENBQUM7QUFDTCxDQUFDLENBQUMifQ==
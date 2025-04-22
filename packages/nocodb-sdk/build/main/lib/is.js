"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ncIsNullOrUndefined = exports.isPrimitiveValue = exports.ncIsArrayIncludes = exports.ncIsPromise = exports.ncIsFunction = exports.ncIsNull = exports.ncIsUndefined = exports.ncIsBoolean = exports.ncIsNaN = exports.ncIsNumber = exports.ncIsString = exports.ncIsEmptyArray = exports.ncIsArray = exports.ncHasProperties = exports.ncIsEmptyObject = exports.ncIsObject = void 0;
/**
 * Checks if a value is an object (excluding null).
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 *
 * @example
 * ```typescript
 * const value = { key: 'value' };
 * console.log(ncIsObject(value)); // true
 * ```
 */
function ncIsObject(value) {
    return value !== null && typeof value === 'object' && !ncIsArray(value);
}
exports.ncIsObject = ncIsObject;
/**
 * Checks if a value is an empty object.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an empty object, false otherwise.
 *
 * @example
 * ```typescript
 * const value = {};
 * console.log(ncIsEmptyObject(value)); // true
 * ```
 */
function ncIsEmptyObject(value) {
    return ncIsObject(value) && Object.keys(value).length === 0;
}
exports.ncIsEmptyObject = ncIsEmptyObject;
function ncHasProperties(value, keys) {
    return ncIsObject(value) && keys.every((key) => key in value);
}
exports.ncHasProperties = ncHasProperties;
/**
 * Checks if a value is an array.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an array, false otherwise.
 *
 * @example
 * ```typescript
 * const value = [1, 2, 3];
 * console.log(ncIsArray(value)); // true
 * ```
 */
function ncIsArray(value) {
    return Array.isArray(value);
}
exports.ncIsArray = ncIsArray;
/**
 * Checks if a value is an empty array.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is an empty array, false otherwise.
 *
 * @example
 * ```typescript
 * const value = [];
 * console.log(ncIsEmptyArray(value)); // true
 *
 * const nonEmptyArray = [1, 2, 3];
 * console.log(ncIsEmptyArray(nonEmptyArray)); // false
 * ```
 */
function ncIsEmptyArray(value) {
    return ncIsArray(value) && value.length === 0;
}
exports.ncIsEmptyArray = ncIsEmptyArray;
/**
 * Checks if a value is a string.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is a string, false otherwise.
 *
 * @example
 * ```typescript
 * const value = 'Hello, world!';
 * console.log(ncIsString(value)); // true
 * ```
 */
function ncIsString(value) {
    return typeof value === 'string';
}
exports.ncIsString = ncIsString;
/**
 * Checks if a value is a number.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is a number, false otherwise.
 *
 * @example
 * ```typescript
 * const value = 42;
 * console.log(ncIsNumber(value)); // true
 * ```
 */
function ncIsNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}
exports.ncIsNumber = ncIsNumber;
/**
 * Checks if a value is NaN (Not-a-Number).
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is NaN, false otherwise.
 *
 * @example
 * ```typescript
 * console.log(ncIsNaN(NaN)); // true
 * console.log(ncIsNaN("abc")); // true
 * console.log(ncIsNaN(42)); // false
 * console.log(ncIsNaN("42")); // false
 * ```
 */
function ncIsNaN(value) {
    if (ncIsNumber(value))
        return false;
    if (!value || isNaN(Number(value)))
        return true;
    return false;
}
exports.ncIsNaN = ncIsNaN;
/**
 * Checks if a value is a boolean.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is a boolean, false otherwise.
 *
 * @example
 * ```typescript
 * const value = true;
 * console.log(ncIsBoolean(value)); // true
 * ```
 */
function ncIsBoolean(value) {
    return typeof value === 'boolean';
}
exports.ncIsBoolean = ncIsBoolean;
/**
 * Checks if a value is undefined.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is undefined, false otherwise.
 *
 * @example
 * ```typescript
 * const value = undefined;
 * console.log(ncIsUndefined(value)); // true
 * ```
 */
function ncIsUndefined(value) {
    return typeof value === 'undefined';
}
exports.ncIsUndefined = ncIsUndefined;
/**
 * Checks if a value is null.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is null, false otherwise.
 *
 * @example
 * ```typescript
 * const value = null;
 * console.log(ncIsNull(value)); // true
 * ```
 */
function ncIsNull(value) {
    return value === null;
}
exports.ncIsNull = ncIsNull;
/**
 * Checks if a value is a function.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is a function, false otherwise.
 *
 * @example
 * ```typescript
 * const value = () => {};
 * console.log(ncIsFunction(value)); // true
 * ```
 */
function ncIsFunction(value) {
    return typeof value === 'function';
}
exports.ncIsFunction = ncIsFunction;
/**
 * Checks if a value is a promise.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is a Promise, false otherwise.
 *
 * @example
 * ```typescript
 * const value = new Promise((resolve) => resolve(true));
 * console.log(ncIsPromise(value)); // true
 * ```
 */
function ncIsPromise(value) {
    return value instanceof Promise;
}
exports.ncIsPromise = ncIsPromise;
/**
 * Checks whether an array includes a specific value.
 *
 * If an `objectKey` is provided and the array consists of objects, it will check
 * whether the value of the specified `objectKey` in any object matches the given value.
 *
 * @param {T[]} array - The array to check.
 * @param {any} value - The value to search for in the array.
 * @param {keyof T} [objectKey] - The key to check in objects, if the array contains objects.
 *
 * @returns {boolean} - Returns `true` if the value or object with matching `objectKey` is found, otherwise `false`.
 *
 * @example
 * // For primitive arrays
 * ncIsArrayIncludes([1, 2, 3], 2) // true
 *
 * // For arrays with objects
 * ncIsArrayIncludes([{ id: 1 }, { id: 2 }], 2, 'id') // true
 */
function ncIsArrayIncludes(array = [], value, objectKey) {
    if (!ncIsArray(array) || !array.length)
        return false;
    if (objectKey && ncIsObject(array[0])) {
        return array.some((item) => item[objectKey] === value);
    }
    return array.includes(value);
}
exports.ncIsArrayIncludes = ncIsArrayIncludes;
function isPrimitiveValue(value) {
    return (ncIsString(value) ||
        ncIsNumber(value) ||
        ncIsBoolean(value) ||
        ncIsNull(value) ||
        ncIsUndefined(value));
}
exports.isPrimitiveValue = isPrimitiveValue;
/**
 * Checks if a value is null or undefined.
 *
 * @param value - The value to check.
 * @returns {boolean} - True if the value is null or undefined, false otherwise.
 *
 * @example
 * ```typescript
 * console.log(ncIsNullOrUndefined(null)); // true
 * console.log(ncIsNullOrUndefined(undefined)); // true
 * console.log(ncIsNullOrUndefined(0)); // false
 * console.log(ncIsNullOrUndefined('')); // false
 * ```
 */
function ncIsNullOrUndefined(value) {
    return value === null || typeof value === 'undefined';
}
exports.ncIsNullOrUndefined = ncIsNullOrUndefined;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2lzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLEtBQVU7SUFDbkMsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRkQsZ0NBRUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxLQUFVO0lBQ3hDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRkQsMENBRUM7QUFrQ0QsU0FBZ0IsZUFBZSxDQUM3QixLQUFVLEVBQ1YsSUFBdUI7SUFFdkIsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFMRCwwQ0FLQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLEtBQVU7SUFDbEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFGRCw4QkFFQztBQUVEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLEtBQVU7SUFDdkMsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELHdDQUVDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxTQUFnQixVQUFVLENBQUMsS0FBVTtJQUNuQyxPQUFPLE9BQU8s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
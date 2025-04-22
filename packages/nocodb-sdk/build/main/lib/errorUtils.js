"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.NcSDKError = void 0;
class NcSDKError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NcSDKError = NcSDKError;
class BadRequest extends NcSDKError {
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXJyb3JVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFVBQVcsU0FBUSxLQUFLO0lBQ25DLFlBQVksT0FBZTtRQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsZ0NBSUM7QUFFRCxNQUFhLFVBQVcsU0FBUSxVQUFVO0NBQUc7QUFBN0MsZ0NBQTZDIn0=
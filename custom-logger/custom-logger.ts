import { ErrorHandler, ClassProvider } from "@angular/core";
import { Logger, ErrorData } from "../node_modules/iris/app/api/v1/logging/logger";

declare var trackJs: any;
class CustomLogger extends Logger {
    error(error: ErrorData) {
        trackJs.track(error);
    }
}

export const TRACKJS_LOGGER: ClassProvider = {
    provide: Logger,
    useClass: CustomLogger
};

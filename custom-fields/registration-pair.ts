import { FieldData } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration } from "progress-sitefinity-adminapp-sdk/app/api/v1";

/**
 * A registration pair helper interface.
 */
export interface RegistrationPair {
    key: FieldData;
    registration: FieldRegistration;
}

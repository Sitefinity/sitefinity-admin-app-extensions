import { FieldData } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { FieldRegistration } from "progress-sitefinity-adminapp-sdk/app/api/v1";

export interface RegistrationPair {
    key: FieldData;
    registration: FieldRegistration;
}

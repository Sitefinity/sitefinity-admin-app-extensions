import { FieldRegistryKey } from "sitefinity-admin-app/app/api";
import { FieldRegistration } from "sitefinity-admin-app/app/api/v1/custom-fields/field-registration";

export interface RegistrationPair {
    key: FieldRegistryKey;
    registration: FieldRegistration;
}

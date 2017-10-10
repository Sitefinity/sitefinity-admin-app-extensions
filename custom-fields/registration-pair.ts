import { FieldRegistryKey } from "iris/app/api";
import { FieldRegistration } from "iris/app/api/v1/custom-fields/field-registration";

export interface RegistrationPair {
    key: FieldRegistryKey;
    registration: FieldRegistration;
}

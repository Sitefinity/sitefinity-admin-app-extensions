import { SettingsBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { ValidatorFn, Validators } from "@angular/forms";

/**
 * A settings object to configure the fields behavior. This object is assigned to the field via the settings property on the FieldBase class.
 * Examples of such are validations, the title to be shown and so on.
 */
export class CustomShortTextSettings extends SettingsBase {
    init(metadata: any) {
        super.init(metadata);

        // set the recommended characters for this field to 20
        this.recommendedCharacters = 20;
    }
    getValidators(): ValidatorFn[] {
        const baseValidators = super.getValidators();

        // add an email pattern validator
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValidator = Validators.pattern(emailPattern);
        baseValidators.push(emailValidator);

        return baseValidators;
    }
}

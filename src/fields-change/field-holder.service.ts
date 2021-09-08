import { Injectable } from "@angular/core";
import { FieldWrapper } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FieldHolderService {
    private tagsSubject = new BehaviorSubject<FieldWrapper>(null);

    public getTagsField(): BehaviorSubject<FieldWrapper> {
        return this.tagsSubject;
    }
}
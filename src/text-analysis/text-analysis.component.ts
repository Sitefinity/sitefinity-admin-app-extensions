import { Component, OnInit, ChangeDetectorRef, Inject } from "@angular/core";
import { forkJoin, fromEvent } from "rxjs";
import  MonkeyLearn  from 'monkeylearn';
import { FieldWrapper, HTTP_PREFIX, SelectorService, SELECTOR_SERVICE } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { Subscription } from "rxjs";
import { FieldHolderService } from "src/fields-change/field-holder.service";
import { HttpClient } from "@angular/common/http";

@Component({
    templateUrl: "./text-analysis.component.html",
    styleUrls: [ "./text-analysis.css" ],
})
export class TextAnalysisComponent implements OnInit {
    protected monkeyLearn = new MonkeyLearn('1668288d99b97463025967f17cd1a9db7a8a15b8');
    protected tags: Array<any>;
    public isVisible: boolean = false;
    public editorHost: any;
    subscription: Subscription;
    private selectedTags: string[] = [];
    private closeModalCallback: (data: any) => void;

    constructor(
        private http: HttpClient,
        private fieldsHolderService: FieldHolderService,
        private changeDetectorRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        let text = this.getKendoEditorStrippedValue();
        if (!text) {
            return;
        }

        this.getTags(text).then((tags) => {
            this.tags = tags;
            this.changeDetectorRef.detectChanges();
            console.log(tags);
        });
    }

    getKendoEditorStrippedValue(): string {
        let div = document.createElement("div");
        div.innerHTML = this.editorHost.getKendoEditor().value();

        let strippedText:string = div.innerText.replace(/[,.!?:;](?=\S)/g, '$& ');

        return strippedText;
    }

    getTags(text: string): any {
        return this.monkeyLearn.extractors.extract('ex_YCya9nrn', [text])
            .then(res => {
                return res.body[0].extractions;
        });
    }

    checkValue(tagName: string, event) {
        if (event.currentTarget.checked) {
            this.selectedTags.push(tagName);
        } else {
            const existing = this.selectedTags.findIndex(x => x === tagName);
            if (existing != -1) {
                this.selectedTags.splice(existing, 1);
            }
        }

        console.log(this.selectedTags);
    }

    onSaveClick() {
        const selectedTagIds = [];

        this.http.get(`${HTTP_PREFIX}/sf/system/taxonomies?$filter=Name eq 'Tags'`).subscribe((taxonomyResult: any) => {

            this.selectedTags.forEach((tag) => {
                this.http.get(`${HTTP_PREFIX}/sf/system/flat-taxa?$filter=Title eq '${tag}'`).subscribe((tagResult: any) => {
                    if (tagResult.value.length > 0) {
                        selectedTagIds.push(tagResult.value[0].Id);
                        this.tryCloseDialog(selectedTagIds);
                    } else {
                        this.http.post(`${HTTP_PREFIX}/sf/system/flat-taxa`, {
                            Title: tag,
                            TaxonomyId: taxonomyResult.value[0].Id
                        }).subscribe((tagCreationResult: any) => {
                            selectedTagIds.push(tagCreationResult.Id);
                            this.tryCloseDialog(selectedTagIds);
                        })
                    }
                });
            });
        });
    }

    tryCloseDialog(selectedTagIds: string[]) {
        if (this.selectedTags.length == selectedTagIds.length) {
            const fieldRef = this.fieldsHolderService.getTagsField().getValue();
            fieldRef.writeValue(selectedTagIds);
            (fieldRef as any).wrappedField.getItemTaxa();
            this.closeModalCallback(null);
        }
    }

    setCloseModalCallback(closeModalCallback: (data: any) => void): void {
        this.closeModalCallback = closeModalCallback;
    }
}
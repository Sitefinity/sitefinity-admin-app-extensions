import { Component, Input } from "@angular/core";
import { CustomTreeComponentBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";

@Component({
    template: `
    <div>{{item?.Title}} - {{item?.CreatedBy}}</div>
    <div class="sf-tree__description sf-breadcrumb -sf-overflow-ellipsis">
        <span>
            Created on {{item?.DateCreated}}
        </span>
    </div>
    `
})
export class RelatedDataCustomComponent extends CustomTreeComponentBase {
    @Input() item: any;
}

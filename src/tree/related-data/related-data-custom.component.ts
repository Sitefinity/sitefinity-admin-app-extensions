import { Component, Input } from "@angular/core";
import { DataItem } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { CustomTreeNodeComponentBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";

@Component({
    template: `
    <div>{{item.data.Title}} - {{item.data.CreatedBy}}</div>
    <div class="sf-tree__description sf-breadcrumb -sf-overflow-ellipsis">
        <span>
            Created on {{item.data.DateCreated}}
        </span>
    </div>
    `
})
export class RelatedDataCustomComponent extends CustomTreeNodeComponentBase {
    @Input() item: DataItem;
}

import { Component, Input } from "@angular/core";
import { DataItem } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { CustomTreeNodeComponentBase } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";

@Component({
    template: `
    <div>{{item.data.Title}} <span >&bull;&nbsp;</span> <span data-sftest="custom-created-by">{{item.data.CreatedBy}}</span></div>
    <div class="sf-tree__description sf-breadcrumb -sf-overflow-ellipsis">
        <span data-sftest="custom-created-on">
            {{item.data.DateCreated | date:"medium" }}
        </span>
    </div>
    `
})
export class RelatedDataCustomComponent extends CustomTreeNodeComponentBase {
    @Input() item: DataItem;
}

import { ClassProvider } from "@angular/core";
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { TreeNodeComponentProvider , CUSTOM_TREE_COMPONENT_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";
import { TreeNodeComponentFeatures } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree/custom-tree-node-component-features";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataTreeNodeComponentProvider implements TreeNodeComponentProvider {
    getComponentData(feature: TreeNodeComponentFeatures, entitySet: string): ComponentData {
        if (feature === TreeNodeComponentFeatures.RelatedData && entitySet === "newsitems") {
            const componentData: ComponentData = {
                type: RelatedDataCustomComponent
            };

            return componentData;
        }

        return null;
    }
}

export const CUSTOM_TREE_COMPONENT_PROVIDER: ClassProvider = {
    useClass: RelatedDataTreeNodeComponentProvider,
    multi: true,
    provide: CUSTOM_TREE_COMPONENT_TOKEN
};

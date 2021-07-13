import { ClassProvider } from "@angular/core";
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { TreeNodeComponentProvider , CUSTOM_TREE_COMPONENT_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";
import { TreeNodeComponentFeatures } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree/custom-tree-node-component-features";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataCustomTreeComponentProvider implements TreeNodeComponentProvider {
    componentDataMap: Map<string, any>;
    featureMap: Map<TreeNodeComponentFeatures, Map<string, ComponentData>>;

    constructor() {
        this.featureMap = new Map<TreeNodeComponentFeatures, Map<string, ComponentData>>();

        const componentDataMap = new Map<string, ComponentData>();
        componentDataMap.set("newsitems", this.createSampleComponent());

        this.featureMap.set(TreeNodeComponentFeatures.RelatedData, componentDataMap)
    }

    getComponentData(feature: TreeNodeComponentFeatures, entitySet: string): ComponentData {
        return this.featureMap.get(feature)?.get(entitySet);
    }

    private createSampleComponent(): ComponentData {
        const componentData: ComponentData = {
            type: RelatedDataCustomComponent
        };

        return componentData;
    }
}

export const CUSTOM_TREE_COMPONENT_PROVIDER: ClassProvider = {
    useClass: RelatedDataCustomTreeComponentProvider,
    multi: true,
    provide: CUSTOM_TREE_COMPONENT_TOKEN
};

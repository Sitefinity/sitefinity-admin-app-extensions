
import { ClassProvider } from "@angular/core";
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { CustomTreeComponentProvider, CUSTOM_TREE_COMPONENT_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataCustomTreeComponentProvider implements CustomTreeComponentProvider {
    componentDataMap: Map<string, any>;
    feature: string;

    constructor() {
        this.feature = "related-data";
        this.componentDataMap = new Map<string, ComponentData>();
        this.componentDataMap.set("newsitems", this.createSampleComponent());
    }

    private createSampleComponent(): ComponentData {
        const componentData: ComponentData = {
            type: RelatedDataCustomComponent,
            afterComponentInit: (component: RelatedDataCustomComponent) => {
                // console.log(component);
            }
        };

        return componentData;
    }
}

export const CUSTOM_TREE_COMPONENT_PROVIDER: ClassProvider = {
    useClass: RelatedDataCustomTreeComponentProvider,
    multi: true,
    provide: CUSTOM_TREE_COMPONENT_TOKEN
};

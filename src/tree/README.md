# Custom components loaded in the tree

## Introduction
The tree component in the Sitefinity AdminApp is used in various places in the application, for example, the grid (the list of content items), the sidebar, related data and so forth. This extension will allow you to inject a custom Angualr component in the tree's item template. The picture below shows where the custom component will be rendered in the tree's item template. 

![Location of where the custom component will be rendered in the tree](./../../assets/tree/sample.png)

### Demo for related data
The custom component for the related data feature will be rendered, in the following parts of the UI
* already selected related items
* dropdown selector for the recent items and adjacent search feature
* related data selector and adjacent search feature
* readonly mode of the content item

![Demo](./../../assets/tree/RelatedDataCustomTreeComponent.gif)

The custom component you develop will get the currently rendered content item data passed into it, for example, the item passed in to the sample custom component has this json representation:
```json
{
   "Id":"cb6da2c7-466f-4b71-8ff2-4b7802b4c5a6",
   "LastModified":"2021-07-06T07:10:50Z",
   "PublicationDate":"2021-07-06T07:10:50Z",
   "Title":"NewsTitle63",
   "Description":null,
   "DateCreated":"2021-07-06T07:10:50Z",
   "IncludeInSitemap":true,
   "UrlName":"newstitle63",
   "ItemDefaultUrl":"/2021/07/06/newstitle63",
   "Tags":[
      
   ],
   "Category":[
      
   ],
   "AllowComments":true,
   "Summary":null,
   "Content":"NewsContent63",
   "Author":null,
   "SourceName":null,
   "SourceSite":null,
   "Urls":[
      
   ],
   "Provider":"OpenAccessDataProvider",
   "CreatedBy":"Admin Admin",
   "LastModifiedBy":"",
   "AvailableLanguages":[
      "en"
   ],
   "Comments":[
      
   ],
   "LockedStatus":null,
   "DisplayStatus":[
      {
         "Name":"Published",
         "Source":"Lifecycle",
         "Label":"Published",
         "DetailedLabel":"Published",
         "PublicationDate":null,
         "ExpirationDate":null,
         "Date":"2021-07-06T07:12:02.153Z",
         "User":"Admin Admin",
         "Id":null,
         "Message":{
            "Title":null,
            "Description":null,
            "Operations":[
               
            ]
         }
      }
   ],
   "FirstPublished":{
      "Date":"2021-07-06T07:12:02.153Z",
      "User":"Admin Admin",
      "Id":null
   },
   "LastPublished":{
      "Date":"2021-07-06T07:12:02.153Z",
      "User":"Admin Admin",
      "Id":null
   },
   "RelatedEvents":[
      
   ],
   "RelatedNews":[
      
   ],
   "SimilarNews":[
      
   ]
}
```

> Please note that the search functionality in the related data fields (and in the entire AdminApp) is based on the item's primary identifier, which in the case of the default content modules is the `Title`. When you modify the component rendered in the tree's item template, it will not affect the search feature. If you would like to add another field to be included in the search, please see the [search config]("./../../search").

## Development process

### Implement the component

Implement a component as you normally would in Angular, with just one requirement, that your custom component **must** extend the `abstract class CustomTreeComponentBase`, it will force you to implement the only property `item: any`, which as stated on top, will be populated by the item that is going to be rendered.

```typescript
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

```

### Registering the component

The component you have implemented must be registered in a class that implements the `TreeNodeComponentProvider` interface. The interface has a single method `getComponentData` which accepts two parameters, `feature` of type `TreeNodeComponentFeatures`, which currently supports only one feature - the related data, and `entitySet` which is a `string`, intended to represent the currently loaded data. This method will be called by the AdminApp, for example if we assume that your project's news items, have a related data field for events, the values passed in the method will `TreeNodeComponentFeatures.RelatedData` and `events`, therefore your implementation of the provider should return a `ComponentData` object that you would like to be used when displaying the related data nodes in the content item.

* "albums"
* "blogposts"
* "blogs"
* "calendars"
* "contentitems"
* "documentlibraries"
* "events"
* "flat-taxa"
* "folders"
* "form-drafts"
* "hierarchy-taxa"
* "images"
* "listitems"
* "lists"
* "newsitems"
* "pages"
* "sites"
* "taxonomies"
* "videolibraries"
* "videos"

When it comes to the content items created with the Sitefinity Module Builder, their entity set names are generated in the following way;

Go to Sitefinity > Administration > Module Builder > { desired module } > Code reference for { desired module } > Create a { desired module item (i.e. Press release) }
Find the namespace of the type, for example Telerik.Sitefinity.DynamicTypes.Model.Pressreleases.PressRelease
The last part of the namespace, all lower letters and pluralized is the entity set name pressreleases

To implement a custom provider you start of by creating a custom class, which for the sake of the sample will be called `RelatedDataTreeNodeComponentProvider` and it must implement the `TreeNodeComponentProvider` interface.

```typescript
import { TreeNodeComponentProvider, ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { TreeNodeComponentFeatures } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree/custom-tree-node-component-features";

export class RelatedDataTreeNodeComponentProvider implements TreeNodeComponentProvider {

    getComponentData(feature: TreeNodeComponentFeatures, entitySet: string): ComponentData {
    }
}

```

In the sample implementation we've chosen to use a map to register the custom components and have the `getComponentData` method return a single `ComponentData` object. Populate the `componentDataMap` with the data pointing to your custom angular component. When setting the entry in the map, please note that the key should be the entity set for which you would like your component to be used, i.e. `"newsitems"` for the Sitefinity news items content type.

```typescript
import { TreeNodeComponentProvider, ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { TreeNodeComponentFeatures } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree/custom-tree-node-component-features";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataTreeNodeComponentProvider implements TreeNodeComponentProvider {
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
```

Almost there, we need to export the provider using a special Angualr DI token `CUSTOM_TREE_COMPONENT_TOKEN`.

```typescript
import { ClassProvider } from "@angular/core";
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { TreeNodeComponentProvider , CUSTOM_TREE_COMPONENT_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";
import { TreeNodeComponentFeatures } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree/custom-tree-node-component-features";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataTreeNodeComponentProvider implements TreeNodeComponentProvider {
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
    useClass: RelatedDataTreeNodeComponentProvider,
    multi: true,
    provide: CUSTOM_TREE_COMPONENT_TOKEN
};
```

Last but not least, we must create a custom angular module for this extension (you could reuse another module if you have created one previously) and register it where all other extension are registered.

Custom module: 

```typescript
import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { CUSTOM_TREE_COMPONENT_PROVIDER } from "./related-data-custom-tree-node-component-provider";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

@NgModule({
    declarations: [
        RelatedDataCustomComponent
    ],
    entryComponents: [
        RelatedDataCustomComponent
    ],
    providers: [
        CUSTOM_TREE_COMPONENT_PROVIDER,
        DatePipe
    ],
    imports: [
        CommonModule
    ]
})
export class RelatedDateExtenderModule { /* empty */ }

```

To register the module, go to the `__extensions_index.ts` file and add the following line:

```typescript
sitefinityExtensionsStore.addExtensionModule(RelatedDateExtenderModule);
```

Your `__extensions_index.ts` file should look something like this:

```typescript
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { RelatedDateExtenderModule } from "./tree/related-data";

declare var sitefinityExtensionsStore: SitefinityExtensionStore;

sitefinityExtensionsStore.addExtensionModule(RelatedDateExtenderModule);
```

> If you think that we should improve this extension, or for that matter anything in the Sitefinity product, please submit an enhancement request, for more information on how to do so, please see this [knowledge base article](https://knowledgebase.progress.com/articles/Knowledge/P11255). We also welcome issues in this github repo.
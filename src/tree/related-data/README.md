# Custom components loaded in the tree

## Intro
The tree component in the Sitefinity AdminApp is used in various places in the application, for example, the grid (the list of content items), the sidebar, related data and so forth. This extension will allow you to inject a custom Angualr component in the tree's item template. The picture below shows where the custom component will be rendered in the tree's item template. 

![Location of where the custom component will be rendered in the tree](./../../../assets/tree/sample.png)

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

```

### Registering the component

The component you have implemented must be registered in a class that implements the `CustomTreeComponentProvider` interface. The interface has two properties, `feature: string` which determines in which area of the AdminApp the custom component will be injected in the tree, *please note that currently only `"related-data"` is supported.*, this property cannot be a null or empty string. The other property is the `componentDataMap: Map<string, ComponentData>`. The key of the map is the so-called entity set names in the AdminApp, here is a list of all the default entity set names in the app:

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

To implement a custom provider you start of by creating a custom class, which for the sake of the sample will be called `RelatedDataCustomTreeComponentProvider` and it must implement the `CustomTreeComponentProvider` interface.

```typescript
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { CustomTreeComponentProvider } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";

export class RelatedDataCustomTreeComponentProvider implements CustomTreeComponentProvider {
    componentDataMap: Map<string, ComponentData>;
    feature: string;
}

```

Then you must specify the `feature` in which this provider will be used, the constructor of this class is a convenient place to do so.

```typescript
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { CustomTreeComponentProvider } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";

export class RelatedDataCustomTreeComponentProvider implements CustomTreeComponentProvider {
    componentDataMap: Map<string, ComponentData>;
    feature: string;

    constructor() {
        this.feature = "related-data";
    }
}
```

Now you must populate the `componentDataMap` with the data pointing to your custom angular component. When setting the entry in the map, please note that the key must be the entity set for which you would like your component to be used, i.e. `"newsitems"` for the Sitefinity news items content type.

```typescript
import { ComponentData } from "@progress/sitefinity-adminapp-sdk/app/api/v1/index-component/component-data";
import { CustomTreeComponentProvider } from "@progress/sitefinity-adminapp-sdk/app/api/v1/tree";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

export class RelatedDataCustomTreeComponentProvider implements CustomTreeComponentProvider {
    componentDataMap: Map<string, ComponentData>;
    feature: string;

    constructor() {
        this.feature = "related-data";
        this.componentDataMap = new Map<string, ComponentData>();
        this.componentDataMap.set("newsitems", this.createSampleComponent());
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
```

Last but not least, we must create a custom angular module for this extension (you could reuse another module if you have created one previously) and register it where all other extension are registered.

Custom module: 

```typescript
import { NgModule } from "@angular/core";
import { CUSTOM_TREE_COMPONENT_PROVIDER } from "./related-data-custom-tree-component-provider";
import { RelatedDataCustomComponent } from "./related-data-custom.component";

@NgModule({
    declarations: [
        RelatedDataCustomComponent
    ],
    entryComponents: [
        RelatedDataCustomComponent
    ],
    providers: [
        CUSTOM_TREE_COMPONENT_PROVIDER
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
# Custom grid

> IMPORTANT - Please note that there is a known limitation, you cannot use the Angular binding syntax {{item.data.CreatedBy}}, when creating component HTML templates, you must use another binding, for example [textContent]="item.data.CreatedBy", or [innerHtml]="item.data.Content".

You can add custom columns in the grid that show more information about the specific data item, for example related data or media, or any other kind of information, like data from external systems. What is more you can also remove some of the existing columns that bring no value to you. In order to achieve this, you have to use a specific extensibility point. A custom implementation of the [**ListColumnsProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html) interface must be provided. 

Its method [**getColumns()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html#getcolumns) is used to add new custom columns. The method returns an **Observable** of the [**ColumnModel**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html) object. 

The [**ColumnModel**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html) object has several properties. Most notable is the [**componentData**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html#componentdata) which is a reference to the component that is displayed in the grid cell. This component should inherit the [**DataContextComponent**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html) interface which brings the [**context**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html#context) property.

Once the component is instantiated, the Admin App assigns the [**context**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html#context) property to it, that contains information for the current item, as well as all model properties you passed through using the [**ComponentData**](http://admin-app-extensions-docs.sitefinity.site/interfaces/componentdata.html#properties) interface. 

The custom component you defined is displayed in the grid cell.

The other method of the interface [**getColumnsToRemove()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html#getcolumnstoremove) is used to remove some of the default columns. The method returns an **Observable<string[]>** with the names of the columns to be removed.

## Arranging custom columns in the grid

You can arrange your custom columns in the grid via the [**ColumnModel's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html) [**ordinal?**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html#ordinal) property. 

Prerequisite: The columns that come from Sitefinity have a some limitations
- the **Main** (usually Title) column will **always** be the first (leftmost) column with an ordinal of `Number.MIN_SAFE_INTEGER` 
- the **Actions** column will **always** be the last (rightmost) column with an ordinal of `Number.MAX_SAFE_INTEGER`
    - the **Analytics** column, if present, will **always** be right before (to the left of) the **Actions** column with an ordinal of `Number.MAX_SAFE_INTEGER - 1`
    - the **Sitefinity Insights** column, if present, will **always** be right before (to the left of) the **Analytics** column with an ordinal of `Number.MAX_SAFE_INTEGER - 2`

All other columns are spaced by `100`. For example if the columns that come from Sitefinity are: Main, Calendar, Start Date, End Date, Translations and Actions in that order, their respective ordinals will be `Number.MIN_SAFE_INTEGER`, `100`, `200`, `300`, `400` and `Number.MAX_SAFE_INTEGER`. In this case if you would like to position your custom column between the Start Date and End Date columns you would have to give your column an ordinal in the range of `201-299` inclusive.

Notes:
- You should never create a column with an ordinal that is reducable by a modulo of 100, i.e. `0 % 100 = 0`, `200 % 100 = 0`.
- If a custom column is left without supplying a ordinal property it will be the last column before the system last column(s).

You may have noticed that the **Author** column is missing for all content types, and that the **DateCreated**, **LastModified** columns are missing from hierarchical content types. We have added a way for you to whitelist those columns pre content type in the AdminApp's `config.json` file:

```json
{
  "editorSettings": { 
    // omitted for brevity
  },
  "columnsSettings":{
    "columnNamesWhitelist": {
      "newsitems": ["Author"],
      "pressreleases": ["Author", "DateCreated", "LastModified"]
    }
  }
}
```

Where you see `newsitems` and `pressreleases`, these keys are the so-called entity set names in the AdminApp, here is a list of all the default entity set names in the app:

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

 When it comes to the content items created with the Sitefinity Module Builder, their entity set names are generated in the follwing way;
1. Go to Sitefinity > Administraton > Module Builder > { desired module } > Code reference for { desired module } > Create a { desired module item (i.e. Press release) }
2. Find the namespace of the type, for example `Telerik.Sitefinity.DynamicTypes.Model.Pressreleases.PressRelease`
3. The **last** part of the namespace, all lower letters and pluralized is the entity set name `pressreleases`


## Example

![Image column](./../../assets/image-column.JPG)

> **Important notes**:
> * As of Sitefinity 13.3.7622.0 the `config.json` file is no longer shipped with the product.
> * The `config.json` file is located in `{{project_root}}/SitefinityWebApp/AdminApp`, if it is missing please create your own file so that you may apply the desired configurations.

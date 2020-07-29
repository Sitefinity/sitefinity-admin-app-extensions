# Custom grid

You can add custom columns in the grid that show more information about the specific data item, for example related data or media, or any other kind of information, like data from external systems. What is more you can also remove some of the existing columns that bring no value to you. In order to achieve this, you have to use a specific extensibility point. A custom implementation of the [**ListColumnsProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html) interface must be provided. 

Its method [**getColumnsToRemove()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html#getcolumnstoremove) is used to remove some of the default columns. The method returns an **Observable<string[]>** with the names of the columns to be removed.
Its other method [**getColumns()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/listcolumnsprovider.html#getcolumns) is used to add new custom columns. The method returns an **Observable** of the [**ColumnModel**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html) object. 

The [**ColumnModel**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html) object has several properties. Most notable is the [**componentData**](http://admin-app-extensions-docs.sitefinity.site/interfaces/columnmodel.html#componentdata) which is a reference to the component that is displayed in the grid cell. This component should inherit the [**DataContextComponent**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html) interface which brings the [**context**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html#context) property.

Once the component is instantiated, the Admin App assigns the [**context**](http://admin-app-extensions-docs.sitefinity.site/interfaces/datacontextcomponent.html#context) property to it, that contains information for the current item, as well as all model properties you passed throug using the [**ComponentData**](http://admin-app-extensions-docs.sitefinity.site/interfaces/componentdata.html#properties) interface. 

The custom component you defined is displayed in the grid cell.

## Example

![Image column](./../assets/image-column.JPG)

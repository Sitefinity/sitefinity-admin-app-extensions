# Add Custom commands

You can register custom command and execute some custom logic when executing them. They can be added in several places:
* in the grid view (next to the Create command)
* in the grid view settings sidebar (next to the Permissions, Settings, Custom fields, etc. commands)
* in the grid *Bulk Actions* menu
* in the *Actions* menu of an item (both in the grid and in edit mode). 

In order to register a custom command, you have to implement the [**CommandProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandprovider.html) interface. The interface consists of two methods:

* [**getCommands()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandprovider.html#getcommands) - returns an **Observable** of [**CommandModel[]**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandmodel.html). The [**token.type**](http://admin-app-extensions-docs.sitefinity.site/interfaces/tokendata.html#type) property must contain either an **InjectionToken** or a **Type**. Once the Admin App identifies the [**token.type**](http://admin-app-extensions-docs.sitefinity.site/interfaces/tokendata.html#type) property, it dynamically instantiates the [**Command**](http://admin-app-extensions-docs.sitefinity.site/interfaces/command.html) implementation and invokes it with the data provided by the [**properties**](http://admin-app-extensions-docs.sitefinity.site/interfaces/tokendata.html#properties) property.

* [**getCategories()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandprovider.html#getcategories) - returns the categories of commands, described above.

To add a command to the exact place where you want the [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html) property of the [**getCommands()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandprovider.html#getcommands) has to be used. Example:

* To add a command to the grid view - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**List**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#list). **Important:** the command should have a category named 'Default'. Otherwise it will not be visible.

* To add a command to the grid view settings sidebar - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**List**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#list). **Important:** the command should have a category named 'Settings'. Otherwise it will not be visible.

* To add a command to the grid *Bulk Actions* menu - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**Bulk**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#bulk).

* To add a command to the grid *Actions* menu of an item - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should **not** be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**List**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#list).

* To add a command to the edit view *Actions* menu of an item - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should **not** be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**Edit**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#edit).

* To add a command to the create view *Actions* menu of an item - the [**dataItem's**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#dataitem) [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/dataitem.html#data) property should be null and the [**target**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html#target) property should have value [**Create**](http://admin-app-extensions-docs.sitefinity.site/enums/commandstarget.html#create).

# Remove default commands

You can not only add new custom commands but also remove some of the default ones. To achieve this you have to implement the [**CommandsFilter**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsfilter.html) interface. The interface consists of a single method:

* [**filter()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsfilter.html#filter) - the method acceps an array of [**CommandModel[]**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandmodel.html) that contains all commands and [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html) parameter. Similarly to when adding custom command you have to use the [**data**](http://admin-app-extensions-docs.sitefinity.site/interfaces/commandsdata.html) parameter to determine the place from where you want to remove the command (grid, bulk menu, actions menu, etc.). The method should return the filtered commands.

## Example

![Print preview](./../assets/print-preview.JPG)

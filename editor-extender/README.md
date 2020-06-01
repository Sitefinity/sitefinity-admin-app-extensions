# Custom content editor

When content editors edit their content, they can benefit from the Admin App Kendo UI editor that provides them with relevant text editing features. Out-of-the-box, content editors can work with image and link selector contextual toolsets for Sitefinity CMS content as well as many text formatting and styling options. You can also extend the editor capabilities by adding a custom functionality represented as a button in the editor toolbar. In order to do so a custom [**ToolBarItem**](http://admin-app-extensions-docs.sitefinity.site/interfaces/toolbaritem.html) has to be injected in the editor configuration.
To do this a custom implementation of the [**EditorConfigProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html) must be provided. The provider has a method [**getToolBarItems**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html#gettoolbaritems) that is invoked before the Kendo UI editor is instantiated. You need to provide a custom set of commands that you want to be displayed in the editor as a return result of this method.

Not only can you add commands to the Kendo UI editor but also you can remove such. The [**EditorConfigProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html) interface defines a method [**getToolBarItemsNamesToRemove**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html#gettoolbaritemsnamestoremove). The method should return an array with the names of the toolbar items that you want to remove. In case you don't want to remove any toolbar items the method should return an empty array.

**NOTE:** Only default Kendo UI toolbar items can be removed. Toolbar items added by custom implementations of the [**EditorConfigProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html) interface cannot be removed.

What is more you have the power to edit the configurations which are used to instantiate the Kendo UI editor. The [**EditorConfigProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html) interface defines a method [**configureEditor**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editorconfigprovider.html#configureeditor) that is invoked before the Kendo UI editor is instantiated. The method accepts the current editor configuration object and returns the modified configurations.

## Custom content editor samples

### [Custom content editor toolbar with insert symbol functionality](./insert-symbol/README.md).

### [Custom content editor toolbar with word count](./word-count/README.md).

### [Custom content editor toolbar with spellcheck functionality and spellcheck contextual toolset](./spell-check/README.md).

### [Custom content editor toolbar with insert video functionality](./sitefinity-videos/README.md).

### [Custom content editor toolbar with switch text direction functionality](./switch-text-direction/README.md).

  ## Sitefinity CMS Admin App extensions development kit with samples

### Overview

Leveraging the API-first approach of the Admin App, you can extend and add functionality, for example, in the *Actions* menu, in the grid, or in editing mode for content items. This repository contains everything you need to develop your extensions. The included examples demonstrate the main extensibility points of the API.

You can extend the Admin App API independently of the Sitefinity CMS in any IDE that you work with, for example, Visual Studio, Webstorm, Notepad++, and so on. Thus, you can develop and test your extended functionality against multiple Sitefinity CMS environments, local or external. Once finished, you can plug in your new functionality by producing a bundle and deploying it to your project.

**NOTE:** The samples in this reposotory are supported from Sitefintiy version 11.0.6700.0 and above.

### Prerequisites

Install the Node.js and npm. For more information, see [Installing node](https://docs.npmjs.com/getting-started/installing-node).

### Quick start

1. Clone or download this repository to a location of your choice and execute the following command in the repository **root** folder:
```
npm install
```

2. Start the development server by executing the following command:
```
npm start
```

3. When you are done developing execute the following command:
```
npm run build
```
As a result, a JavaScript file (**sample.extensions.bundle.js**) is generated in the **dist** folder.

4. Register your extensions with the Admin App by uploading the file **sample.extensions.bundle.js** in the **adminapp** subfolder of the Sitefinity CMS web application and then restart your Sitefinity CMS instance.


### Configure Sitefinity CMS for development of custom extensions

To enable Sitefinity CMS to recognize and allow working with the Admin App, you need to configure the following:


#### STS configuration
1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *Authentication* -> *SecurityTokenService* -> *IdentityServer* -> *Clients* -> *sitefinity*.
2. Under *Allowed cors origins*, click *Create new*.
Enter the URL of the development server of the Admin App Extensibility SDK.
The default value is **http://localhost:3000**.
3. Under **RedirectUris**, click the *Create new* button.
Enter **http://localhost:3000/assets/auth/silent-renew.html**
4. Under **RedirectUris**, click the *Create new* button.
Enter **http://localhost:3000/auth/oidc/sign-in**
5. Under **PostLogoutRedirectUris**, enter **http://localhost:3000/auth/oidc/sign-out**

**NOTE:** After modifying the authentication settings, you need to restart the application.

####	Web service configuration
1.	Navigate to *Administration* -> *Settings* -> *Advanced* -> *WebServices* -> *Routes* -> *Sitefinity* -> *services* -> *system* -> *Access Control Allow Origin (CORS)*
2.	Enter the URL of the development server of the Admin App Extensibility SDK. The default value is **http://localhost:3000**. 
3.	Save your changes.

The Admin App is now served on [localhost:3000](http://localhost:3000). When you first open the URL, you are prompted to configure the Sitefinity CMS instance you are working with. In the URL field, enter the instance details and then save the configuration. You can later change the configuration by navigating to [config](http://localhost:3000/config).
Once you setup the Sitefinity CMS instance, the server becomes in watch mode and automatically recompiles and serves any newly created files.

### Development and extensibility

With the Admin App Extensibility API, you can customize the Sitefinity CMS backend look and feel without a complex set of tooling, such as Visual Studio, IIS, or .NET framework. The Admin App and the Extensibility API are based on Angular and Typescript and the extensibility development is simple and intuitive, leveraging the Angular’s dependency injection (DI) mechanism and the architecture for writing NgModules. Thus, working with the Extensibility API resembles the straightforward code workflow of writing an Angular application.

#### NgModules

You use the **__extensions_index.ts** file as an entry point for extending the Admin App. You implement a single class with the **getNgModules()** method, which returns all the NgModules of the extension you implement. 
Once the method is invoked by the Admin App, all relevant modules are loaded. You can thus not only plug in to existing code but also write their own application-specific UI code. For example, you can register a route named **/custom** and then either navigate to it directly, or from a custom command in the *Actions* menu.

#### Dependency injection mechanism

The extensibility API leverages Angular DI mechanism via **InjectionTokens** and **ClassProviders**. Thus, you can start coding seamlessly straight away. The **multi** property of the class provider interface allows for multiple references to the same token. The Extensibility API endpoints use the multi property of the **ClassProviders**, so that multiple instances of the providers can coexist within the same bundle.

### Debugging
To start debugging, execute the following command:
**npm start**

The command will start the webpack development server and will host the Admin App alongisde the compiled extensions under http://localhost:3000. If you wish to debug the application simply open the developer tools on your browser and search for your code as with any regular Angular app.

**NOTE:** In case there are any runtime errors resulting from the output bundle, they are displayed in the console once the Admin App has loaded. If the errors are critical, the extensions are not loaded and the Admin App will attempt to continue functioning normally.

### Deployment

Once you are done with the backend customizations and development:
1.	Copy the output bundle from the **dist** folder.

**NOTE:** You can change the name of the **sample.extensions.bundle.js** file to any other name, for example, **<name_of_sample>.extensions.bundle.js**

2.	Paste the bundle in the **/adminapp** folder in the Sitefinity CMS project directory.
3.	Restart the Sitefinity CMS application, so that all files are processed.

**RESULT:** Next time you open Sitefinity CMS your customizations are visible in the backend.

### Multiple bundles support

After you execute the **npm run build** command, you get as an output the **sample.extensions.bundle** file. This file is a single bundle that contains a specific piece of functionality. With the Admin App, however, you can support more than one extensions bundle. This is handy when you need to compile two different types of functionalities and distribute them separately.
For example, the folder structure in Admin App folder may look like the following:

* **sample.extensions.bundle.js**
* **my-custom-code.extensions.bundle.js**
* **edtitor-power-tools.extensions.bundle.js**

**IMPORTANT:** You must follow the naming convention: **{{bundle prefix}}.extensions.bundle.js**
**NOTE:** the source map files **{{bundle prefix}}.extensions.bundle.js.map** are used only when developing the bundle, deploying to the Sitefinity site will have no effect.

### Extensibility endpoints

The Admin App provides you with several extensibility points for plugging your functionality in the interface.
The following provides you with some example extensions.

#### Custom *Actions* menu

You can register a custom command in the *Actions* menu of an item. To do this, you implement the **CommandProvider** interface. The interface consists of two methods:

* The first method returns an **Observable** of **CommandModels**.
You can configure these commands to be placed in either the grid *Actions* menu or in the *Action* menu in the content editor. 
The **token.type** property must contain either an **InjectionToken** or a **Type**. Once the Admin App identifies the **token.type** property, it dynamically instantiates the **Command** implementation and invokes it with the data provided by the properties property.

* The second method returns the categories of commands, described above.

#### Custom field

When in content editing mode, content editors can modify content properties and add content relations via dedicated fields in the UI. For example, **ShortText**, **LongText**, **Number**, **Classifications**, **RelatedData**, and so on. 
With the Admin App, you can replace one of the default fields when creating and editing items with a custom one. In addition, you can implement a custom visualization for each custom field you create. You do this by providing a custom implementation of the **FieldsProvider** interface. For each field rendered in the UI, the **overrideField** method is called. You can also provide a custom field registration for all of the fields or for a specific one.
You also need to provide an implementation of the field for both read and write actions because there may be a case when due to lack of proper permissions or because the item is locked, it cannot be edited.

**NOTE:** Since these components are dynamically instantiated, you need to register them with the entryComponents property of the NgModule.

**NOTE:** In case there are two custom **FieldProvider** interfaces that attempt to override the same field, the provider that is first invoked has a priority.

#### Custom grid

You can add custom columns in the grid, for example related data or data from external systems. To do this, you use a specific extensibility point. You develop a custom implementation of the **ColumnsProvider** interface and its method **getColumns()**, which returns an **Observable** of the **ColumnModel** object.

**NOTE:** You place the custom column in the **grid-extender** folder.
The **ColumnModel** object has three properties:

* **name**
The unique name that identifies this column.

* **title**
The display name of the column.

* **componentData**
A reference to the component that is displayed in the grid cell.

Once the component is instantiated, the Admin App assigns the context property to it. This property displays in the grid the information for the current item, as well as the model properties you defined.

#### Custom content editor

When content editors edit their content in HTML mode, they can benefit from the Admin App Kendo UI editor that provides them with relevant HTML-editing features. Out-of-the-box, content editors can work with image and link selector contextual toolsets for Sitefinity CMS content. You can also add a custom video selector for Sitefinity CMS content by injecting a custom **ToolBarItem**.
To do this, you provide a custom implementation of the **EditorConfigProvider**. The provider has a method **getToolBarItems** that is invoked before the Kendo UI editor is instantiated. You need to provide a custom set of commands that you want to be displayed in the editor. In this case, this is the video selector.

In this example, you use the built-in SelectorService class, which has two methods:

* **openVideoLibrarySelector**
Opens the video selector.

* **openDialog**
Opens the custom dialogs.

Not only can you add commands to the Kendo UI editor but also you can remove such. The **EditorConfigProvider** interface defines a method **getToolBarItemsNamesToRemove**. The method should return an array with the names of the toolbar items that you want to remove. In case you don't want to remove any toolbar items the method should return an empty array.

**NOTE:** Only default Kendo UI toolbar items can be removed. Toolbar items added by custom implementations of the **EditorConfigProvider** interface cannot be removed.

What is more you have the power to edit the configurations which are used to instantiate the Kendo UI editor. The **EditorConfigProvider** interface defines a method **configureEditor** that is invoked before the Kendo UI editor is instantiated. The method accepts the current editor configuration object and should return the modified configurations.

#### Custom content editor toolbar with word count

Apart from the major formatting functions, located on the formatting bar in the HTML content editor, you can add a word counter functionality. You do this by providing a custom implementation of the **EditorConfigProvider**, which you place in the **toolbar-extender** folder.

#### Custom dialogs in the grid and in editing mode

When in edit mode or when browsing items in the grid, you can implement custom dialogs to be displayed to the user. You do this via the **SelectorService** and the **OpenDialog** method. The method accepts the **DialogData** argument, which has the following properties:

* **componentData** object
Holds the type of component to be instantiated and what properties are assigned to the component once it is instantiated.

* **commands** property
Contains commands that serve as buttons in the dialog that is displayed.

#### Access data from OData services

You can HTTP calls to Sitefinity CMS OData services via the Angular **HttpClient**. When you make the request, you use the HTTP_PREFIX constant, so that the Admin App automatically detects this is a request to Sitefinity CMS and completes the request accordingly.




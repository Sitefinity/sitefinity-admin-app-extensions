# Sitefinity CMS Admin App extensions development kit with samples

![Build status](https://prgs-sitefinity.visualstudio.com/sitefinity/_apis/build/status/Iris/DeprecatedAndExperimental/AdminApp.Extensions.CI?branchName=master "Build Status")

## Overview

Leveraging the API-first approach of the Admin App, you can extend and add functionality, for example, in the *Actions* menu, in the grid, or in editing mode for content items. This repository contains everything you need to develop your extensions. The included examples demonstrate the main extensibility points of the API.

You can extend the Admin App API independently of the Sitefinity CMS in any IDE that you work with, for example, Visual Studio, WebStorm, Notepad++, and so on. Thus, you can develop and test your extended functionality against multiple Sitefinity CMS environments, local or external. Once finished, you can plug in your new functionality by producing a bundle and deploying it to your project.

**NOTE:** The samples in this repository are supported from Sitefinity version 11.0.6700.0 and above.

## Backward compatibility

Before you start developing make sure to checkout the tag corresponding to your Sitefinity host version (see [quick start section](#quick-start)). This way you can be sure that the extension will work once you copy the package to your Sitefinity host. Extensions packages are future proof, they will work with future versions of Sitefinity, so you can upgrade your Sitefinity instance without worrying that you will break your extensions.

## Prerequisites

Install the Node.js and npm. For more information, see [Installing node](https://docs.npmjs.com/getting-started/installing-node).

## Quick start

1. Clone the repository:

    ```shell
    git clone     https://github.com/Sitefinity/sitefinity-admin-app-extensions.git
    ```

1. Checkout the tag that is equal to your Sitefinity version:

    ```shell
    git checkout {Sitefinity version}
    ```

    For example:

    ```shell
    git checkout 11.0.6700.0
    ```

    Note: If you are not sure what is the version of your Sitefinity instance go to _Administration => Version & Licensing_. There you will find it as _Product file version_

1. Clone or download this repository to a location of your choice and execute the following command in the repository **root** folder:

    ```shell
    npm install
    ```

1. Start the development server by executing the following command:

    ```shell
    npm start
    ```

1. When you are done developing execute the following command:

    ```shell
    npm run build
    ```

    As a result, a JavaScript file (**sample.extensions.bundle.js**) is generated in the **dist** folder.

1. Register your extensions with the Admin App by uploading the file **sample.extensions.bundle.js** in the **adminapp** subfolder of the Sitefinity CMS web application and then restart your Sitefinity CMS instance. You can rename the file to **{your_extension_name}.extensions.bundle.js** if you wish.

## Configure Sitefinity CMS for development of custom extensions

To enable Sitefinity CMS to recognize and allow working with the Admin App, you need to configure the following:

### STS configuration

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *Authentication* -> *SecurityTokenService* -> *IdentityServer* -> *Clients* -> *sitefinity*.

1. Under *Allowed cors origins*, click *Create new*. Enter the URL of the development server of the Admin App Extensibility SDK. The default value is **http://localhost:3000**.

1. Under **RedirectUris**, click the *Create new* button. Enter **http://localhost:3000/assets/auth/silent-renew.html**

1. Under **RedirectUris**, click the *Create new* button. Enter **http://localhost:3000/auth/oidc/sign-in**

1. Under **PostLogoutRedirectUris**, enter **http://localhost:3000/auth/oidc/sign-out**

**NOTE:** After modifying the authentication settings, you need to **restart the application**. If you are in load balanced environment make sure to apply this steps to all necessary nodes.

### Web service configuration

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *WebServices* -> *Routes* -> *Sitefinity* -> *services* -> *system* -> *Access Control Allow Origin (CORS)*
1. Enter the URL of the development server of the Admin App Extensibility SDK. The default value is **http://localhost:3000**.
1. Save your changes.

  The Admin App is now served on [http://localhost:3000](http://localhost:3000). When you first open the URL, you are prompted to configure the Sitefinity CMS instance you are working with. In the URL field, enter the instance details and then save the configuration. You can later change the configuration by navigating to [config](http://localhost:3000/config).
  Once you setup the Sitefinity CMS instance, the server becomes in watch mode and automatically re-compiles and serves any newly created files.

## Development and extensibility

With the Admin App Extensibility API, you can customize the Sitefinity CMS backend look and feel without a complex set of tooling, such as Visual Studio, IIS, or .NET framework. The Admin App and the Extensibility API are based on Angular and Typescript and the extensibility development is simple and intuitive, leveraging the Angular's dependency injection (DI) mechanism and the architecture for writing NgModules. Thus, working with the Extensibility API resembles the straightforward code workflow of writing an Angular application.

### NgModules

You use the **__extensions_index.ts** file as an entry point for extending the Admin App. You implement a single class with the **getNgModules()** method, which returns all the NgModules of the extension you implement.
Once the method is invoked by the Admin App, all relevant modules are loaded. You can thus not only plug in to existing code but also write their own application-specific UI code. For example, you can register a route named **/custom** and then either navigate to it directly, or from a custom command in the *Actions* menu.

### Dependency injection mechanism

The extensibility API leverages Angular DI mechanism via **InjectionTokens** and **ClassProviders**. Thus, you can start coding seamlessly straight away. The **multi** property of the class provider interface allows for multiple references to the same token. The Extensibility API endpoints use the multi property of the **ClassProviders**, so that multiple instances of the providers can coexist within the same bundle.

## Debugging

To start debugging, execute the following command:
**npm start**

The command will start the webpack development server and will host the Admin App alongside the compiled extensions under [http://localhost:3000](http://localhost:3000). If you wish to debug the application simply open the developer tools on your browser and search for your code as with any regular Angular app.

**NOTE:** In case there are any runtime errors resulting from the output bundle, they are displayed in the console once the Admin App has loaded. If the errors are critical, the extensions are not loaded and the Admin App will attempt to continue functioning normally.

## Deployment

Once you are done with the backend customizations and development:

1. Copy the output bundle from the **dist** folder.

    **NOTE:** You can change the name of the **sample.extensions.bundle.js** file to any other name, for example, **<name_of_sample>.extensions.bundle.js**

1. Paste the bundle in the **/adminapp** folder in the Sitefinity CMS project directory.
1. Restart the Sitefinity CMS application, so that all files are processed.

**RESULT:** Next time you open Sitefinity CMS your customizations are visible in the backend.

## Minification

To build a minified version of extensions, run the command npm run build:prod.

**NOTE:** Minification is supported by versions of Sitefinity >= 11.1

## Multiple bundles support

After you execute the **npm run build** command, you get as an output the **sample.extensions.bundle** file. This file is a single bundle that contains a specific piece of functionality. With the Admin App, however, you can support more than one extensions bundle. This is handy when you need to compile two different types of functionalities and distribute them separately.
For example, the folder structure in Admin App folder may look like the following:

* **sample.extensions.bundle.js**
* **my-custom-code.extensions.bundle.js**
* **edtitor-power-tools.extensions.bundle.js**

**IMPORTANT:** You must follow the naming convention: **{{bundle prefix}}.extensions.bundle.js**
**NOTE:** the source map files **{{bundle prefix}}.extensions.bundle.js.map** are used only when developing the bundle, deploying to the Sitefinity site will have no effect.

## Extensibility endpoints

The Admin App provides you with several extensibility points for plugging your functionality in the interface.
 
You can find more details about the API we provide in the [API documentation](http://admin-app-extensions-docs.sitefinity.site/index.html).

Take a look at the following overview of the Admin App extension samples we provide, as well as short descriptions and, where relevant, links to more detailed explanations about how to use each sample. You can also check out the high level Admin App extensibility overview in the [Sitefinity CMS documentation](https://www.progress.com/documentation/sitefinity-cms/technical-overview-and-extensibility).

* [Custom *Actions* menu](./commands-extender/README.md) - You can register a custom command in the Actions menu of an item.

* [Custom field](./custom-fields/README.md) - When in content editing mode, editors can modify content properties and add content relations via dedicated fields in the UI. You can replace one of the default fields with a custom one and also implement a custom visualization for the field you create.

* [Custom grid](./grid-extender/README.md) - You can add custom columns in the grid that show more information about the specific data item, for example related data or media, or any other kind of information, like data from external systems.

* [Custom content editor](./editor-extender/README.md) - When content editors edit their content in HTML mode, they can benefit from the Admin App Kendo UI editor that provides them with relevant HTML-editing features. On top of the out-of-the-box contextual toolsets, you can add a custom video selector for Sitefinity CMS content.

* Custom dialogs in the grid and in editing mode - When in edit mode or when browsing items in the grid, you can implement custom dialogs to be displayed to the user. You do this via the [**SelectorService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html) and the [**OpenDialog**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html#opendialog) method. The [**videos toolbar item extension**](./editor-extender/sitefinity-videos) provides an example how to implement custom dialogs by using the [**SelectorService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html).

### Admin App custom theme

You can customize the appearance of the Admin App by modifying specific components of the user interface. For example, you can customize buttons’ color, background, and text, as well as other supplementary text on the UI. For more details, see [Admin App custom theme](./theme/README.md#custom-theme-for-sitefinity-cms-admin-app).

### Access data from OData services

You can make HTTP calls to Sitefinity CMS OData services via the Angular **HttpClient**. When you make the request, you use the [**HTTP_PREFIX**](http://admin-app-extensions-docs.sitefinity.site/index.html#http_prefix) constant, so that the Admin App automatically detects this is a request to Sitefinity CMS and completes the request accordingly.

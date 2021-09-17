# Sitefinity CMS Admin App extensions development kit with samples

#### Table of content
* [Overview](#overview)
* [Backward compatibility](#backward-compatibility)
* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Configure Sitefinity CMS for development of custom extensions](#configure-sitefinity-cms-for-development-of-custom-extensions)
   * [STS configuration](#sts-configuration)
   * [Web service configuration](#web-service-configuration)
* [Development and extensibility](#development-and-extensibility)
   * [NgModules](#ngmodules)
   * [Dependency injection mechanism](#dependency-injection-mechanism)
* [Debugging](#debugging)
* [Deployment](#deployment)
* [Minification](#minification)
* [Multiple bundles support](#multiple-bundles-support)
* [Access the OData services](#access-the-odata-services)
* [Extensibility endpoints](#extensibility-endpoints)

## Overview

Leveraging the API-first approach of the Admin App, you can extend and add functionality, for example, in the *Actions* menu, in the grid, or in editing mode for content items. This repository contains everything you need to develop your extensions. The included examples demonstrate the main extensibility points of the API.

You can extend the Admin App API independently of the Sitefinity CMS in any IDE that you work with, for example, Visual Studio, WebStorm, Notepad++, and so on. Thus, you can develop and test your extended functionality against multiple Sitefinity CMS environments, local or external. Once finished, you can plug in your new functionality by producing a bundle and deploying it to your project.

**NOTE:** The samples in this repository are supported from Sitefinity version 11.0.6700.0 and above.

## Backward compatibility
Extensions packages are future proof, they will work with future versions of Sitefinity, so you can upgrade your Sitefinity instance without worrying that you will break your extensions.

With the release of 13.3 due to the name change of one of our dependencies ( from "sitefinity-adminapp-sdk" - > to "@progress/sitefinity-adminapp-sdk). You will need to update the repo with our latest official version tag #13.3.7600.0 and rebuild your extension.

Before you start developing make sure to checkout the tag corresponding to your Sitefinity host version (see [quick start section](#quick-start)). This way you can be sure that the extension will work once you copy the package to your Sitefinity host. Extensions packages are future proof, they will work with future versions of Sitefinity, so you can upgrade your Sitefinity instance without worrying that you will break your extensions.

## Prerequisites

Install the Node.js and npm. For more information, see [Installing node](https://docs.npmjs.com/getting-started/installing-node). Recomended node versions [10x - 12x].

## Quick start

1. Clone the repository:

    ```shell
    git clone https://github.com/Sitefinity/sitefinity-admin-app-extensions.git
    ```

1. Checkout the tag that is equal to your Sitefinity version:

    ```shell
    git checkout {Sitefinity version}
    ```

    For example:

    ```shell
    git checkout 13.3.7600.0
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

1. Register your extensions with the Admin App by uploading the file **sample.extensions.bundle.js** in the **adminapp** subfolder of the Sitefinity CMS web application and then restart your Sitefinity CMS instance. You can rename the file to anything as long as you keep to the pattern **{{ bundle-name }}.extensions.bundle.js**.

## Configure Sitefinity CMS for development of custom extensions

To enable Sitefinity CMS to recognize and allow working with the Admin App, you need to configure the following:

### STS configuration

#### When using Default authentication protocol

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *Security*.

1. Under *AccessControlAllowOrigin*, enter the URL of the development server of the Admin App Extensibility SDK or **\***. Default value is **http://localhost:3000**.

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *Authentication* -> *OAuthServer* -> *AuthorizedClients*.

1. Click *Create new*. For **ClientId** enter *sitefinity*, leave **Secret** blank.

1. Under **RedirectUrls**, click the *Create new* button. Enter **http://localhost:3000/auth/oauth/sign-in**

#### When using OpenId authentication protocol

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *Authentication* -> *SecurityTokenService* -> *IdentityServer* -> *Clients* -> *sitefinity*.

1. Under *Allowed cors origins*, click *Create new*. Enter the URL of the development server of the Admin App Extensibility SDK. The default value is `http://localhost:3000`

1. Under **RedirectUris**, click the *Create new* button. Enter `http://localhost:3000/assets/auth/silent-renew.html`

1. Under **RedirectUris**, click the *Create new* button. Enter `http://localhost:3000/auth/oidc/sign-in`

1. Under **PostLogoutRedirectUris**, enter `http://localhost:3000/auth/oidc/sign-out`

**NOTE:** After modifying the authentication settings, you need to **restart Sitefinity**. If you are in load balanced environment make sure to apply this steps to all necessary nodes.

### Web service configuration

1. Navigate to *Administration* -> *Settings* -> *Advanced* -> *WebServices* -> *Routes* -> *Sitefinity* -> *services* -> *system* -> *Access Control Allow Origin (CORS)*
1. Enter the URL of the development server of the Admin App Extensibility SDK. The default value is `http://localhost:3000`
1. Save your changes.

  The Admin App is now served on [http://localhost:3000](http://localhost:3000). When you first open the URL, you are prompted to configure the Sitefinity CMS instance you are working with. In the URL field, enter the instance details and then save the configuration. You can later change the configuration by navigating to [config](http://localhost:3000/adminapp/config).
  Once you setup the Sitefinity CMS instance, the server becomes in watch mode and automatically re-compiles and serves any newly created files.

## Development and extensibility

With the Admin App Extensibility API, you can customize the Sitefinity CMS backend look and feel without a complex set of tooling, such as Visual Studio, IIS, or .NET framework. The Admin App and the Extensibility API are based on Angular and Typescript and the extensibility development is simple and intuitive, leveraging [Angular's dependency injection (DI) mechanism](https://angular.io/guide/dependency-injection) and the architecture for writing [NgModules](https://angular.io/guide/ngmodules). Working with the Extensibility API resembles the straightforward code workflow of writing an Angular application.

### NgModules

You use the [**__extensions_index.ts**](/src/__extensions_index.ts) file as an entry point for extending the Admin App. In that file you add the ngModules for the extensions that you have built, for example:

```typescript
import { GridExtenderModule } from "./grid-extender";
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

declare var sitefinityExtensionsStore: SitefinityExtensionStore;

sitefinityExtensionsStore.addExtensionModule(GridExtenderModule);
```

You can not only plug in to existing code but also write your own application-specific UI code. For example, you can register a route named **/print-preview** and then either navigate to it directly, or from a custom command in the *Actions* menu. We are referring to our print-preview sample, which shows how to register a command in the command menus, create a custom [Angular component](https://angular.io/api/core/Component), and register a custom route on which the component will be loaded, in this case when the command is triggered. You can find the sample [here](/src/commands-extender).

### Dependency injection mechanism

The extensibility API leverages Angular DI mechanism via [**InjectionTokens**](https://angular.io/api/core/InjectionToken) and [**ClassProviders**](https://angular.io/api/core/ClassProvider). The **multi** property of the class provider interface allows for multiple references to the same token. The Extensibility API endpoints use the multi property of the [**ClassProviders**](https://angular.io/api/core/ClassProvider), so that multiple instances of the providers can coexist within the same bundle.

## Debugging

To start debugging, execute the following command:
**npm start**

The command will start the webpack development server and will host the Admin App alongside the compiled extensions under [http://localhost:3000](http://localhost:3000). If you wish to debug the application simply open the developer tools on your browser and search for your code as with any regular Angular app. If you would like some tips on how to do so please see [this post](https://www.telerik.com/blogs/tips-for-debugging-your-angular-applications) from our blog.

**NOTE:** In case there are any runtime errors resulting from the output bundle, they are displayed in the console once the Admin App has loaded. If the errors are critical, the extensions are not loaded and the Admin App will attempt to continue functioning normally.

## Deployment

Once you are done with the backend customizations and development:

1. Copy the output bundle from the **dist** folder.

    **NOTE:** You can change the name of the **sample.extensions.bundle.js** file to any other name, for example, **{{ bundle-name }}.extensions.bundle.js**

1. Paste the bundle in the **/adminapp** folder in the Sitefinity CMS project directory.
1. Restart the Sitefinity CMS application, so that all files are processed.

**RESULT:** Next time you open Sitefinity CMS your customizations are visible in the backend.

## Minification

To build a minified version of extensions, run the command npm run build:prod.

**NOTE:** Minification is supported by versions of Sitefinity >= 11.1

## Multiple bundles support

After you execute the `npm run build` command, you get as an output the **sample.extensions.bundle** file. This file is a single bundle that contains a specific piece of functionality. With the Admin App, however, you can support more than one extensions bundle. This is handy when you need to compile two different types of functionalities and distribute them separately.
For example, the folder structure in Admin App folder may look like the following:

* **sample.extensions.bundle.js**
* **my-custom-code.extensions.bundle.js**
* **edtitor-power-tools.extensions.bundle.js**

**IMPORTANT:** You must follow the naming convention: **{{ bundle-name }}.extensions.bundle.js**
**NOTE:** the source map files **{{ bundle-name }}.extensions.bundle.js.map** are used only when developing the bundle, deploying to the Sitefinity site will have no effect.

## Access the OData services

You can make HTTP calls to the Sitefinity CMS OData services via the Angular [**HttpClient**](https://angular.io/api/common/http/HttpClient). When making the request, use the [**HTTP_PREFIX**](http://admin-app-extensions-docs.sitefinity.site/index.html#http_prefix) constant, so that the Admin App can automatically detect this is a request to Sitefinity CMS and add the required authentication data to it.

Lets say you would like to get all the news items from Sitefinity, the URL that the Admin App would request is `http://my.sitefinity.site/sf/system/newsitems`, and since this request is to the backend-only services it must contain some service information in order to authenticate - this is all handled behind the scenes with the help of the [**HTTP_PREFIX**](http://admin-app-extensions-docs.sitefinity.site/index.html#http_prefix).

Example:

```typescript
const url = `${HTTP_PREFIX}/sf/system/newsitems`;
this.http.get(url).subscribe(response => { /* do work */ });
```

**NOTE**: More information on the OData web services is available in [Sitefinity's documentation](https://www.progress.com/documentation/sitefinity-cms/for-developers-client-side-programming-and-web-services). Please bear in mind that the documentation focuses more on the frontend use cases of the services, this being said the differences between the frontend and backend services is the type of access they require and the URL segments. The backend OData services require an authenticated Sitefinity backend user to access them and are located on the URL `{{ domain }}/sf/system/`, whereas the frontend services are located `{{ domain }}/api/{{ service-name }}`. While it is technically possible to use the frontend services in the backend, we strongly advice against this.

## Extensibility endpoints

> IMPORTANT - Please note that there is a known limitation, you cannot use the Angular binding syntax {{item.data.CreatedBy}}, when creating component HTML templates, you must use another binding, for example [textContent]="item.data.CreatedBy", or [innerHtml]="item.data.Content".

The Admin App provides you with several extensibility points for plugging your functionality in the interface.
You can find more details about the API we provide in the [API documentation](http://admin-app-extensions-docs.sitefinity.site/index.html).

Take a look at the following overview of the Admin App extension samples we provide, as well as short descriptions and, where relevant, links to more detailed explanations about how to use each sample. You can also check out the high level Admin App extensibility overview in the [Sitefinity CMS documentation](https://www.progress.com/documentation/sitefinity-cms/technical-overview-and-extensibility).

* [Add custom commands](./src/commands-extender#add-custom-commands) - You can register a custom command in the grid, Bulk menu, Actions menu of an item, etc. and trigger some custom logic upon command execution.

* [Remove default commands](./src/commands-extender#remove-default-commands) - You can remove one or more of the default commands.

* [Custom field](./src/custom-fields#custom-field) - When in content editing mode, editors can modify content properties and add content relations via dedicated fields in the UI. You can replace one of the default fields with a custom one and also implement a custom visualization for the field you create.

* [Fields binding](./src/fields-change#fields-change-service) - Sometimes when updating a field you may need to change another field's value, settings, visibility, etc. You can create a binding between two or more fields and achieve the described behavior by creating a simple service that will handle those changes.

* [Custom grid](./src/grid-extender#custom-grid) - You can add custom columns in the grid that show more information about the specific data item, for example related data or media, or any other kind of information, like data from external systems. You can also remove some of the existing columns.

* [Custom content editor](./src/editor-extender#custom-content-editor) - When content editors edit their content in HTML mode, they can benefit from the Admin App Kendo UI editor that provides them with relevant HTML-editing features. On top of the out-of-the-box contextual toolsets, you can add a custom video selector for Sitefinity CMS content.

* [Custom dialogs](./src/editor-extender/sitefinity-videos) in the grid and in editing mode - When in edit mode or when browsing items in the grid, you can implement custom dialogs to be displayed to the user. You do this via the [**SelectorService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html) and the [**OpenDialog**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html#opendialog) method. The [**videos toolbar item extension**](./src/editor-extender/sitefinity-videos) provides an example how to implement custom dialogs by using the [**SelectorService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/selectorservice.html).

* [Custom notifications](./src/commands-extender/notification.command.ts) - Often when the user executes an action he has to be notified somehow about the result of his action. In such cases you have the ability to publish custom notifications in the application. This can be achieved by using the [**NotificationService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/notificationservice.html) and its [**publishBasicNotification**](http://admin-app-extensions-docs.sitefinity.site/interfaces/notificationservice.html#publishbasicnotification) method. The method accepts an object of type [**NotificationInfo**](http://admin-app-extensions-docs.sitefinity.site/interfaces/notificationinfo.html) that contains some configuration options about the notification's message, look, visibility duration, placement, etc. The [**notificaton command extension**](./src/commands-extender/notification.command.ts) provides an example how to create your own custom notifictions by using the [**NotificationService**](http://admin-app-extensions-docs.sitefinity.site/interfaces/notificationservice.html).

* [Custom Widget Editor](./src/widget-editor#admin-app-custom-widget-editor) - With this AdminApp extensibility point, you can create your own custom widget designers and override the default auto generated designers.

* [Admin App custom theme](./src/theme#custom-theme-for-sitefinity-cms-admin-app) - You can customize the appearance of the Admin App by modifying specific components of the user interface. For example, you can customize buttons’ color, background, and text, as well as other supplementary text on the UI.

* [Custom list components](./src/tree#custom-list-components) - This extension is used to replace a part of each item shown in the tree used throughout the AdminApp. Currently supported only for the related data functionality.

### Modifications done in the config.json
* [Change owner command](./src/change-owner#allowing-change-owner-command-in-adminapp) - By default the change owner command is available only for pages. You can also make it available for other content types.

* [Sections menu](./src/sections-menu#extending-sections-menu-functionality-in-adminapp) - By default the sections menu in the item edit screen is visible only when there are 5 or more field sections. You can control this behavior by changing the number of sections needed for the menu to be visible.

* [Search](./src/search#extending-search-functionality-in-adminapp) - By default when search is executed the AdminApp searches only by a content type's default field. This may not be enough, therefore you have the ability to define the fields to be used when search is performed per content type.

* [Change the date and time format of the date time fields](./src/change-date-format#configuring-the-date-and-time-format-of-the-date-time-fields) - A configuration that allows you to change the format of the date and time fields.

* [Reordering the children of a hierarchical type](./src/reorder-children-list#reordering-the-children-of-a-hierarchical-type) - This configuration allows the reordering of the child types in the contains column of hierarchical types with two or more children.

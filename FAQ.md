
# FAQ 
 
 
#### Why should I choose the new Admin App? 

> The new Admin App provides you with reinvented content editing experience, feature enhancements, better navigation, and improved performance. 

#### What is the difference between the current UI and the new Admin App? 

> The new Admin App elements blend in current UI and will gradually replace existing functionality. With Sitefinity CMS 10.2, the focus is on more intuitive content editing and new look and feel. The new Admin App supports *News*, *Blogs*, and *Dynamic modules* content types.

#### What do I benefit from the new Admin App? 
> The Admin App reinvents the way you:
* Browse and edit content
* Embed media
c* Insert or relate images from libraries
* Implement your workflow
* Schedule publishing
Sitefinity CMS ODATA web services are also updated, so that you can manage content easier and help you manage your integrations and automations.

**NOTE:** Keep in mind that the new Admin App is in BETA, so it currently only works with the default system language. 

#### How do I turn on the new Admin App? 
> In Sitefinity CMS 10.2, you simply navigate to *Administration* and choose *Switch to the new interface*.
Once you switch to the new interface, it will be available for all Sitefinity CMS users. You can always switch back to the classic interface.
#### How does The Admin App work? 
> The Admin App is a Single Page Application (SPA) that works with Angular 4.0, TypeScript, and OData web services to manage content. As a result, the Admin App enables you to implement a better security model, benefit from better performance, and leverage fluid and responsive user interface. 


#### What do I need to install the Admin App? 
> The Admin App is bundled in Sitefinity CMS, so you just need to upgrade or create a new project. If you want to extend the Admin App, you can leverage the SDK that uses the NPM package manager. For details, see the next question.

#### How do I install the SDK? 
> To develop extensions of the Admin App, you need the NPM package manager version 4 or newer, part of the *Node.js* installation. For more information, see [Installing node](https://docs.npmjs.com/getting-started/installing-node). 
We recommend to update the *Node.js* to latest version using this command line: 
**npm install npm@latest -g**

#### How do I host the Admin App standalone? 
> With the BETA release, upon request, you can leverage the standalone mode of the Admin App. Contact your Sitefinity CMS account manager. 

#### Can I host the Admin App on IIS? 
> In genearl, the Admin App is seamplesly integrated in and hosted on your Sitefinity CMS instance. To work with the Admin App in standalone mode, you can host it on any static web server, even on CDN, for example, S3, or Github Pages.
In case you want to develop extensions of the Admin App, Sitefinity CMS provides you with a light development server that faceplates rapid development with hot module replacement.

#### Should I host the Admin App on IIS during development? 
> You normally do so as part of your Sitefinity CMS development. If you are working in standalone mode, you can choose whatever you server usually work with, including IIS.

#### What functionality can I extend and how?
> You can leverage the Admin App SDK for extension development, along with few samples that demonstrate the main extension points in the UI, such as the *Actions* menu, the grid, and the content editing experience.
 
 **NOTE:** You are welcome to provide feedback about the samples, as well as for your extensibility needs. 

#### What IDE should I use - VS, VS Code, or Notepad? 
> For extension development, you can use any editor that you are comfortable working with. For example, VS Code has excellent TypeScript support and clean UI.

#### Do I need to rebuild the Admin App after every modification I make? What about if it the Admin App is hosted on IIS? 
> For extension development, during the development process, the code is compiled on the live environment and refreshed as quicker and more agile mode of development. Once finished, you can plug in your new functionality by producing a bundle and deploying it to your project.

#### How do I develop an extension?
> You can work with the Admin App SDK samples as starting point to explore extension points.

#### How do I write tests for my extensions? 
> You can leverage any JavaScript or TypeScript testing framework. 

#### I made customizations to the classic interface, can I apply them in the new Admin App? 
> When working with the Admin App in integrated mode (switching on the new interface via the *Administration* panel), the modifications you made are present in the new Admin App. This includes:
* Menus
* New Screens
* Module builder modifications
* Definitions

However, in case you made changes in the editing actions, dialogs, and grids, you need to port them to new Admin App by developing new extensions. 

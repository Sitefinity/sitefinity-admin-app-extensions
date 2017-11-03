## Sitefinity Admin App sample extensions

This repository holds the code samples for extending the Sitefinity Admin App.

### Prereqiusities

Install the [node package manager(npm)](https://docs.npmjs.com/getting-started/installing-node)

---
### Getting started

Clone or download this repository to a location of your choice and execute the following commands in the repository root folder:
```
npm install
```
```
npm start
```
The app is now served on [localhost](http://localhost:3000). When you first navigate to the url you will be prompted to configure the Sitefinity instance you will be working with. Fill the url field and click save. This configuration is saved and can be changed later by navigating to http://localhost:3000/config. 

Once this setup is completed you are ready to go. The server is in watch mode and will recompile and serve your changes immediately.

When you are done developing execute 
```
npm run build
```
An extension bundle (extensions.bundle.js) will be produced in the dist folder. Upload this file to the root if the Sitefintiy web application. After that just refresh your Sitefinity page.

---
### Examples

Example extensions included in the project are:
* Custom action menu command - demonstates how to register a custom action menu command. You can find the example code in the operations-extender folder.
* Custom column in the grid - demonstates how to add your own column in the grid. The example is just adding a column with random images in the item list. The code is in the grid-extender folder.
* Replacing an OOB field with a custom one (during edit/create etc..) - we are providing fields for all data types, but if you have an advanced scenario you can hook up here. Files are located in the custom-fields folder

Screenshots from the examples?

### How it works
In order for the Admin App to know of the custom extensions, they need to be registered with it. This happens through [NgModules](https://angular.io/guide/ngmodule) and [Angular's DI](https://angular.io/guide/dependency-injection). We have provided specific tokens that can be used to register custom providers, which are then invoked by the Admin App.

The "\_\_extensions_index.ts" file is the starting point where all the NgModules are registered. These modules are registered with the AdminApp before the application boots.

### Api

The custom extensions can use the Angular APIs inside the Admin App as in any other Angular project.

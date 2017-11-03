## Sitefinity Administration reinvention extensions

This project is a starting point for anyone willing to extend the UI of the new Sitefinity Admin App. Extensions are a way of hooking up to Iris and its API to be able to plug in custom logic. The purpose of the project is to be a quick kick start containing some very simple examples.

---
### Examples

Example extensions included in the project are:
* Custom action menu command - this can be a call to external service, quick data/workflow/lifecycle manipulation, batch operation, etc. You can find the example code in the operations-extender folder.
* Custom column in the grid - more information at a glance is something you might need. The example is just adding a column with random images in the item list. The code is in the grid-extender folder.
* Replacing an OOB field with a custom one (during edit/create etc..) - we are providing fields for all data types, but if you have an advanced scenario you can hook up here. You might need information from external service to populate a field, this is the way to go. Files are located in the custom-fields folder

You are not limited to these, you can extend ..... (more info here). Screenshots from the examples?

---
### Getting started

The workflow is simple. Clone or download this repository to a location of your choice and execute the following commands in the xxxxx folder.
```
npm install
```
```
npm start
```
The app is now served on port 3000 (http://localhost:3000). When you first navigate to the url you will be prompted to configure the Sitefinity instance you will be working with. Fill the url field and click save. This configuration is saved and can be changed later by navigating to http://localhost:3000/config. Once this setup is completed you are ready to go. The server is in watch mode and will recompile and serve your changes immediately.

Once you are done developing you can execute 
```
npm build
```
An extension bundle will be produced. This is the only file you need. Just upload it to the root folder of your Sitefinity instance and you will have your extended UI.

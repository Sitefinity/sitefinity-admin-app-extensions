# Allowing change owner command in AdminApp

By default change owner command is available only for Pages. It can also be added for other content types by providing a simple configuration. In order to do so you need to create/edit the **config.json** file in the **AdminApp** folder.

You need to add a new property **changeOwnerAllowedTypes** of type string[] to the json object in the "config.json" file, on the root level.

```json
{
  "editorSettings": { /* omitted for brevity */ },
  "changeOwnerAllowedTypes": [],
}
```

The array should contain the type names of the content types that should have the change owner command available. For example if you want the command to be abailable for newsitems and events the config should look like this:

```json
{
  "changeOwnerAllowedTypes": ["newsitems", "events"]
}
```

> **Important notes**:
> * The command will always be available for Pages regardless of the value of the **changeOwnerAllowedTypes** property.
> * As of Sitefinity 13.3.7622.0 the `config.json` file is no longer shipped with the product.
> * The `config.json` file is located in `{{project_root}}/SitefinityWebApp/AdminApp`, if it is missing please create your own file so that you may apply the desired configurations.

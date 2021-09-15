# Extending search functionality in AdminApp

***Disclaimer: The search extensibility works for list view, related data fields and media selectors. Searching in parent selectors for Libraries and Pages cannot be currently modified.***

By deafault the search functionality only searches the items' titles. You can extend which other fields are to be used when searching, by editing your **config.json** file in the **AdminApp** folder.

The config file should have the following structure:

```json
{
  "editorSettings": {},
  "searchSettings": {}
}
```
Search settings are per content type. For example, if you want to configure search fields for news items, the config looks like this:

```json
{
  "searchSettings": {
    "newsitems": ["Content"]
  }
}
```

To target given content type, you have to use its entity set name as key and an array with the names of the fields that should be used when searching as value.
For example the code from the sample will configure the search so that the Content field would be used for finding news.
If you don't provide configuration, the default field will be used. 

> **Important notes**:
> * As of Sitefinity 13.3.7622.0 the `config.json` file is no longer shipped with the product.
> * The `config.json` file is located in `{{project_root}}/SitefinityWebApp/AdminApp`, if it is missing please create your own file so that you may apply the desired configurations.

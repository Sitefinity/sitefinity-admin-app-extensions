# Extending search functionality in AdminApp

***Disclaimer: The search extensibility works for list view, related data fields and media selectors. Searching in parent selectors for Libraries and Pages cannot be currently modified.***

By default the search functionality only searches the items' titles. You can extend which other fields are to be used when searching, by navigating to **Administration -> Settings -> Backend interface**.

In the **Search** section edit the **Search in fields...** field. It should have the following structure:

```json
{
    "newsitems": ["Content"]
}
```

To target given content type, you have to use its entity set name as key and an array with the names of the fields that should be used when searching as value.
For example the code from the sample will configure the search so that the Content field would be used for finding news.
If you don't provide configuration, the default field will be used.

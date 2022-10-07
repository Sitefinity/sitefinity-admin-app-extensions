# Reordering the children of a hierarchical type

This configuration concerns the "contains" column of a hierarchical module with two or more child types.

![Example](./../../assets/reorder-children-list.png "Example")

In this example there is parent type called "Countries" which has two child types - "Town" and "Territory", which by default are displayed in this order, and if you click on the parent item, in this example "Bulgaria", the first child type list screen will be opened - the "Towns" list.
 
To rearrange the child types, you need to navigate to **Administration -> Settings -> Backend interface** and in the **List view** section modify the **Child types order** field. You can use the following value:

```json
[
    {
        "parentEntitySet": "countries",
        "childEntitySets": ["territories", "towns"]
    }
]
```

After this configuration is applied the "contains" column will now list the types in the order of "territories" and "towns" and when the parent is click it will redirect to the territories list view.

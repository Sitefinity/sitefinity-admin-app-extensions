# Allowing change owner command in AdminApp

By default change owner command is available only for Pages. It can also be added for other content types by providing a simple configuration. In order to do so you need to navigate to **Administration -> Settings -> Backend interface**.

You need to place the new array value in the **Change owner for content types** field in the **Commands** section.

The array should contain the type names of the content types that should have the change owner command available. For example if you want the command to be abailable for newsitems and events the config should look like this:

```json
["newsitems", "events"]
```

> **Important notes**:
> * The command will always be available for Pages regardless of the value of the **Change owner for content types** property.

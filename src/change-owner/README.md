# Allowing change owner command in AdminApp

By default change owner command is available only for Pages. It can also be added for other content types by providing a simple configuration. In order to do so you need to create/edit the **config.json** file in the **AdminApp** folder.

You need to add a new property **changeOwnerAllowedTypes** of type string[] to the json object in the "config.json" file.
<pre>
{
  "changeOwnerAllowedTypes": [],
}
</pre>

The array should contain the type names of the content types that should have the change owner command available. For example if you want the command to be abailable for newsitems and events the config should look like this:

<pre>
{
  "changeOwnerAllowedTypes": ["newsitems", "events"]
}
</pre>

Note: The command will always be available for Pages regardless of the value of the **changeOwnerAllowedTypes** property.

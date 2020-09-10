# Extending sections menu functionality in AdminApp

By default sections menu is visible only when there are 5 or more field sections. This number can be changed by providing a simple configuration. In order to do so you need to edit the **config.json** file in the **AdminApp** folder.

You need to add a new property **editSettings** of type object to the json object in the "config.json" file.
<pre>
{
  "editSettings": {},
}
</pre>

Then you need to add another property **sectionsMenuMinColumnsNumber** of type number to the **editSettings** object. This property marks the minimum number of columns needed for the sections menu to be visible. For example, if you want the menu to be visible when there are 3 or more sections, the config should look like this:

<pre>
{
  "editSettings": {
    "sectionsMenuMinColumnsNumber": 3
  }
}
</pre>

If you don't provide this configuration, the default value(5) will be used.

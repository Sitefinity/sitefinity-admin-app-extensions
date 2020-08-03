# Extending search functionality in AdminApp

***Disclaimer: Currently the search extensibility works only for the list view!***
<pre>

</pre>

You can simply extend which fields to be used for search by editing your **config.json** file in **SitefinityWebApp\AdminApp**.

The config file has the following structure:
<pre>
{
	"editorSettings": {},
	"searchSettings": {}
}
</pre>

Search settings are per content type. For example, if you want to configure search fields for news items, the config looks like this:

<pre>
{
	"searchSettings": {
		"newsitems": ["Content"]
   }
}
</pre>

To target given content type, you have to use its entity set name as key and in an array to specify which fields to be used.
This will configure the search to use the Content field for finding results.
If you don't provide configuration, the default field will be used.

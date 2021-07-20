# Configuring the date and time format of the date time fields

By default the date and time formats used by the date and time fields, for example the start and end dates of the event content items, are in the format `h:mm a` for the time component and `M/dd/yyyy` for the date component. You can change these formats by adding the following to the `config.json` file located in the `{rootDirectory}\SitefinityWebApp\AdminApp\` folder: 

```json
{
    "dateTimeFormat": {
        "dateFormat": "dd-MMMM-yyyy",
        "timeFormat": "HH:mm"
    }    
}
```
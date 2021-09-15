# Configuring the date and time format of the date time fields

By default the date and time formats used by the date and time fields, for example the start and end dates of the event content items, are in the format `h:mm a` for the time component and `M/dd/yyyy` for the date component. You can change these formats by adding the following to the `config.json` file located in the `{rootDirectory}\SitefinityWebApp\AdminApp\` folder: 

```json
{
    "dateTimeFormat": {
        "useBrowserLocale": true,
        "browserLocaleFormatWidth": "long",
        "timeFormat": "HH:mm",
        "dateFormat": " d/MMM/yyyy"
    }
}
```

The configurations work as follows:
* if `useBrowserLocale` is `true`, then the `timeFormat` and `dateFormat` will be disregarded.
* the `browserLocaleFormatWidth` can be either `short`, `medium` or `long`, if this property is not provided and `useBrowserLocale` is `true`, it will default to `short`
* there are certain limitation that apply to the `timeFormat` and `dateFormat`. The date format accepts only a certain subset of date formats and the time format accepts only a certain subset of time formats. You may find the supported formats below:

Example behavior of `useBrowserLocale` if the browser's language is English (US).
* If the `browserLocaleFormatWidth` is set to `long` the formats used in the date and time field will be `"h:mm:ss a"` and `"MMMM d, y"`, which will look like `9:22:13 am` and `July 10, 2021`.
* If the `browserLocaleFormatWidth` is set to `medium` the formats used in the date and time field will be `"h:mm:ss a"` and `"MMM d, y"`, which will look like `9:22:13 am` and `Jul 10, 2021`.
* If the `browserLocaleFormatWidth` is set to `short` the formats used in the date and time field will be `"h:mm a"` and `"M/d/yy"`, which will look like `9:22 am` and `7/10/2021`.


Date formats:
```
"yyyy-MM-dd", // 2000-11-06, ISO 8601
"yyyy/MM/dd", // 2000/11/06
"yyyy.MM.dd", // 2000.11.06
"yyyy MM dd", // 2000 11 06
"yyyy/M/d", // 2000/11/06 (no leading zero for the day and month)
"yyyy-M-d", // 2000-11-06 (no leading zero for the day and month)
"yyyy/M.d", // 2000.11.06 (no leading zero for the day and month)
"yyyy M d", // 2000 11 06 (no leading zero for the day and month)
"dd/MM/yyyy", // 06/11/2000
"dd-MM-yyyy", // 06-11-2000
"dd.MM.yyyy", // 06.11.2000
"dd MM yyyy", // 06 11 2000
"d/M/yyyy", // 6/11/2000 (no leading zero for the day and month)
"d-M-yyyy", // 6-11-2000 (no leading zero for the day and month)
"d.M.yyyy", // 6.11.2000 (no leading zero for the day and month)
"d M yyyy", // 6 11 2000 (no leading zero for the day and month)
"M/d/yyyy", // 11/6/2000 (no leading zero for the day and month)
"M-d-yyyy", // 11-6-2000 (no leading zero for the day and month)
"M.d.yyyy", // 11.6.2000 (no leading zero for the day and month)
"M d yyyy", // 11 6 2000 (no leading zero for the day and month)
"MM/dd/yyyy", // 11/06/2000
"MM-dd-yyyy", // 11-06-2000
"MM.dd.yyyy", // 11.06.2000
"MM dd yyyy", // 11 06 2000
"yy-MM-dd", // 00-11-06, ISO 8601
"yy/MM/dd", // 00/11/06
"yy.MM.dd", // 00.11.06
"yy MM dd", // 00 11 06
"yy/M/d", // 00/11/06 (no leading zero for the day and month)
"yy-M-d", // 00-11-06 (no leading zero for the day and month)
"yy/M.d", // 00.11.06 (no leading zero for the day and month)
"yy M d", // 00 11 06 (no leading zero for the day and month)
"dd/MM/yy", // 06/11/00
"dd-MM-yy", // 06-11-00
"dd.MM.yy", // 06.11.00
"dd MM yy", // 06 11 00
"d/M/yy", // 6/11/00 (no leading zero for the day and month)
"d-M-yy", // 6-11-00 (no leading zero for the day and month)
"d.M.yy", // 6.11.00 (no leading zero for the day and month)
"d M yy", // 6 11 00 (no leading zero for the day and month)
"M/d/yy", // 11/6/00 (no leading zero for the day and month)
"M-d-yy", // 11-6-00 (no leading zero for the day and month)
"M.d.yy", // 11.6.00 (no leading zero for the day and month)
"M d yy", // 11 6 00 (no leading zero for the day and month)
"MM/dd/yy", // 11/06/00
"MM-dd-yy", // 11-06-00
"MM.dd.yy", // 11.06.00
"MM dd yy", // 11 06 00
"d MMM yyyy", // 6 Nov 2000 (no leading zero for the day)
"d-MMM-yyyy", // 6-Nov-2000 (no leading zero for the day)
"MMM d yyyy", // Nov 6 2000 (no leading zero for the day)
"MMM-d-yyyy" // Nov-6-2000 (no leading zero for the day)
```

Time formats: 

```
"H:mm", // 21:15 (no leading zero for the hour)
"HH:mm", // 21:15
"H:mm:ss", // 21:15:00 (no leading zero for the hour)
"HH:mm:ss", // 21:15:00
"h:mm a", // 9:15 PM (no leading zero for the hour)
"hh:mm a", // 09:15 PM
"h:mm:ss a", // 9:15:00 PM (no leading zero for the hour)
"hh:mm:ss a" // 09:15:00 PM
```

> **Important notes**:
> * As of Sitefinity 13.3.7622.0 the `config.json` file is no longer shipped with the product.
> * The `config.json` file is located in `{{project_root}}/SitefinityWebApp/AdminApp`, if it is missing please create your own file so that you may apply the desired configurations.

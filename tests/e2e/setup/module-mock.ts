import { DATE_FORMAT } from "../helpers/constants";

const moment = require("moment");

export function generateModuleMock() {
    return {
        "ContentTypeName": "DynamicModule_" + moment().format(DATE_FORMAT),
        "ContentTypeDescription": "",
        "ContentTypeItemTitle": "DynamicModule_" + moment().format(DATE_FORMAT),
        "ContentTypeItemName": "DynamicModule_" + moment().format(DATE_FORMAT),
        "ContentTypeTitle": "DynamicModule_" + moment().format(DATE_FORMAT),
        "Fields": [{
            "AllowImageLibrary": false,
            "AllowMultipleFiles": false,
            "AllowMultipleImages": false,
            "AllowMultipleVideos": false,
            "AllowNulls": false,
            "CanCreateItemsWhileSelecting": true,
            "CanSelectMultipleItems": true,
            "CheckedByDefault": false,
            "ChoiceRenderType": "RadioButton",
            "Choices": "",
            "ClassificationId": "d7831091-e7b1-41b8-9e75-dff32d6a7837",
            "ColumnName": "",
            "DBLength": "",
            "DBType": "VARCHAR",
            "DecimalPlacesCount": 0,
            "DefaultValue": "",
            "FileExtensions": "",
            "FileMaxSize": 0,
            "ImageExtensions": "",
            "ImageMaxSize": 0,
            "IncludeInIndexes": false,
            "InstructionalChoice": "- Select -",
            "InstructionalText": "",
            "IsHiddenField": false,
            "IsRequired": true,
            "IsRequiredToSelectCheckbox": false,
            "IsRequiredToSelectDdlValue": false,
            "LengthValidationMessage": "",
            "MaxLength": 0,
            "MediaType": "",
            "MinLength": 0,
            "Name": "Title",
            "NumberUnit": "",
            "RegularExpression": null,
            "Title": "Title",
            "TypeName": "ShortText",
            "TypeUIName": "Short text",
            "VideoExtensions": "",
            "VideoMaxSize": 0,
            "WidgetTypeName": "Telerik.Sitefinity.Web.UI.Fields.TextField",
            "IsLocalizable": true
        },
        {
            "AllowImageLibrary": false,
            "AllowMultipleFiles": false,
            "AllowMultipleImages": false,
            "AllowMultipleVideos": false,
            "AllowNulls": false,
            "CanCreateItemsWhileSelecting": true,
            "CanSelectMultipleItems": true,
            "CheckedByDefault": false,
            "ChoiceRenderType": "",
            "Choices": "",
            "ClassificationId": "cb0f3a19-a211-48a7-88ec-77495c0f5374",
            "ColumnName": "",
            "DBLength": "",
            "DBType": "CLOB",
            "DecimalPlacesCount": 0,
            "DefaultValue": "",
            "FileExtensions": "",
            "FileMaxSize": 0,
            "ImageExtensions": "",
            "ImageMaxSize": 0,
            "IncludeInIndexes": false,
            "InstructionalChoice": "- Select -",
            "InstructionalText": "",
            "IsHiddenField": false,
            "IsRequired": false,
            "IsRequiredToSelectCheckbox": false,
            "IsRequiredToSelectDdlValue": false,
            "LengthValidationMessage": "",
            "MaxLength": 0,
            "MediaType": "",
            "MinLength": 0,
            "Name": "Content",
            "NumberUnit": "",
            "RegularExpression": null,
            "Title": "Content",
            "TypeName": "LongText",
            "TypeUIName": "Long text",
            "VideoExtensions": "",
            "VideoMaxSize": 0,
            "WidgetTypeName": "Telerik.Sitefinity.Web.UI.Fields.HtmlField",
            "IsLocalizable": true
        },
        {
            "AllowImageLibrary": false,
            "AllowMultipleFiles": false,
            "AllowMultipleImages": false,
            "AllowMultipleVideos": false,
            "AllowNulls": false,
            "CanCreateItemsWhileSelecting": true,
            "CanSelectMultipleItems": true,
            "CheckedByDefault": false,
            "ChoiceRenderType": "",
            "Choices": "",
            "ClassificationId": "cb0f3a19-a211-48a7-88ec-77495c0f5374",
            "ColumnName": "",
            "DBLength": "",
            "DBType": null,
            "DecimalPlacesCount": 0,
            "DefaultValue": "",
            "DisableLinkParser": false,
            "DropDownListDefaulValueIndex": 0,
            "FileExtensions": "",
            "FileMaxSize": 0,
            "ImageExtensions": "",
            "ImageMaxSize": 0,
            "FrontendWidgetLabel": null,
            "FrontendWidgetTypeName": null,
            "IncludeInIndexes": false,
            "InstructionalChoice": "- Select -",
            "InstructionalText": "",
            "IsHiddenField": false,
            "IsRequired": false,
            "IsRequiredToSelectCheckbox": false,
            "IsRequiredToSelectDdlValue": false,
            "IsTransient": false,
            "LengthValidationMessage": "",
            "MaxLength": 0,
            "MaxNumberRange": null,
            "MediaType": "",
            "MinLength": 0,
            "MinNumberRange": null,
            "Name": "ArrayOfGuidsField",
            "NumberUnit": "",
            "RegularExpression": null,
            "Title": "ArrayOfGuidsField",
            "TypeName": "GuidArray",
            "TypeUIName": "Array of GUIDs",
            "VideoExtensions": "",
            "VideoMaxSize": 0,
            "WidgetTypeName": "SomeTestPath",
            "IsLocalizable": false
        }],
        "MainShortTextFieldName": "Title",
        "IsSelfReferencing": false,
        "CheckFieldPermissions": false
    };
}

export function includeInSiteMock(name: string) {
    return {
        "dataSourceConfigurations": [
            {
                "IsChecked": true,
                "Links": [
                    {
                        "IsDefault": true,
                        "ProviderName": "OpenAccessProvider"
                    }
                ],
                "Name": name
            }
        ]
    };
}

export function generateDynamicItemMock(typeName: string, itemTitle: string) {
    return {
        typeName,
        data: {
            "Title": itemTitle,
            "UrlName": "some-url",
            "Content": "<p>Hello everyone, this is a long text field</p>",
            "ArrayOfGuidsField": ["2c379b03-5427-44bb-8880-d3e8d16e83a5", "00beeddf-1fff-43aa-8630-c3fd310d016c"]
        }
    }
}

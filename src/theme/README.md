# Admin App custom theme

You can customize the appearance of the Admin App by modifying specific components of the user interface. Thus, you create a custom theme for the new content experience backend, that is, the Admin App. You can customize the following components: 

* Button colors, such as border, background, and text color 

* Secondary text, such as notes and descriptions of UI elements 

* Input placeholder text, such as hints for input fields 

You can also set an outline style for all UI focusable elements, for example, buttons or input fields, and so on. 

**NOTE:** The custom theme and its customizations are stored in the **Local Storage**. Thus, you can see the custom Admin App theme in the current browser only. Therefore, in case you clear your **Local Storage** or use another browser, the theme applied will be the default one, not the custom one.

To customize the Admin App theme, you need to create a custom implementation of the [**ThemeProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/themeprovider.html) interface and its [**getThemes()**](http://admin-app-extensions-docs.sitefinity.site/interfaces/themeprovider.html#getthemes) method. The method returns an **Array** of the [**ThemeItem**](http://admin-app-extensions-docs.sitefinity.site/interfaces/themeitem.html) object. Theme items must contain the [**name**](http://admin-app-extensions-docs.sitefinity.site/interfaces/themeitem.html#name) of your custom theme and an array of the [**ThemeVariablesKeyValuePair**](http://admin-app-extensions-docs.sitefinity.site/interfaces/themevariableskeyvaluepair.html). The key-value pair contains the following: 

* **key: ThemeVariables**
  The [**ThemeVariables**](http://admin-app-extensions-docs.sitefinity.site/enums/themevariables.html) value is an Enum of all exposed CSS variables that can be modified, such as the properties of colors or buttons. 

* **value: string**
  The string value is the value that you set for the specific CSS variable, for example, *"#38AB63"*. 

**NOTE:** In key-value pairs, you abide by the following syntax: **{ key: ThemeVariables.DefaultButtonColor, value: "#333" }**. You thus set the color of the default button to be color **#333**. 

The following table lists all exposed variables, that is UI components, along with sample values.

| Name                                          | Key                                                       | Value                 |
| --------------------------------------------- | --------------------------------------------------------- | --------------------- |
| Default button border color                   | ThemeVariables.DefaultButtonBorderColor                   | "#E4E4E4"             |
| Default button background color               | ThemeVariables.DefaultButtonBackgroundColor               | "#FFF"                |
| Default button color                          | ThemeVariables.DefaultButtonColor                         | "#333"                |
| Default button interaction border color       | ThemeVariables.DefaultButtonInteractionBorderColor        | "#E4E4E4"             |
| Default button interaction background color   | ThemeVariables.DefaultButtonInteractionBackgroundColor    | "#E4E4E4"             |
| Default button interaction color              | ThemeVariables.DefaultButtonInteractionColor              | "#333"                |
| Default button disabled border color          | ThemeVariables.DefaultButtonDisabledBorderColor           | "#EEE"                |
| Default button disabled background color      | ThemeVariables.DefaultButtonDisabledBackgroundColor       | "#FFF"                |
| Default button disabled color                 | ThemeVariables.DefaultButtonDisabledColor                 | "#E4E4E4"             |
| Action button border color                    | ThemeVariables.ActionButtonBorderColor                    | "#38AB63"             |
| Action button background color                | ThemeVariables.ActionButtonBackgroundColor                | "#38AB63"             |
| Action button color                           | ThemeVariables.ActionButtonColor                          | "#FFF"                |
| Action button interaction border color        | ThemeVariables.ActionButtonInteractionBorderColor         | "#1F924A"             |
| Action button interaction background color    | ThemeVariables.ActionButtonInteractionBackgroundColor     | "#1F924A"             |
| Action button interaction color               | ThemeVariables.ActionButtonInteractionColor               | "#FFF"                |
| Action button disabled border color:          | ThemeVariables.ActionButtonDisabledBorderColor            | "#C4E6D1"             |
| Action button disabled background color       | ThemeVariables.ActionButtonDisabledBackgroundColor        | "#C4E6D1"             |
| Action button disabled color                  | ThemeVariables.ActionButtonDisabledColor                  | "#FFF"                |
| Delete button border color                    | ThemeVariables.DeleteButtonBorderColor                    | "#FF4848"             |
| Delete button background color                | ThemeVariables.DeleteButtonBackgroundColor                | "#FF4848"             |
| Delete button color                           | ThemeVariables.DeleteButtonColor                          | "#FFF"                |
| Delete button interaction border color        | ThemeVariables.DeleteButtonInteractionBorderColor         | "#E62F2F"             |
| Delete button interaction background color    | ThemeVariables.DeleteButtonInteractionBackgroundColor     | "#E62F2F"             |
| Delete button interaction color               | ThemeVariables.DeleteButtonInteractionColor               | "#FFF"                |
| Delete button disabled border color           | ThemeVariables.DeleteButtonDisabledBorderColor            | "#FFC8C8"             |
| Delete button disabled background color       | ThemeVariables.DeleteButtonDisabledBackgroundColor        | "#FFC8C8"             |
| Delete button disabled color                  | ThemeVariables.DeleteButtonDisabledColor                  | "#FFF"                |
| Global outline for focusable elements         | ThemeVariables.GlobalOutline                              | "5px solid #DCECF5"   |
| Global outline offset for focusable elements  | ThemeVariables.GlobalOutlineOffset                        | "5px"                 |
| Secondary (note, describtion) text color      | ThemeVariables.SecondaryTextColor                         | "#777"                |
| Input placeholders text color                 | ThemeVariables.InputPlaceholderColor                      | "#BBB"                |

For a more detailed demonstration of how to modify the Admin App UI elements and how to create a custom theme, check out the **theme-provider.ts** file.

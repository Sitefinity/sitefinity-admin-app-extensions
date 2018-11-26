# Custom theme for Sitefinity CMS Admin App

You are given the ability to customize some of the components in the Admin App UI. The only thing you need to do is create a custom implementation of the **ThemeProvider** interface and its method **getThemes()**, which returns an **Array** of **ThemeItem**. Theme items must contain **name** of the theme and **Array** of **ThemeVariablesKeyValuePair**. This key value pair has **key**: **ThemeVariables** (an **Enum** of exposed CSS variables that can be modified) and **value**: **string** (the value that is to be set for the specified CSS variable e.g. "#38AB63"). Currently you are able to customize the colors of the default, action and delete buttons, secondary (note, description) text and input placeholder text. You can also set a outline style for all focusable elements. This is the list of the exposed variables with some sample value set:

* Default button border color: { key: ThemeVariables.DefaultButtonBorderColor, value: "#E4E4E4" }
* Default button background color: { key: ThemeVariables.DefaultButtonBackgroundColor, value: "#FFF" }
* Default button color: { key: ThemeVariables.DefaultButtonColor, value: "#333" }
* Default button interaction border color: { key: ThemeVariables.DefaultButtonInteractionBorderColor, value: "#E4E4E4" }
* Default button interaction background color: { key: ThemeVariables.DefaultButtonInteractionBackgroundColor, value: "#E4E4E4" }
* Default button interaction color: { key: ThemeVariables.DefaultButtonInteractionColor, value: "#333" }
* Default button disabled border color: { key: ThemeVariables.DefaultButtonDisabledBorderColor, value: "#EEE" }
* Default button disabled background color: { key: ThemeVariables.DefaultButtonDisabledBackgroundColor, value: "#FFF" }
* Default button disabled color: { key: ThemeVariables.DefaultButtonDisabledColor, value: "#E4E4E4" }
* Action button border color: { key: ThemeVariables.ActionButtonBorderColor, value: "#38AB63" }
* Action button background color: { key: ThemeVariables.ActionButtonBackgroundColor, value: "#38AB63" }
* Action button color: { key: ThemeVariables.ActionButtonColor, value: "#FFF" }
* Action button interaction border color: { key: ThemeVariables.ActionButtonInteractionBorderColor, value: "#1F924A" }
* Action button interaction background color: { key: ThemeVariables.ActionButtonInteractionBackgroundColor, value: "#1F924A" }
* Action button interaction color: { key: ThemeVariables.ActionButtonInteractionColor, value: "#FFF" }
* Action button disabled border color:: { key: ThemeVariables.ActionButtonDisabledBorderColor, value: "#C4E6D1" }
* Action button disabled background color: { key: ThemeVariables.ActionButtonDisabledBackgroundColor, value: "#C4E6D1" }
* Action button disabled color: { key: ThemeVariables.ActionButtonDisabledColor, value: "#FFF" }
* Delete button border color: { key: ThemeVariables.DeleteButtonBorderColor, value: "#FF4848" }
* Delete button background color: { key: ThemeVariables.DeleteButtonBackgroundColor, value: "#FF4848" }
* Delete button color: { key: ThemeVariables.DeleteButtonColor, value: "#FFF" }
* Delete button interaction border color: { key: ThemeVariables.DeleteButtonInteractionBorderColor, value: "#E62F2F" }
* Delete button interaction background color: { key: ThemeVariables.DeleteButtonInteractionBackgroundColor, value: "#E62F2F" }
* Delete button interaction color: { key: ThemeVariables.DeleteButtonInteractionColor, value: "#FFF" }
* Delete button disabled border color: { key: ThemeVariables.DeleteButtonDisabledBorderColor, value: "#FFC8C8" }
* Delete button disabled background color: { key: ThemeVariables.DeleteButtonDisabledBackgroundColor, value: "#FFC8C8" }
* Delete button disabled color: { key: ThemeVariables.DeleteButtonDisabledColor, value: "#FFF" }
* Global outline for focusable elements: { key: ThemeVariables.GlobalOutline, value: "5px solid #DCECF5" }
* Global outline offset for focusable elements: { key: ThemeVariables.GlobalOutlineOffset, value: "5px" }
* Secondary (note, describtion) text color: { key: ThemeVariables.SecondaryTextColor, value: "#777" }
* Input placeholders text color: { key: ThemeVariables.InputPlaceholderColor, value: "#BBB" }

You can check **theme-provider.ts** for more detailed demonstration of how to customize the UI of Admin App.

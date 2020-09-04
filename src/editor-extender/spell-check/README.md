# Custom content editor toolbar with spellcheck functionality and spellcheck contextual toolset

Another useful addition to the content editing experience is having a dedicated button in the content editor’s toolbar that enables content authors to perform spellcheck on the go. This extension sample adds an extra toolbar button that calls an external API - the Azure cognitive services Bing spell check. Based on the response from the API, all spelling-related issues are marked with yellow in the content. Upon clicking on a marked word, a custom contextual toolset (edit menu) is displayed. The toolset contains:

* Proposed change
* Accept and reject buttons

To extend the contextual toolset, you need to implement the [**EditMenuProvider**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editmenuprovider.html) interface, which defines the [**getButtons**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editmenuprovider.html#getbuttons) method. The method returns the buttons that are displayed on clicking the marked word. To make an element, in this example - the contextual toolset, editable, you need to mark it with at least the following 2 attributes:
* **data-sf-ec-immutable**
* **custom-edit-menu**

It is a good idea to mark the element with another custom unique attribute that will be used for identification in the [**getButtons**](http://admin-app-extensions-docs.sitefinity.site/interfaces/editmenuprovider.html#getbuttons) method. In this example, the **suggestion** attribute is used.
Keep in mind that you need an Azure API key to make calls to the Azure service. For more information about getting the Azure API key, see the [Azure spell check documentation](https://azure.microsoft.com/en-us/services/cognitive-services/spell-check/). After you acquire a key, place it in the **editor-spell-check-provider.ts** file.
Add the [Azure API endpoint](https://api.cognitive.microsoft.com/) to the **connect-src** section of the Sitefinity Web security module. For more information, see [Content policy HTTP header syntax reference](https://www.progress.com/documentation/sitefinity-cms/content-security-policy-http-header-syntax-reference).

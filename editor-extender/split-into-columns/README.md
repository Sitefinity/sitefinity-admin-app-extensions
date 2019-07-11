#Column Splitter

## Summary
This extension allows you to split a text in columns in the **AdminApp** using the popup at the top of the toolbar.
It can split the text in a different number of columns.

## Interaction
You press the column button at the top of the toolbar and when the popup shows - you can choose the amount of columns to split the text into from the dropdown.
Et Voila! The text is split into multiple columns.

## Implementation
A **ToolBuilder** class is added in _../utils/tool-builder.ts_ that provides an endpoint for creating and registering a popup tool for the Kendo editor toolbar.

Events are attached on InsertSymbolTool._activate() and detached on InsertSymbolTool._close(). On click the _exec() function is called, the symbol is inserted and the popup is closed.

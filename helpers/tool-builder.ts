declare var jQuery;

/**
 * Represents an optional interface for the configuration of a custom tool.
 */
export interface ToolConfig {
    /**
     * A function that is called when the tool is initialized in the toolbar.
     */
    init?: Function;
    /**
     * Actual work that is performed by the tool.
     */
    _exec: Function;
    /**
     * A function that is called every time the tool is activated, in the case of the popup - when the popup is opened.
     * Used to initialize event handlers.
     */
    _activate?: Function;
    /**
     * A function that is called when the tool's popup is opened.
     */
    _open?: Function;
    /**
     * A function that is called when the tool's popup is closed.
     * Used to clean up event handlers.
     */
    _close?: Function;
}

/**
 * Provides an interface for creating and registering custom tools in the Kendo editor.
 */
export class ToolBuilder {
    /**
     * Creates a custom tool that extends the default Kendo popup tool with given configuration.
     * @param kendo Reference to the global kendo script
     * @param toolTitle The title to be used for the tool
     * @param config Configuration object that holds the needed functionality
     * @param command Command name
     * @param popupTemplateGenerator Popup template generator function
     */
    public static createPopupTool (kendo: any, toolTitle: string, config: ToolConfig, command: string, popupTemplateGenerator: Function): any {
        const PopupTool = kendo.ui.editor.PopupTool;

        const defaultConfig = {
            init : function(options) {
                if (config.init) {
                    config.init.bind(this)();
                }

                PopupTool.fn.init.call(this, jQuery.extend(options, {
                    command: command,
                    popupTemplate: popupTemplateGenerator.bind(this)()
                }));
            },
            _open: function () {
                PopupTool.fn._open.call(this);
                if (config._open) {
                    config._open.bind(this)();
                }
            },
            _close: function () {
                PopupTool.fn._close.call(this);
                if (config._close) {
                    config._close.bind(this)();
                }
            }
        };

        for (const functionName in config) {
            if (functionName === "init" ||  functionName === "_open" || functionName === "_close") {
                continue;
            }
            defaultConfig[functionName] = config[functionName];
        }

        return PopupTool.extend(defaultConfig);
    }

    /**
     * Registers a new custom tool in the Kendo editor, to be inserted later in the toolbar.
     * @param kendo Reference to the global Kendo script
     * @param Tool The generated tool
     * @param toolTitle The title of the tool
     * @param toolTemplate Template for the tool's appearance in the toolbar
     * @param isPopup Whether the tool is a popup or not
     */
    public static registerTool (kendo: any, Tool: any, toolTitle: string, toolTemplate: any, isPopup: boolean = false): void {
        const EditorUtils = kendo.ui.editor.EditorUtils;
        const ToolTemplate = kendo.ui.editor.ToolTemplate;

        EditorUtils.registerTool(toolTitle, new Tool({
            template: new ToolTemplate({
                template: toolTemplate,
                popup: isPopup,
                title: toolTitle
            })
        }));
    }
}

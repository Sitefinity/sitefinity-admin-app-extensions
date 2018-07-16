import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./editor-spell-check-provider.css");

/**
 * Indicates the minimum value of certainty that is needed in order a correction to be applied.
 */
const MIN_CERTAINTY = 0.6;
const HOST = 'https://api.cognitive.microsoft.com';
const PATH = '/bing/v7.0/spellcheck';

/*
 * NOTE: Replace this example key with your subscription key .
 */
const KEY = '032f64be381a4566af2e50c3cd212647';

/**
 * Mode of spellcheck
 * Proof - Meant to provide Office Word like spelling corrections.
 *         It can correct long queries, provide casing corrections and suppresses aggressive corrections.
 * Spell - Meant to provide Search engine like spelling corrections.
 *         It will correct small queries(up to length 9 tokens) without any casing changes and
 *         will be more optimized (perf and relevance) towards search like queries.
 */
const MODE = "proof";

/**
 * A custom toolbar provider implementation for checheking and correcting the spelling in the kendo editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class EditorSpellCheckProvider implements EditorConfigProvider {

    constructor(
        private http: HttpClient) {
    }

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        /**
         * A custom toolbar item
         */
        const SPELL_CORRECTION_TOOLBAR_ITEM: ToolBarItem = {
            name: "Spell-correction",
            tooltip: "Spell correction",
            ordinal: -1,
            exec: () => this.spellCorrect(editorHost)
        };

        const SPELL_CHECK_TOOLBAR_ITEM: ToolBarItem = {
            name: "Spell-check",
            tooltip: "Spell check",
            ordinal: -1,
            exec: () => this.spellCheck(editorHost)
        };

        return [SPELL_CHECK_TOOLBAR_ITEM, SPELL_CORRECTION_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        /**
         * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
         * Otherwise return an empty array.
         * Example: return [ "embed" ];
         * The above code will remove the embed toolbar item from the editor.
         * Documentation where you can find all tools' names: https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools
         */
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        return configuration;
    }

    private spellCheck(editorHost: any) {
        const editor = editorHost.getKendoEditor();

        // TODO: get selection not the whole text
        let text = editor.value();

        // TODO: use the real culture
        this.makeRequest(text).subscribe((response: any) => {
            if (response._type == "SpellCheck") {
                let lastMarkedErrorIndex = 0;
                response.flaggedTokens.forEach(token => {
                    // find the token in the text
                    const indexOfMisspelledWord = text.indexOf(token.token, lastMarkedErrorIndex);
                    if (indexOfMisspelledWord < token.offset)
                        return;

                    if (token.suggestions.length <= 0)
                        return;

                    // get the best suggestion if over the min required certainty
                    const suggestion = token.suggestions[0].suggestion;
                    const certainty = token.suggestions[0].score;
                    const markedWord = document.createElement("SPAN") as HTMLSpanElement;
                    markedWord.setAttribute("suggestion", suggestion);
                    markedWord.setAttribute("certainty", certainty);
                    markedWord.setAttribute("data-sf-ec-immutable", "");
                    markedWord.setAttribute("custom-edit-menu", "");
                    markedWord.innerText = token.token;

                    // apply the mark
                    text = text.slice(0, indexOfMisspelledWord)
                        + text.slice(indexOfMisspelledWord, indexOfMisspelledWord + token.token.length).replace(token.token, markedWord.outerHTML)
                        + text.slice(indexOfMisspelledWord + token.token.length);

                    // bump the counter of fixed words
                    lastMarkedErrorIndex = indexOfMisspelledWord;
                });

                editor.value(text);
            } else if (response._type == "ErrorResponse") {
                // TODO: handle errors https://dev.cognitive.microsoft.com/docs/services/5f7d486e04d2430193e1ca8f760cd7ed/operations/57855119bca1df1c647bc358
                alert("An error occured");
            }
        });
    }

    private spellCorrect(editorHost: any) {
        const editor = editorHost.getKendoEditor();
        // TODO: get selection not the whole text
        let text = editor.value();
        text = this.removeSpellChecks(text);

        // TODO: use the real culture
        this.makeRequest(text).subscribe((response: any) => {
            if (response._type == "SpellCheck") {
                if (window.confirm("Are you sure you want to automatically correct all spelling mistakes?")) {
                    let fixedErrorsCount = 0;
                    let lastFixedErrorIndex = 0;
                    response.flaggedTokens.forEach(token => {
                        // find the token in the text
                        const indexOfMisspelledWord = text.indexOf(token.token, lastFixedErrorIndex);
                        if (indexOfMisspelledWord < token.offset)
                            return;

                        const suggestions = token.suggestions.filter(s => s.score >= MIN_CERTAINTY);
                        if (suggestions.length <= 0)
                            return;

                        // get the best suggestion if over the min required certainty
                        const suggestion = suggestions[0].suggestion;

                        // apply the correction
                        text = text.slice(0, indexOfMisspelledWord)
                            + text.slice(indexOfMisspelledWord, indexOfMisspelledWord + token.token.length).replace(token.token, suggestion)
                            + text.slice(indexOfMisspelledWord + token.token.length);

                        // bump the counter of fixed words
                        ++fixedErrorsCount;
                        lastFixedErrorIndex = indexOfMisspelledWord;
                    });

                    editor.value(text);
                    editor.trigger("change");
                    alert(`${fixedErrorsCount} errors were fixed!`);
                }
            } else if (response._type == "ErrorResponse") {
                // TODO: handle errors https://dev.cognitive.microsoft.com/docs/services/5f7d486e04d2430193e1ca8f760cd7ed/operations/57855119bca1df1c647bc358
                alert("An error occured");
            }
        });
    }

    private removeSpellChecks(text: string) {
        var wrapper= document.createElement('div');
        wrapper.innerHTML= text;

        //const doc = new DOMParser().parseFromString(text, "text/xml");
        const spans = wrapper.querySelectorAll("span[suggestion]");
        for (let i = 0; i < spans.length; i++) {
            spans[i].outerHTML = spans[i].textContent;
        }

        return wrapper.outerHTML;
    }

    private makeRequest(text: string, culture: string = "en-US"): Observable<object> {
        const textWithoutHTMLTags = this.stripHTML(text);
        const query_string = "?mkt=" + culture + "&mode=" + MODE + "&text=" + textWithoutHTMLTags;
        const url = HOST + PATH + query_string;
        const options = {
            headers : {
                'Ocp-Apim-Subscription-Key' : KEY
            }
        };

        return this.http.get(url, options);
    }

    private stripHTML(html: string): string {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const EDITOR_SPELL_CHECK_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: EditorSpellCheckProvider
};

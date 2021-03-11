import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN  } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./editor-spell-check-provider.css");

/*
 * NOTE: Replace this example key with your subscription key.
 * For more information on how to get a key check here: https://azure.microsoft.com/en-us/services/cognitive-services/spell-check/
 */
const AZURE_LANGUAGE_SERVICES_API_KEY = "";

/**
 * Indicates the minimum value of certainty that is needed in order a correction to be applied.
 */
const MIN_CERTAINTY = 0.5;
const HOST = "https://api.cognitive.microsoft.com";
const PATH = "/bing/v7.0/spellcheck";

/**
 * Mode of spellcheck
 * Proof - Meant to provide Office Word like spelling corrections.
 *         It can correct long queries, provide casing corrections and suppresses aggressive corrections.
 * Spell - Meant to provide Search engine like spelling corrections.
 *         It will correct small queries(up to length 65 tokens) without any casing changes and
 *         will be more optimized (perf and relevance) towards search like queries.
 */
const PROOF_MODE = "proof";
const SPELL_MODE = "spell";

/**
 * Currently the proof mode supports only these 3 cultures. For other cultures spell mode should be used.
 * The list is subject to change.
 * For more information check: https://docs.microsoft.com/bg-bg/azure/cognitive-services/bing-spell-check/proof-text
 */
const proofModeCultures = [
    "en-US",
    "es-ES",
    "pt-BR"
];

/**
 * A custom toolbar provider implementation for checheking and correcting the spelling in the kendo editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class EditorSpellCheckProvider implements EditorConfigProvider {
    private culture: string;

    constructor(private http: HttpClient) {
    }

    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */
    getToolBarItems(editorHost: any): ToolBarItem[] {
        const SPELL_CHECK_TOOLBAR_ITEM: ToolBarItem = {
            name: "Spell-check",
            tooltip: "Spell check",
            ordinal: -1,
            exec: () => this.spellCheck(editorHost, this.culture)
        };

        return [SPELL_CHECK_TOOLBAR_ITEM];
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
        this.culture = configuration.culture;
        return configuration;
    }

    private spellCheck(editorHost: any, culture: string) {
        const editor = editorHost.getKendoEditor();
        let text = editor.value();
        const textWithoutHTMLTags = this.stripHTML(text);

        let batches = [{
            text: textWithoutHTMLTags,
            startIndex: 0
        }];

        let mode = PROOF_MODE;

        /*
        * NOTE: Spell mode will make a batch of queries.
        * There is a change your subscription plan does not support multiple queries per second.
        * In such case use proof mode.
        */
        if (culture && proofModeCultures.indexOf(culture) === -1) {
            mode = SPELL_MODE;
            batches = this.splitTextInBatches(textWithoutHTMLTags);
        }

        const requests = [];
        batches.forEach(batch => {
            requests.push(this.makeRequest(batch.text, culture, mode));
        });

        forkJoin(requests).subscribe(
            (responses: any) => {
                let lastMarkedErrorIndex = 0;
                responses.forEach((response: any, index) => {
                        if (response._type === "SpellCheck") {
                            response.flaggedTokens.forEach(token => {
                                // find the token in the text
                                const indexOfMisspelledWord = text.indexOf(token.token, lastMarkedErrorIndex);
                                if (indexOfMisspelledWord < token.offset + batches[index].startIndex)
                                    return;

                                if (token.suggestions.length <= 0)
                                    return;

                                // get the best suggestion if over the min required certainty
                                const suggestion = token.suggestions[0].suggestion;
                                const certainty = token.suggestions[0].score;

                                if (certainty < MIN_CERTAINTY)
                                    return;

                                const markedWord = document.createElement("SPAN") as HTMLSpanElement;
                                markedWord.setAttribute("suggestion", suggestion);
                                markedWord.setAttribute("data-sf-ec-immutable", "");
                                markedWord.setAttribute("custom-edit-menu", "");
                                markedWord.innerText = token.token;

                                // check if word is already marked
                                const indexOfMarkedWord = text.indexOf(markedWord.outerHTML, lastMarkedErrorIndex);
                                if (indexOfMarkedWord !== -1 && indexOfMarkedWord < indexOfMisspelledWord)
                                    return;

                                // apply the mark
                                text = text.slice(0, indexOfMisspelledWord)
                                    + text.slice(indexOfMisspelledWord, indexOfMisspelledWord + token.token.length).replace(token.token, markedWord.outerHTML)
                                    + text.slice(indexOfMisspelledWord + token.token.length);

                                // bump the counter of fixed words
                                lastMarkedErrorIndex = indexOfMisspelledWord + markedWord.outerHTML.length;
                            });

                            editor.value(text);
                            editor.trigger("change");
                        }
            }); },
            (error: any) => {
                alert(`${error.error.message} Contact your administrator to resolve this issue.`);
            });
    }

    private makeRequest(text: string, culture: string = "en-US", mode: string = "proof"): Observable<object> {
        const queryString = "?mkt=" + culture + "&mode=" + mode;
        const url = HOST + PATH + queryString;
        const body = new URLSearchParams();
        body.set("text", text);
        const options = {
            headers : {
                "Ocp-Apim-Subscription-Key" : AZURE_LANGUAGE_SERVICES_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        return this.http.post(url, body.toString(), options);
    }

    private stripHTML(html: string): string {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    private splitTextInBatches(text: string): any[] {
        const batches = [];
        let words = text.split(" ");
        const batch = {
            text: "",
            startIndex: 0
        };
        let lastMarkedBatchIndex = 0;

        words.forEach(word => {
            const newBatchText = batch.text === "" ? word : batch.text + " " + word;
            if (newBatchText.length <= 65) {
                batch.text = newBatchText;
            } else {
                // find the batch in the text
                const indexOfBatch = text.indexOf(batch.text, lastMarkedBatchIndex);
                batch.startIndex = indexOfBatch;
                lastMarkedBatchIndex = indexOfBatch;
                batches.push(JSON.parse(JSON.stringify(batch)));
                batch.text = word;
            }
        });

        batches.push(batch);
        return batches;
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

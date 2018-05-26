import { ClassProvider, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToolBarItemsProvider, ToolBarItem, TOOLBARITEMS_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { forkJoin } from "rxjs/observable/forkJoin";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./text-analytics-info.css");

const AZURE_ENDPOINT = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0";
const API_SENTIMENT_PATH = "/sentiment";
const API_KEY_PHRASES_PATH = "/keyPhrases";
const API_LANGUAGE_PATH = "/languages";
const LOCAL_STORE_API_KEY = "AZURE_COGNITIVE_SERVICES_API_KEY";
let apiKey: string = localStorage.getItem(LOCAL_STORE_API_KEY);

const htmlNode = document.createElement("div");
/**
 * A custom editor toolbar provider implementation
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class TextAnalyticsToolbarItemProvider implements ToolBarItemsProvider {

    // get reference to http client so we can call external APIs
    constructor(private http: HttpClient) { }

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const infoElement = document.createElement("div");
        infoElement.className = "custom-text-analytics";
        editorHost.before(infoElement);

        // A custom toolbar item
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Text-analytics",
            tooltip: "Text analytics",
            ordinal: 7,
            exec: () => { this.performTextAnalytics(editorHost, infoElement); }
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    private performTextAnalytics(editorHost, infoElement) {
        const editor = editorHost.getKendoEditor();

        // get editor plain text content
        let editorContent = extractTextContent(editor.value());

        if (!editorContent) {
            return;
        }

        // Obtain Azire API key if not found in local storage
        if (!apiKey) {
            apiKey = prompt("Please provide a valid Azure Cognitive Services API Key: \nGet a free one at: https://azure.microsoft.com/en-us/free/");
            if (apiKey && apiKey.trim()) {
                localStorage.setItem(LOCAL_STORE_API_KEY, apiKey);
            } else {
                return;
            }
        }

        // trim to ~5k characters without breaking the last word
        editorContent = editorContent.replace(/^(.{5000}[^\s]*).*/, "$1");

        // prepare the POST body payload as JSON
        const requestBody = JSON.stringify({
            "documents": [
                { "id": "1", "text": editorContent }
            ]
        });

        // prepare autorization and content-type headers
        const options = {
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Content-Type": "application/json"
            }
        };
        infoElement.innerHTML = "<h2>Text Analytics</h2><label>Processing content...</label>";

        // post API requests
        let sentimentReques = this.http.post(
            AZURE_ENDPOINT + API_SENTIMENT_PATH,
            requestBody,
            options
        );
        let keyPhrasesReques = this.http.post(
            AZURE_ENDPOINT + API_KEY_PHRASES_PATH,
            requestBody,
            options
        );
        let languagesRequest = this.http.post(
            AZURE_ENDPOINT + API_LANGUAGE_PATH,
            requestBody,
            options
        );

        // wait for all to complete
        forkJoin(languagesRequest, sentimentReques, keyPhrasesReques)
            .subscribe((data) => {
                // WARNING: Always make sure that data you get
                // from external sources is always sanitized.
                // Here we use extractTextContent() to strip any potential HTML markup
                let languages = data[0]["documents"][0].detectedLanguages
                    .map((l) => extractTextContent(l.name) + " " + Math.round(l.score * 1000) / 10 + "%").join(", ");
                let sentimentScore = Math.round(data[1]["documents"][0].score * 100);
                let sentimentType = sentimentScore <= 30 ? "Negative" : sentimentScore >= 70 ? "Positive" : "Undetermined";
                let topPhrases = data[2]["documents"][0].keyPhrases.slice(0, 10)
                    .map((v) => extractTextContent(v)).join(", ");

                let info = `
                    <h2>Text Analytics</h2>
                    <label>Languages</label>
                    <h3>${languages}</h3>
                    <label>Sentiment</label>
                    <h3 class="custom-sentiment-${sentimentType}">${sentimentScore}%</h3>
                    <label>Top 10 Key Phrases</label>
                    <h3>${topPhrases}</h3>
                `;

                infoElement.innerHTML = info;
            });
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const TEXT_ANALYTICS_TOOLBAR_ITEM_PROVIDER: ClassProvider = {
    multi: true,
    provide: TOOLBARITEMS_TOKEN,
    useClass: TextAnalyticsToolbarItemProvider
};

function extractTextContent(html) {
    htmlNode.innerHTML = html;
    return htmlNode.textContent.trim();
}

import { EmbedMediaParser, Media, MediaType } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { ClassProvider } from "@angular/core";

const VIMEO_URL_REGEX = new RegExp("((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)vimeo.com[/0-9]+)", "i");

/**
 * Handles pastes and embed media links for Vimeo.
 */
export class VimeoMediaParser extends EmbedMediaParser {
    /**
     * Determines if the input text contains Vimeo link.
     * @param inputText
     */
    canProcess(inputText: string): boolean {
        return VIMEO_URL_REGEX.test(inputText);
    }

    /**
     * Parses the input text and retrieves HTML to embed Vimeo video.
     * @param inputText
     */
    parse(inputText: string): Promise<Media> {
        const vimeoUrl = VIMEO_URL_REGEX.exec(inputText)[0];
        const endpoint = `https://vimeo.com/api/oembed.json?url=${vimeoUrl}`;

        return fetch(endpoint)
            .then(r => r.json())
            .then(r => {
                const media: Media = {
                    html: r.html,
                    isValid: true,
                    height: { value: r.height, hasValue: true },
                    width: { value: r.width, hasValue: true },
                    type: MediaType.IFrame
                };

                return media;
            });
    }
}

export const VIMEO_EMBED_MEDIA_PROVIDER: ClassProvider = {
    multi: true,
    provide: EmbedMediaParser,
    useClass: VimeoMediaParser
};

import { element, by, ElementFinder } from "protractor";

export class VideosModalMap {
    public static TitleField: ElementFinder = element(by.css("h1"));
    public static CancelButton: ElementFinder = element(by.cssContainingText("button", "Cancel"));
}

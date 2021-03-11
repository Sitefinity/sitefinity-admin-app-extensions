import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DataContextComponent, DataContext, HTTP_PREFIX } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";

// Get a collection with images in base64 format from image-data.json file
import * as imageData from "./image-data.json";

/**
 * A custom component to be displayed in each cell in a specific column in the grid.
 */
@Component({
    templateUrl: "./image.component.html"
})
export class ImageComponent implements OnInit, DataContextComponent {

    // This context is automatically set for each component instantiated in the grid.
    // It holds metadata that includes the data item for the current row and the column model as well.
    context: DataContext;
    // Sample height of the image
    protected imageHeight = 50;
    protected imageSource;

    /**
     * Initializes a new instance of the ImageComponent.
     * @param http - The http client service used for making http requests.
     */
    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.imageSource = this.getSampleImageFromJSON();

        // To display a related image comment the line above and uncomment the line below.
        // NOTE: relatedImageFieldName variable should be assigned by the name of the related image field
        // this.getRelatedImageSource().subscribe(imageSource => this.imageSource = imageSource);
    }

    /**
     * Gets a related image source.
     * @returns {Observable<string>} The image source.
     */
    private getRelatedImageSource(): Observable<string> {
        // Replace the value with the related image field name
        const relatedImageFieldName = "_REPLACE_WITH_RELATED_IMAGE_FIELD_NAME_";

        // http prefix is dynamically replaced with the actual url of sitefinity
        const url = `${HTTP_PREFIX}/sf/system/${this.context.dataItem.metadata.setName}(${this.context.dataItem.key})/${relatedImageFieldName}`
                    + (this.context.dataItem.provider ? `?sf_provider=${this.context.dataItem.provider}` : ``);

        return this.http.get(url).pipe(map((response: any) => {
            return response.value.length ? response.value[0].Url : "";
        }));
    }

    /**
     * Gets a random image source from some predefined values.
     * @returns {string} The image source.
     */
    private getSampleImageFromJSON(): string {
        // Get a random image index from imageData
        let randomNumber = this.getRandomInt(0, imageData.images.length);

        // Get this image's source for rendering
        return imageData.images[randomNumber].source;
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive).
     * @param {number} min - Output number lower boundary.
     * @param {number} max - Output number upper boundary.
     * @returns {number} The generated random number.
     */
    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

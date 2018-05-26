import { Component, OnInit } from "@angular/core";
import { DataContextComponent, DataContext } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// Get a collection with images in base64 format from image-data.json file
const imageData = require("./image-data.json");

/**
 * A custom component to be displayed in each cell in a specific column in the grid.
 */
@Component({
    template: require("./image.component.html")
})
export class ImageComponent implements OnInit, DataContextComponent {

    // This context is automatically set for each component instantiated in the grid.
    // It holds metadata that includes the data item for the current row and the column model as well.
    context: DataContext;
    // Sample height of the image
    protected imageHeight = 50;
    protected imageSource;

    ngOnInit() {
        // Get a random image index from imageData
        let randomNumber = this.getRandomInt(0, imageData.images.length);
        // Get this image's source for rendering
        this.imageSource = imageData.images[randomNumber].source;
    }

    // Returns a random number between min (inclusive) and max (exclusive)
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

import { Component, OnInit } from "@angular/core";
import { DataContextComponent, DataContext } from "progress-sitefinity-adminapp-sdk/app/api/v1";

// Get a collection with images in base64 format from image-data.json file
const imageData = require("./image-data.json");

@Component({
    template: require("./image.component.html")
})
export class ImageComponent implements OnInit, DataContextComponent {
    context: DataContext;
    // Get dataItem context item from DataContextComponent interface
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

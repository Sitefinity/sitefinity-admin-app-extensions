import { Component, OnInit } from "@angular/core";
import { DataContextComponent } from "./../node_modules/iris/app/api";

// Get a collection with images in base64 format from image-data.json file
const imageData = require("./image-data.json");

@Component({
    template: require("./image.component.html")
})
export class ImageComponent implements OnInit, DataContextComponent {
    // Get dataItem context item from DataContextComponent interface
    public dataItem;
    // Sample height of the image
    private imageHeight = 50;
    private imageSource;

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

import { Component } from "@angular/core";
import { trigger, transition, animate, style } from "@angular/animations";

// declare namespace ng {
//     function probe(element: Element): any;
// }

// const ERROR_LIST_LOAD_INTERVAL = 100;
// const FORM_SELECTOR = "sf-editable-fields form";

@Component({
    templateUrl: "./error-list.component.html",
    styleUrls: [ "./error-list.component.css" ],
    animations: [
        trigger("slideIn", [
          transition(":enter", [
            style({transform: "translateX(100%)"}),
            animate("200ms ease-in", style({transform: "translateX(0%)"}))
          ])
        ])
      ]
})
export class ErrorListComponent {
    // public errorListData: ErrorListDataModel[] = [];
    // private formComponent;

    // ngOnInit() {
    //     const intervalID = window.setInterval(() => {
    //         if (this.getComponent(FORM_SELECTOR)) {
    //             this.initialize();

    //             window.clearInterval(intervalID);
    //         }
    //     }, ERROR_LIST_LOAD_INTERVAL);
    // }

    // onClick(field: any) {
    //     const button = document.querySelector("button[title='Select categories']") as HTMLElement;

    //     button.focus();
    // }

    // private initialize() {
    //     this.formComponent = this.getComponent(FORM_SELECTOR);

    //     setTimeout(() => {
    //         this.subscribeToClick();
    //     }, 1000);
    // }

    // private getComponent(selector: any): any {
    //     if (typeof selector === "string") {
    //         selector = document.querySelector(selector);
    //     }

    //     return ng.probe(selector).componentInstance;
    // }

    // private subscribeToClick() {
    //     const buttonElements = document.querySelectorAll(".sf-button");

    //     [].forEach.call(buttonElements, (btn: HTMLElement) => {
    //         if (btn.innerText.indexOf("Publish") > -1 || btn.innerText.indexOf("Save as Draft") > -1) {
    //             this.getComponent(btn).onClick.subscribe(() => {
    //                 setTimeout(() => {
    //                     this.generateErrorList();
    //                 }, 0);
    //             });
    //         }
    //     });
    // }

    // private generateErrorList() {
    //     this.errorListData = [];

    //     if (!this.formComponent.valid()) {
    //         this.formComponent.wrapperComponents.forEach(wrapperComponent => {
    //             if (wrapperComponent.errorMessages) {
    //                 wrapperComponent.errorMessages.forEach(msg => {
    //                     const errorData: ErrorListDataModel = {
    //                         field: wrapperComponent.fieldModel,
    //                         message: msg
    //                     };

    //                     this.errorListData.push(errorData);
    //                 });
    //             }
    //         });
    //     }
    // }

    // private getFirstFocusableChildren(selector: HTMLElement) {
    //     const focusableChildren = selector.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");

    //     return focusableChildren[0];
    // }
}

// interface ErrorListDataModel {
//     field: any;
//     message: string;
// }

import { NgModule } from "@angular/core";
import { ITEM_HOOKS_PROVIDER } from "./item-hooks-provider";

/**
 * The grid extender module.
 */
@NgModule({
    providers: [
        ITEM_HOOKS_PROVIDER
    ]
})
export class ItemExtenderModule { /* empty */ }

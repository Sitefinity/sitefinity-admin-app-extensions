import { NgModule } from "@angular/core";
import { INSERT_SYMBOL_PROVIDER } from "../insert-symbol/insert-symbol.provider";

/**
 * The toolbar extender module.
 */
@NgModule({
    providers: [
        INSERT_SYMBOL_PROVIDER
    ]
})
export class InsertSymbolModule {
    /* empty */
}

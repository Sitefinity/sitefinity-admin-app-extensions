import { SearchService, EntityData, SEARCH_SERVICE_TOKEN } from "progress-sitefinity-adminapp-sdk/app/api/v1";
import { Injectable, ClassProvider } from "@angular/core";

/**
 * Service responsible for add extensibility for search functionality.
 *
 * @export
 * @interface CustomSearchService
 */
@Injectable()
class CustomSearchService implements SearchService {
    /**
     * Gets the fields names which will be used when a searche is performed in the list.
     *
     * @param {EntityData} entityData Metadata for the content type of current list view.
     * @returns {string[]} Collection of field names which will be used when a searche is performed.
     * @memberof CustomSearchService
     */
    getListSearchFields(entityData: EntityData): string[] {
        return entityData.metadata.setName === "newsitems" ? ["Content"] : [];
    }
}

export const CUSTOM_SEARCH_TOKEN: ClassProvider = {
    provide: SEARCH_SERVICE_TOKEN,
    useClass: CustomSearchService,
    multi: true
};

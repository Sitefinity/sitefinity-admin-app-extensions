
import { TextAnalysisToolbarExtenderModule } from "./text-analysis";
// import { ItemExtenderModule } from "./item-extender";
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldsChangeModule } from "./fields-change";

declare var sitefinityExtensionsStore: SitefinityExtensionStore;

sitefinityExtensionsStore.addExtensionModule(TextAnalysisToolbarExtenderModule);
sitefinityExtensionsStore.addExtensionModule(FieldsChangeModule);

import { GridExtenderModule } from "./grid-extender";
import { CommandsExtenderModule } from "./commands-extender";
import { EditorExtenderModule } from "./editor-extender";
import { ItemExtenderModule } from "./item-extender";
import { ThemeModule } from "./theme";
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldsChangeModule } from "./fields-change";
import { RelatedDateExtenderModule } from "./tree/related-data";
import { SystemNotificationsIconsExtenderModule } from "./custom-system-notifications-icons";
import { LibraryExtenderModule } from "./library-extender";
// import { WidgetEditorExtenderModule } from "./widget-editor";
import { CustomFieldsModule } from "./custom-fields";

import "@angular/compiler";

declare var sitefinityExtensionsStore: SitefinityExtensionStore;

sitefinityExtensionsStore.addExtensionModule(GridExtenderModule);
sitefinityExtensionsStore.addExtensionModule(CommandsExtenderModule);
sitefinityExtensionsStore.addExtensionModule(EditorExtenderModule);
sitefinityExtensionsStore.addExtensionModule(ItemExtenderModule);
sitefinityExtensionsStore.addExtensionModule(ThemeModule);
sitefinityExtensionsStore.addExtensionModule(FieldsChangeModule);
sitefinityExtensionsStore.addExtensionModule(RelatedDateExtenderModule);
sitefinityExtensionsStore.addExtensionModule(SystemNotificationsIconsExtenderModule);
sitefinityExtensionsStore.addExtensionModule(LibraryExtenderModule);
// sitefinityExtensionsStore.addExtensionModule(WidgetEditorExtenderModule);
sitefinityExtensionsStore.addExtensionModule(CustomFieldsModule);

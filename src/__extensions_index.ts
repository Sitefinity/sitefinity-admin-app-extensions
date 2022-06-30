import { GridExtenderModule } from "./grid-extender";
import { CustomFieldsModule } from "./custom-fields";
import { CommandsExtenderModule } from "./commands-extender";
import { EditorExtenderModule } from "./editor-extender";
import { ItemExtenderModule } from "./item-extender";
import { ThemeModule } from "./theme";
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldsChangeModule } from "./fields-change";
import { WidgetEditorExtenderModule } from "./widget-editor";
import { RelatedDateExtenderModule } from "./tree/related-data";
import { SystemNotificationsIconsExtenderModule } from "./custom-system-notifications-icons";
import { LibraryExtenderModule } from "./library-extender";

declare const sitefinityExtensionsStore: SitefinityExtensionStore;

sitefinityExtensionsStore.addExtensionModule(GridExtenderModule);
sitefinityExtensionsStore.addExtensionModule(CustomFieldsModule);
sitefinityExtensionsStore.addExtensionModule(CommandsExtenderModule);
sitefinityExtensionsStore.addExtensionModule(EditorExtenderModule);
sitefinityExtensionsStore.addExtensionModule(ItemExtenderModule);
sitefinityExtensionsStore.addExtensionModule(ThemeModule);
sitefinityExtensionsStore.addExtensionModule(FieldsChangeModule);
sitefinityExtensionsStore.addExtensionModule(WidgetEditorExtenderModule);
sitefinityExtensionsStore.addExtensionModule(RelatedDateExtenderModule);
sitefinityExtensionsStore.addExtensionModule(SystemNotificationsIconsExtenderModule);
sitefinityExtensionsStore.addExtensionModule(LibraryExtenderModule);

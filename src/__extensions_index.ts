import { GridExtenderModule } from "../samples/grid-extender";
import { CustomFieldsModule } from "../samples/custom-fields";
import { CommandsExtenderModule } from "../samples/commands-extender";
import { EditorExtenderModule } from "../samples/editor-extender";
import { ItemExtenderModule } from "../samples/item-extender";
import { ThemeModule } from "../samples/theme";
import { SitefinityExtensionStore } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
import { FieldsChangeModule } from "../samples/fields-change";
import { WidgetEditorExtenderModule } from "../samples/widget-editor";
import { RelatedDateExtenderModule } from "../samples/tree/related-data";
import { SystemNotificationsIconsExtenderModule } from "../samples/custom-system-notifications-icons";
import { LibraryExtenderModule } from "../samples/library-extender";

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

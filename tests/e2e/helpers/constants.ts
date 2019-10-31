import { protractor, browser } from "protractor";

export const ACTIVATE_DYNAMIC_MODULE_SERVICE_URL = "/sf/system/content-types-service/activate/";

export const BASE_URL = "http://localhost:3000/adminapp/";

export const NEWS_TYPE_NAME = "newsitems";
export const PAGES_TYPE_NAME = "pages";

export const CONFIG_PAGE_URL = `${BASE_URL}config`;
export const CONTENT_PAGE_URL = `${BASE_URL}content/`;
export const CONTENT_BLOGS_PAGE_URL = `${BASE_URL}content/blogs`;
export const CONTENT_NEWS_URL = `${BASE_URL}content/newsitems`;
export const PAGES_URL = `${BASE_URL}pages`;
export const THEME_URL = `${BASE_URL}theme`;

export const EC = protractor.ExpectedConditions;
export const URL_IN_CONFIG_FILE = browser.params.sfUrl;
export const USERNAME = browser.params.login.username;
export const PASSWORD = browser.params.login.password;

export const DEFAULT_ITEMS_NUMBER = 20;
export const DEFAULT_SERVICE_URL = "sf/system/";
export const DELETE_DYNAMIC_MODULE_SERVICE_URL_PREFIX = "/sf/system/content-types-service/";
export const DELETE_DYNAMIC_MODULE_SERVICE_URL_SUFFIX = "/?deleteData=true";

export const INSTANTIATE_DYNAMIC_MODULE_SERVICE_URL = "/sf/system/content-types-service/00000000-0000-0000-0000-000000000000/";

export const LOGIN_PAGE_URL = `${BASE_URL}Sitefinity/Authenticate/OpenID/login`;

export const IMAGE_LIBRARIES_URL = "/sf/system/albums";
export const VIDEO_LIBRARIES_URL = "/sf/system/videolibraries";
export const DOCUMENT_LIBRARIES_URL = "/sf/system/documentlibraries";

export const FOLDERS_URL = "/sf/system/folders";
export const IMAGES_URL = "/sf/system/images";
export const DOCUMENTS_URL = "/sf/system/documents";

export const STATUSES = Object.freeze(
    {
        PUBLISHED: "Published",
        DRAFT: "Draft",
        UNPUBLISHED: "Unpublished",
        DRAFT_NEWER: "Draft, newer than published"
    }
);

export const TABLE_HEADERS_CONSTANTS = Object.freeze(
    {
        LAST_MODIFIED: "Last Modified",
        ANALYTICS: "Analytics",
        DATE_CREATED: "Created on",
        TITLE: "Title",
        ACTIONS: "Actions",
        PUBLICATION_DATE: "Publication Date",
        CHILD_CONTENT: "Create",
        CONTAINS: "Contains",
        TRANSLATIONS: "Translations"
    }
);

export const MULTILINGUAL = Object.freeze(
    {
        SITE_LANGUAGE_COUNT: 7,
        DEFAULT_LANGUAGE: "English",
        sharedFieldsLocators: [".-sf-choice", ".-sf-multiple-choice", ".-sf-number", ".-sf-taxa", ".-sf-media"]
    }
);

export const LONG_TEXT_FIELD = "this is my long text field";
// the apostrophe is check for #245777, This test should be moved to SDK
export const TAG_NAME = `customtag'`;
export const ADDITIONAL_URL = "secondUrl";

export const TIME_TO_WAIT = 15000;

export const SEVERE_LOG_LEVEL = "SEVERE";
export const TIMEOUT = 2 * 60 * 1000; // 2 minutes
export const NEW_LINE = "\n";

export const stringConstants = {
    EMPTY_STRING: "",
    INTERVAL: " ",
    DASH: "-",
    URLS: "Urls",
    TYPE_UNDEFINED: "undefined",
    FORWARD_SLASH: "/",
    DEFAULT_GUID: "00000000-0000-0000-0000-000000000000"
};

export const DATE_FORMAT = "MMMM_Do_YYYY_h_mm_ss_a";
export const TODAY_PUBLICATION_DATE = "Today";

export const MOVE_TO_RECYCLE_BIN_BUTTON_TEXT = "Move to Recycle Bin";
export const FILES: string[] = ["../setup/images/boat.jpg", "../setup/images/boat2.jpg"];
export const DOCUMENT_TITLE_RENAMED = "document";
export const CHANGED_FILE_TYPE = ".pdf";
export const ORIGINAL_FILE_TYPE = ".jpg";

export const LIBRARY_NAME = "Library1";
export const CHILD_LIBRARY_NAME = "folder1";

export const DYNAMIC_ITEM_HEADERS = [TABLE_HEADERS_CONSTANTS.TITLE, TABLE_HEADERS_CONSTANTS.TRANSLATIONS, TABLE_HEADERS_CONSTANTS.LAST_MODIFIED, TABLE_HEADERS_CONSTANTS.DATE_CREATED, TABLE_HEADERS_CONSTANTS.ACTIONS];
export const HIERARCHICAL_ITEM_HEADERS = [TABLE_HEADERS_CONSTANTS.TITLE, TABLE_HEADERS_CONSTANTS.CONTAINS, TABLE_HEADERS_CONSTANTS.TRANSLATIONS, TABLE_HEADERS_CONSTANTS.CHILD_CONTENT, TABLE_HEADERS_CONSTANTS.ACTIONS];

// Library Types
export const VIDEO_LIBRARIES = "videolibraries";
export const IMAGE_LIBRARIES = "albums";
export const DOCUMENT_LIBRARIES = "documentlibraries";

// Sample content
export const SAMPLE_TEXT_CONTENT = "1 2 3 4 5";

export const FIRST_WORD_WITH_ERROR = "wirh"; // with
export const SECOND_WORD_WITH_ERROR = "erors"; // errors
export const SAMPLE_TEXT_WITH_SPELL_CHECK_SUGGESTIONS = "<p>Some text <span suggestion='with' data-sf-ec-immutable='' custom-edit-menu=''>wirh</span> <span suggestion='errors' data-sf-ec-immutable='' custom-edit-menu=''>erors</span></p>";
export const SAMPLE_TEXT_AFTER_SPELL_CHECK_CORRECTIONS = "Some text with erors";

export const TITLE_ERROR = "Invalid email !";
export const TITLE_VALID_TEXT = "user@test.test";

export const ITEM_CONTENT_BEGINNING = "Hello everyone,";

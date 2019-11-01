/* tslint:disable:no-console */

import AuthenticationManager from "../helpers/authentication-manager";
import SitefinitySdk from "../helpers/sitefinitySdk";
import { Request } from "../helpers/request";
import { URL_IN_CONFIG_FILE, DELETE_DYNAMIC_MODULE_SERVICE_URL_PREFIX, ACTIVATE_DYNAMIC_MODULE_SERVICE_URL, DELETE_DYNAMIC_MODULE_SERVICE_URL_SUFFIX, USERNAME, PASSWORD, stringConstants } from "../helpers/constants";

let requestHeaders: Object;

function getRequestHeaders() {
    if (!requestHeaders) {
        requestHeaders = AuthenticationManager.getInstance().getRequestHeaders();
    }
    return requestHeaders;
}

//#region Set up Dynamic Module
async function initiateDynamicModule(module: any, parentModuleId: string = stringConstants.DEFAULT_GUID) {
    let moduleId: string;
    await AuthenticationManager.getInstance().authenticate(USERNAME, PASSWORD);
    moduleId = await createDynamicModule(JSON.stringify(module), parentModuleId);
    await activateDynamicModule(moduleId);
    return moduleId;
}

async function createDynamicModule(dynamicModule: string, parentModuleId: string) {
    const method = "PUT";
    const url = URL_IN_CONFIG_FILE + DELETE_DYNAMIC_MODULE_SERVICE_URL_PREFIX + parentModuleId + "/";
    const trimurl = url.replace(/['"]+/g, "");
    const request = new Request(method, trimurl, getRequestHeaders(), dynamicModule);

    try {
        const response: XMLHttpRequest = await request.execute();
        return JSON.stringify(JSON.parse(response.responseText).ModuleId);
    } catch (error) {
        error = error as XMLHttpRequest;
        throw new Error("Module creation request rejected: " + error.responseText);
    }
}

async function activateDynamicModule(moduleId: string) {
    const method = "POST";
    const url = URL_IN_CONFIG_FILE + ACTIVATE_DYNAMIC_MODULE_SERVICE_URL;
    const request = new Request(method, url, getRequestHeaders(), moduleId);

    try {
        await request.execute();
    } catch (response) {
        response = response as XMLHttpRequest;
        throw new Error("Module activation request rejected: " + response.responseText);
    }
}
//#endregion

//#region Delete Dynamic Module
async function deleteDynamicModule(moduleId: string) {
    await AuthenticationManager.getInstance().authenticate(USERNAME, PASSWORD);
    await deleteDynamicModuleInternal(moduleId);
}

async function deleteDynamicModuleInternal(moduleId: string) {
    const method = "DELETE";
    const url = URL_IN_CONFIG_FILE + DELETE_DYNAMIC_MODULE_SERVICE_URL_PREFIX + moduleId.replace(/"/g, "") + DELETE_DYNAMIC_MODULE_SERVICE_URL_SUFFIX;
    const request = new Request(method, url, getRequestHeaders());

    try {
        await request.execute();
    } catch (response) {
        response = response as XMLHttpRequest;
        throw new Error("Module deletion request rejected: " + response.responseText);
    }
}
//#endregion

async function getContentTypeId(moduleId: string) {
    await AuthenticationManager.getInstance().authenticate(USERNAME, PASSWORD);
    return await getContentTypeIdInternal(moduleId);
}

async function getContentTypeIdInternal(moduleId: string) {
    const method = "GET";
    const url = URL_IN_CONFIG_FILE + DELETE_DYNAMIC_MODULE_SERVICE_URL_PREFIX + moduleId.replace(/['"]+/g, "") + "/";
    const request = new Request(method, url, getRequestHeaders());

    try {
        const response = await request.execute();
        return JSON.stringify(JSON.parse(response.responseText).ContentTypeId);
    } catch (response) {
        response = response as XMLHttpRequest;
        throw new Error("Content type id request rejected: " + response.responseText);
    }
}

/**
 * Method for instantiating item of dynamic module
 *
 * @param {*} dynamicItem - object for constructing dynamic item
 * @returns {Promise<string>} - on resolution, the promise resolves with the generated dynamic item's
 * data as a string, on rejection it rejects with the reason
 */
function createDynamicModuleItem(dynamicItem: any): Promise<string> {
    const item = SitefinitySdk.getInstance().data(
        {
            urlName: dynamicItem.typeName,
            providerName: null,
            cultureName: null
        }
    );
    const promiseExecutor = (resolve, reject) => {
        item.create({
            data: dynamicItem.data,
            successCb:
                (dynamicItem) => {
                    resolve(dynamicItem);
                },
            failureCb:
                (error) => {
                    reject(`"Failure at creating dynamic module item:" ${JSON.stringify(error)}`);
                }
        });
    };

    return new Promise(promiseExecutor);
}

/**
 * Method for instantiating multiple dynamic module items via batch operation
 *
 * @param {Array<Object>} dynamicItems - containing objects with typeName and data fields
 * @param {string} [operation] - optional parameter for setting operation action upon transaction (ex. "Publish", "Unpublish" ...)
 * @returns {Promise<any>} - when resolved, the promise returns array, containing objects, representing the created
 * dynamic module items for further manipulation by the spec; promise gets rejected when a single transaction fails
 */
function createDynamicModuleItems(dynamicItems: Array<Object>, workflowStatus?: string): Promise<string> {
    const promiseExecutor = (resolve, reject) => {
        const batch = SitefinitySdk.getInstance().batch(
            result => {
                if (result.isSuccessful) {
                    const compressedResponse = result.data.map((dynamicItem) => {
                        return dynamicItem.data;
                    });

                    resolve(compressedResponse);
                } else {
                    reject(`"There s a failing dynamic item transaction(s):", ${JSON.stringify(result.data[0])}`);
                }
            },
            error => {
                reject(`Dynamic items batch operation failed with: ${error}`);
            });

        const transaction = batch.beginTransaction();

        dynamicItems.forEach((dynamicItem: any) => {
            const itemID = transaction.create({
                entitySet: dynamicItem.typeName,
                data: dynamicItem.data
            });

            if (workflowStatus) {
                transaction.operation({
                    entitySet: dynamicItem.typeName,
                    key: itemID,
                    data: {
                        action: workflowStatus
                    }
                });
            }
        });

        batch.endTransaction(transaction);
        batch.execute();
    };

    return new Promise(promiseExecutor);
}

export default {
    initiateDynamicModule,
    deleteDynamicModule,
    getContentTypeId,
    createDynamicModuleItem,
    createDynamicModuleItems
};

export function setTypeNamePlural(dynamicModuleName: string) {
    let typeName;

    if (dynamicModuleName.endsWith("x")) {
        typeName = dynamicModuleName + "es";
    } else if (dynamicModuleName.endsWith("s")) {
        typeName = dynamicModuleName;
    } else {
        typeName = dynamicModuleName + "s";
    }

    return typeName;
}

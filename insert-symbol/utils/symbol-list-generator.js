/**
 * A simple script to fetch and generate a symbols json array to be used to populate the symbol-list-component.
 */
const fs = require("fs");
const https = require("https");
const { JSDOM } = require("jsdom");

/**
 * Makes a request to a site that returns a table with the most commonly used symbols to be parsed.
 */
function getTable() {
    https.get("https://dev.w3.org/html5/html-author/charref", (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
          });
         
          // we get the response, parse it and write it
          response.on('end', () => {
            let parsed = parseTable(data);
            fs.writeFileSync("../symbol-list/symbol-list.json", JSON.stringify(parsed), "utf-8");
          });
         
    });
}

/**
 * 
 * @param {string} table The html that contains the table to be parsed.
 * @returns {[]} Array of the parsed models.
 */
function parseTable(table) {
    const { document } = (new JSDOM(table)).window;
    const childrenNodes = document.querySelector("table tbody").childNodes;
    
    const models = [];

    for(let i = 0; i < childrenNodes.length; i++) {
        const cell = childrenNodes[i];
        const model = {
            name: cell.querySelector("td.character").innerHTML.trim(),
            value: cell.querySelector("td.character").innerHTML.trim(),
            escapedValue: cell.querySelector("td.named code").innerHTML.trim(),
            tooltip: cell.querySelector("td.desc").innerHTML.trim()
        };
        models.push(model);
    }
    
    return models;
}

getTable();
import jsonParser from "./lib/jsonParser";
import { verifyFiles } from "./lib/utils";
import { consoleConstants } from "./lib/constants";
import fs from "fs";
function verifyJson(text, maxDepth = 19) {
    try {
        if (typeof text !== "string")
            text = JSON.stringify(text);
        const result = jsonParser(text, maxDepth);
        return result;
    } catch (e) {
        return e;
    }
}

function verifyJsonFromPath(dirPath, maxDepth = 19, logging = consoleConstants.no) {
    const dirType = fs.lstatSync(dirPath).isFile();
    if (dirType) {
        try {
            const result = verifyFiles(dirPath, dirType, maxDepth, logging, false);

            if (result.error) {
                return {
                    file: result.fileName,
                    result: result.error
                }
            }
            else {
                return {
                    file: result.fileName,
                    result: result.data
                }
            }

        } catch (e) {
            return e;
        }
    }
    else {
        try {
            const results = verifyFiles(dirPath, dirType, maxDepth, logging, false);
            return _generateResults(results);
        } catch (e) {
            return e;
        }
    }
}

function _generateResults(results) {
    let generatedResults = [];
    results.forEach(result => {
        if (result.error) {
            generatedResults.push({
                file: result.fileName,
                result: result.error
            })
        }
        else {
            generatedResults.push({
                file: result.fileName,
                result: result.data
            })
        }
    });

    return generatedResults;
}

export { verifyJson, verifyJsonFromPath };



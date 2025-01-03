const constants = {
    consoleConstants: {
        loggingFlagsN: ["N", "n"],
        loggingFlagsY: ["Y", "y"],
        lineBreak: "---------------------------------",
        logMessage: "Logging was disabled for this verification, please re-run it without any flag to log the results"
    },
    parsingConstants: {
        numbers: '0123456789',
        symbols: '{}[]:,',
        keywords: ['true', 'false', 'null'],
        indentation: " \r\n\t",
        illegalEscapeChar: 'x0\n ',
        escapeMap: { b: "\b", t: "\t", f: "\f", r: "\r", n: "\n" }
    },
    errorConstants: {
        "e000": {
            message: "Too Deep JSON.",
            description: "The JSON structure exceeds the allowed depth limit.",
            errorType: "StructureError",
            remediation: "Ensure that your JSON structure is within the maximum depth supported."
        },
        "e001": {
            message: "Invalid tab/new line character found in string.",
            description: "Strings in JSON cannot contain unescaped tab or newline characters.",
            errorType: "StringError",
            remediation: "Escape tab and newline characters using '\\t' and '\\n'."
        },
        "e002": {
            message: "Illegal escape character in string.",
            description: "An escape sequence in the string is invalid.",
            errorType: "StringError",
            remediation: "Use valid escape sequences such as '\\n', '\\t', etc."
        },
        "e003": {
            message: "Unexpected end of string.",
            description: "A string was not closed properly.",
            errorType: "StringError",
            remediation: "Ensure all strings are enclosed in double quotes and properly terminated."
        },
        "e004": {
            message: "Invalid use of single quotes in JSON/Array object.",
            description: "JSON strings must use double quotes.",
            errorType: "StringError",
            remediation: "Replace single quotes with double quotes."
        },
        "e005": {
            message: "Numbers cannot have leading zeroes.",
            description: "JSON does not support leading zeroes in numbers (e.g., 01, 002).",
            errorType: "NumberError",
            remediation: "Remove leading zeroes from numbers."
        },
        "e006": {
            message: "Invalid number format.",
            description: "The number format does not comply with JSON standards.",
            errorType: "NumberError",
            remediation: "Ensure numbers are properly formatted as per JSON specifications."
        },
        "e007": {
            message: "Invalid keyword/character.",
            description: "An unexpected keyword or character was encountered.",
            errorType: "SyntaxError",
            remediation: "Ensure the JSON structure only uses valid keywords and characters."
        },
        "e008": {
            message: "Unexpected Character.",
            description: "A character not allowed in JSON was found.",
            errorType: "SyntaxError",
            remediation: "Remove or replace the invalid character."
        },
        "e009": {
            message: "Unexpected tokens found after end of value.",
            description: "Extraneous tokens were found after the end of a valid JSON value.",
            errorType: "SyntaxError",
            remediation: "Ensure no extra characters or tokens follow a complete JSON value."
        },
        "e010": {
            message: "Expected top-level object or array.",
            description: "JSON should begin with either an object ('{}') or an array ('[]').",
            errorType: "StructureError",
            remediation: "Wrap your JSON data in an object or an array."
        },
        "e011": {
            message: "Unexpected end of JSON.",
            description: "The JSON input ended prematurely.",
            errorType: "StructureError",
            remediation: "Ensure all opening braces, brackets, and quotes are properly closed."
        },
        "e012": {
            message: "Unexpected token found.",
            description: "A token was encountered that does not fit the expected JSON structure.",
            errorType: "StructureError",
            remediation: `Check the JSON structure and remove or replace the unexpected token.\nEnsure all keys, values, and delimiters follow proper JSON syntax.`
        },
        "e013": {
            message: "Unexpected token found.",
            description: "A token was encountered that does not fit the expected JSON structure.",
            errorType: "StructureError",
            remediation: "Check the JSON structure and remove or replace the unexpected token.",
            tags: ["syntax", "critical", "json", "unexpected"]
        },
        "e014": {
            message: "Semicolon expected.",
            description: "A semicolon is missing where one is expected in the JSON structure.",
            errorType: "ObjectError",
            remediation: "Ensure that all key-value pairs in objects and elements in arrays are properly separated by commas."
        },
        "e015": {
            message: "Unexpected trailing comma in JSON object.",
            description: "A trailing comma was found in a JSON object.",
            errorType: "ObjectError",
            remediation: "Remove the trailing comma from the JSON object."
        },
        "e016": {
            message: "Expected comma or \"}\" at closing of JSON object.",
            description: "A JSON object is not closed properly.",
            errorType: "ObjectError",
            remediation: "Ensure objects are closed with a comma or a closing brace ('}')."
        },
        "e017": {
            message: "Unexpected end of array values.",
            description: "The array ended without a proper closing bracket.",
            errorType: "ArrayError",
            remediation: "Ensure arrays are properly closed with a ']'."
        },
        "e018": {
            message: "Unexpected end of array tokens.",
            description: "An array contains incomplete data or tokens.",
            errorType: "ArrayError",
            remediation: "Complete the array with valid JSON values."
        },
        "e019": {
            message: "Unexpected trailing comma in Array.",
            description: "A trailing comma was found in a JSON array.",
            errorType: "ArrayError",
            remediation: "Remove the trailing comma from the JSON array."
        },
        "e020": {
            message: "Expected comma or \"]\".",
            description: "An array value is not properly separated or closed.",
            errorType: "error",
            remediation: "Ensure values in the array are separated by commas or the array is properly closed."
        },
    },
}

constants.parsingConstants['numberTokens'] = constants.parsingConstants.numbers + '.eE-+';

export const {
    consoleConstants,
    parsingConstants,
    errorConstants
} = constants;
import { parsingConstants, errorConstants } from "./constants.js";

let isEndOfTokens = false;
let maxDepth = 19;
let delimeterInString = false;
class JsonParser {

    constructor(text) {
        this.text = text;
        this.index = 0;
        this.line = 1;
        this.column = 1;
        this.tabWidth = 4;
        this.lines = text.split("\n"); //pre splitting the line when initialising
    }

    updatePosition(char) {
        if (char === '\n') {
            this.line++;
            this.column = 1;
        }
        else if (char === '\t') {
            this.column += this.column - ((this.column - 1) % this.tabWidth);
        }
        else {
            this.column++;
        }
    }

    errorReporter(eCode, token) {

        const errorLine = this.lines[this.line - 1].trim() || ""; // Get the line with the error

        let indexOfInvalidToken = errorLine.lastIndexOf(token) < 0 ? 0 : errorLine.lastIndexOf(token);
        if (eCode === "e010")
            indexOfInvalidToken = 0;
        if (eCode === "e001" || eCode === "e002" || eCode === "e004")
            indexOfInvalidToken = errorLine.indexOf(token) < 0 ? 0 : errorLine.indexOf(token);
        if (eCode === "e003" || eCode === "e011" || eCode === "e013" || eCode === "e017" || eCode === "e018")
            indexOfInvalidToken = errorLine.length;

        const spaceFormula = this.column.length - token?.length - 1 > indexOfInvalidToken ?
            (this.column.length - token?.length) : indexOfInvalidToken;

        const marker = " ".repeat(spaceFormula) + "^";
        const error = errorConstants[eCode];
        const errorDescription = `${error.errorType}: ${error.message}\n${error.remediation}`
        // Construct detailed error message
        const errorContext = `Error at line ${this.line}:\n${errorLine}\n${marker}\n${errorDescription}`
        throw new Error(errorContext);
    }

    nextToken() {
        while (this.index < this.text.length) {
            isEndOfTokens = false;
            const char = this.text[this.index];

            this.updatePosition(char);

            if (parsingConstants.indentation.includes(char)) { //for space, \n, \t, etc in the string
                this.index++;
                continue;
            }

            if (parsingConstants.symbols.includes(char)) {
                this.index++;
                return char;
            }
            // if(this.line === 7206)
            //     debugger;

            if (char === '"') { //for checking strings
                let token = "";
                while (this.text[++this.index] != '"' && this.index < this.text.length) {
                    this.updatePosition(this.text[this.index]);
                    if (this.text[this.index] === "\n" || this.text[this.index] === "\t") {
                        isEndOfTokens = true;

                        this.errorReporter("e001", this.text[this.index]);
                    }

                    //unicode escape characters
                    if (this.text[this.index] === "\\") {
                        this.updatePosition(this.text[this.index]);
                        this.index++;
                        if (parsingConstants.illegalEscapeChar.includes(this.text[this.index])) {
                            const a = this.text[this.index - 1];
                            isEndOfTokens = true;

                            this.errorReporter("e002", a);
                        }

                        //creating unicode characters from string tokens
                        if (this.text[this.index] === "u") {
                            let uniChar = "";
                            for (let i = 0; i < 4; i++) {
                                uniChar += this.text[++this.index];
                            }
                            token += String.fromCharCode(parseInt(uniChar, 16));
                            continue;
                        }
                        // handle special escape characters
                        if (parsingConstants.escapeMap[this.text[this.index]]) {
                            token += parsingConstants.escapeMap[this.text[this.index]];
                            continue;
                        }
                    }
                    
                    token += this.text[this.index]; //rest of the characters
                }
                //if we hit the end of the string without a closing quote
                if (this.text[this.index] !== '"') {
                    isEndOfTokens = true;
                    this.errorReporter("e003", token);
                }
                this.index++;
                delimeterInString = token.length === 1 && parsingConstants.symbols.includes(token) ? true : false;
                return delimeterInString ? `"${token}"` : token;
            }

            if (char === "'") { //for {'key'...}
                isEndOfTokens = true;
                this.errorReporter("e004", char);
            }

            //parsing numbers
            if (parsingConstants.numberTokens.includes(char) || char === "-") {
                //leading zeroes not allowed
                if (this.text[this.index] === '0' && parsingConstants.numbers.includes(this.text[this.index + 1])) {
                    isEndOfTokens = true;
                    this.errorReporter("e005", this.text[this.index]);
                }

                let numStr = this.text[this.index];

                while (parsingConstants.numberTokens.includes(this.text[++this.index])) {
                    this.updatePosition(this.text[this.index]);
                    numStr += this.text[this.index];
                }

                const parsedNumber = Number(numStr);

                if (isNaN(parsedNumber)) {
                    isEndOfTokens = true;
                    this.errorReporter("e006", numStr.toString());
                }

                return parsedNumber
            }

            //boolean and null strings and values,
            if (/[a-zA-Z]/.test(char)) {
                let alphaToken = char;
                while (/[a-zA-Z]/.test(this.text[++this.index])) {
                    this.updatePosition(this.text[this.index]);
                    alphaToken += this.text[this.index];
                }

                if (!parsingConstants.keywords.includes(alphaToken)) {
                    isEndOfTokens = true;
                    this.errorReporter("e007", alphaToken);
                }

                return alphaToken === parsingConstants.keywords[0] ? true : alphaToken === parsingConstants.keywords[1] ? false : null;
            }
            isEndOfTokens = true;
            this.errorReporter("e008")
            throw new Error(`Unexpected Character: ${char} at line ${this.line}, column ${this.column}`);
        }
        isEndOfTokens = true;
        return null;
    }

}


const parseJsonObject = (tokenizer, depth) => {

    const object = {};
    if (depth > maxDepth) {
        isEndOfTokens = true;
        tokenizer.errorReporter("e000");
    }

    let nextToken = tokenizer.nextToken();

    while (nextToken !== "}") {
        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            tokenizer.errorReporter("e011");

        }

        const upcomingToken = tokenizer.nextToken();

        if (upcomingToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            tokenizer.errorReporter("e013");
        }

        if (upcomingToken !== ":") {
            tokenizer.errorReporter("e014", `${upcomingToken}`);
        }

        object[nextToken] = parseTokens(tokenizer, depth);

        const endToken = tokenizer.nextToken();

        if (endToken === '}') break;
        if (endToken === ',') {
            nextToken = tokenizer.nextToken();
            if (nextToken === "}") {
                tokenizer.errorReporter("e015", nextToken);
            }
            continue;
        }
        isEndOfTokens = true;
        tokenizer.errorReporter("e016");
    }

    return object;
}

const parseJsonArray = (tokenizer, depth) => {
    if (depth > maxDepth) {
        isEndOfTokens = true;
        tokenizer.errorReporter("e000");
    }

    const values = [];
    let nextToken = tokenizer.nextToken();

    while (nextToken !== ']') {
        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            tokenizer.errorReporter("e017");
        }
        values.push(parseTokens(tokenizer, depth, nextToken));

        nextToken = tokenizer.nextToken();

        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            tokenizer.errorReporter("e018");
        }
        if (nextToken === ']') break;
        if (nextToken === ',') {
            nextToken = tokenizer.nextToken();
            if (nextToken === ']') {
                tokenizer.errorReporter("e019", nextToken);
            }
            continue;
        }
        isEndOfTokens = true;
        tokenizer.errorReporter("e020", nextToken);
    }
    return values;
}

const parseTokens = (tokenizer, depth, token) => {
    if (depth > maxDepth) {
        tokenizer.errorReporter("e000");
    }

    //making sure that the token value is null and it should be assigned to nextToken otherwise it will throw error in below conditions
    const nextToken = token === undefined ? tokenizer.nextToken() : token;

    if (nextToken === null && isEndOfTokens) {
        isEndOfTokens = true;
        tokenizer.errorReporter("e011");
    }

    // console.log(nextToken)
    if (nextToken === '{') return parseJsonObject(tokenizer, depth + 1);
    if (nextToken === '[') return parseJsonArray(tokenizer, depth + 1);
    if (!delimeterInString && parsingConstants.symbols.includes(nextToken) && nextToken !== '') { //&& nextToken !== '}'
        delimeterInString = false
        isEndOfTokens = true;
        tokenizer.errorReporter("e012", nextToken);
    }
    return delimeterInString ? nextToken[1] : nextToken;
}

function jsonParser(text, depth) {
    maxDepth = depth;
    const tokenizer = new JsonParser(text);
    const value = parseTokens(tokenizer, 0);

    const extraTokens = tokenizer.nextToken();

    // Ensure there are no unexpected tokens after the JSON data
    if (extraTokens !== null) {
        isEndOfTokens = false;
        tokenizer.errorReporter("e009", extraTokens);
    }

    if (!value || (typeof value !== "object" && !Array.isArray(value))) {
        tokenizer.errorReporter("e010", value);
    }

    return value;
}

export default jsonParser;
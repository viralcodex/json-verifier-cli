
const maxDepth = 19;

const numbers = '0123456789';
const numberTokens = numbers + '.eE-+';
const symbols = '{}[]:,';
const keywords = ['true', 'false', 'null'];
const indentation = " \r\n\t";
const illegalEscapeChar = 'x0\n ';
let isEndOfTokens = false;

class JsonParser {

    constructor(text) {
        this.text = text;
        this.index = 0;
    }

    nextToken() {
        while (this.index < this.text.length) {
            isEndOfTokens = false;
            const char = this.text[this.index];

            if (indentation.includes(char)) { //for space, \n, \t, etc in the string
                this.index++;
                continue;
            }

            if (symbols.includes(char)) {
                this.index++;
                return char;
            }

            if (this.text[this.index] === '"') { //for checking strings
                let token = "";
                while (this.text[++this.index] != '"') {
                    if (this.text[this.index] === "\n" || this.text[this.index] === "\t") {
                        isEndOfTokens = true;
                        throw new Error(`Cannot have a tab or new line inside a string`);
                    }

                    //unicode escape characters
                    if (this.text[this.index] === "\\") {
                        this.index++;
                        if (illegalEscapeChar.includes(this.text[this.index])) {
                            const a = this.text[this.index];
                            isEndOfTokens = true;
                            throw new Error(`Illegal escape character in string`);
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
                        if (this.text[this.index] === 'b') {
                            token += "\b"; continue;
                        } else if (this.text[this.index] === 't') {
                            token += "\t"; continue;
                        } else if (this.text[this.index] === 'f') {
                            token += "\f"; continue;
                        } else if (this.text[this.index] === 'r') {
                            token += "\r"; continue;
                        } else if (this.text[this.index] === 'n') {
                            token += "\n"; continue;
                        }
                    }

                    token += this.text[this.index]; //rest of the characters
                }

                if (this.text[this.index] !== '"') {
                    isEndOfTokens = true;
                    // e.g. if we hit the end of the string without a closing quote
                    throw new Error(`Unexpected end of string`);
                }
                this.index++;
                return token;
            }

            if (char === "'") {
                isEndOfTokens = true;
                throw new Error("Invalid use of single quotes in JSON. Use double quotes instead.");
            }

            //numbers
            if (numberTokens.includes(char) || char === "-") {
                //leading zeroes not allowed
                if (this.text[this.index] === '0' && numbers.includes(this.text[this.index + 1])) {
                    isEndOfTokens = true;
                    throw new Error('Numbers cannot have leading zeroes');
                }
                let numStr = this.text[this.index];
                while (numberTokens.includes(this.text[++this.index])) {
                    numStr += this.text[this.index];
                }
                numStr = Number(numStr);
                if (isNaN(numStr)) {
                    isEndOfTokens = true;
                    throw new Error('Invalid number format');
                }
                return numStr
            }

            //boolean and null strings and values
            if (/[a-zA-Z]/.test(char)) {
                let alphaToken = char;
                while (/[a-zA-Z]/.test(this.text[++this.index])) {
                    alphaToken += this.text[this.index];
                }

                if (!keywords.includes(alphaToken)) {
                    isEndOfTokens = true;
                    throw new Error(`Invalid keyword/character: ${alphaToken}`);
                }

                return alphaToken === keywords[0] ? true : alphaToken === keywords[1] ? false : null;
            }
            isEndOfTokens = true;
            throw new Error(`Unexpected Character: ${char}`);
        }

        isEndOfTokens = true;
        return null;
    }

}

export default function jsonParser(text) {
    const tokenizer = new JsonParser(text);
    const value = parseTokens(tokenizer, 0);

    const extraTokens = tokenizer.nextToken();

    // Ensure there are no unexpected tokens after the JSON data
    if (extraTokens !== null) {
        isEndOfTokens = false;
        throw new Error(`Unexpected tokens after end of value`);
    }

    if (!value || (typeof value !== "object" && !Array.isArray(value))) {
        throw new Error(`Expected top level object or array but got: ${typeof value}`);
    }

    return value;
}

const parseTokens = (tokenizer, depth, token) => {
    if (depth > maxDepth) {
        throw new Error('Too Deep JSON');
    }

    //making sure that the token value is null and it should be assigned to nextToken otherwise it will throw error in below conditions
    const nextToken = token === undefined ? tokenizer.nextToken() : token;

    if (nextToken === null && isEndOfTokens) {
        isEndOfTokens = true;
        throw new Error('Unexpected End of JSON');
    }

    if (nextToken === '{') return parseJsonObject(tokenizer, depth + 1);
    if (nextToken === '[') return parseJsonArray(tokenizer, depth + 1);
    if (symbols.includes(nextToken) && nextToken !== '') { //&& nextToken !== '}'
        isEndOfTokens = true;
        throw new Error(`Unexpected token found: ${nextToken}`);
    }
    return nextToken;
}

const parseJsonObject = (tokenizer, depth) => {

    const object = {};
    if (depth > maxDepth) {
        isEndOfTokens = true;
        throw new Error('Too Deep JSON');
    }

    let nextToken = tokenizer.nextToken();

    while (nextToken !== "}") {
        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            throw new Error('Unexpected end of JSON');
        }
        if (typeof nextToken !== 'string') throw new Error(`Expected string but got: ${typeof nextToken}`);

        const upcomingToken = tokenizer.nextToken();

        if (upcomingToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            throw new Error('Unexpected end of tokens');
        }

        if (upcomingToken !== ":") throw new Error(`Expected : but got ${upcomingToken}`);

        object[nextToken] = parseTokens(tokenizer, depth);

        const endToken = tokenizer.nextToken();

        if (endToken === '}') break;
        if (endToken === ',') {
            nextToken = tokenizer.nextToken();
            if (nextToken === "}")
                throw new Error(`Unexpected trailing , in object`);
            continue;
        }
        isEndOfTokens = true;
        throw new Error(`Expected "," or "}" but got: "${endToken}"`);
    }

    return object;
}

const parseJsonArray = (tokenizer, depth) => {
    if (depth > maxDepth) {
        isEndOfTokens = true;
        throw new Error('Too Deep JSON');
    }

    const values = [];
    let nextToken = tokenizer.nextToken();

    while (nextToken !== ']') {
        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            throw new Error('Unexpected end of array values');
        }
        values.push(parseTokens(tokenizer, depth, nextToken));

        nextToken = tokenizer.nextToken();

        if (nextToken === null && isEndOfTokens) {
            isEndOfTokens = false;
            throw new Error('Unexpected end of array tokens');
        }
        if (nextToken === ']') break;
        if (nextToken === ',') {
            nextToken = tokenizer.nextToken();
            if (nextToken === ']') {
                throw new Error('Unexpected trailing comma in array');
            }
            continue;
        }
        isEndOfTokens = true;
        throw new Error(`Expected ',' or ']' but got ${nextToken}`);
    }
    return values;
}
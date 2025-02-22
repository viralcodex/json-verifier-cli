import fs from 'fs';
import path from 'path';
import { describe, it, expect, test } from 'vitest';
import jsonParser from '../lib/jsonParser.js';
import { verifyJson, verifyJsonFromPath } from '../index.js';

const directories = ['./step1/', './step2/', './step3/', './step4/', './step5/']
const validJsonValues = [
    { key: "value" },
    [1, 2, 3],
    { nested: { key: "value" } },
    { key: "," },
    {},
    [],
    [{}],
    [[{}]],
    [['A']],
];

const validCodeJsonValues = [
    `{ "key": "value" }`,
    "[1, 2, 3]",
    '{ "nested": { "key": "value" } }',
]

const invalidCodeJsonValues = [
    `{ key: "value" }`,
    "[1, 2, ]",
    '{ "nested": { "key": "value" }',
]
const depth = 19;

describe('tests for jsonParser.js', () => {
    validJsonValues.forEach((jsonValue) => {
        describe('Basic Tests', () => {
            const parsedStringWithLibrary = JSON.stringify(jsonValue);
            it(`Custom Parser is able to correctly parse: ${parsedStringWithLibrary}`, () => {
                expect(jsonParser(parsedStringWithLibrary, depth)).toEqual(jsonValue);
            });
        })
    });

    describe('Standard tests from json.org', () => {
        directories.forEach((dir) => {
            const testDir = path.join(__dirname, dir);
            const filenames = fs.readdirSync(testDir);

            it(`directory ${dir} has files`, () => {
                expect(filenames.length).toBeGreaterThan(0);
            });

            filenames.forEach((file) => {
                const filePath = path.join(testDir, file);
                const data = fs.readFileSync(filePath, "utf8");

                if (file.startsWith("invalid") || file.startsWith("fail")) {
                    it(`fails to parse invalid JSON in file: ${file}`, () => {
                        expect(() => jsonParser(data, depth)).toThrow();
                    });
                }
                else {
                    it(`successfully parse valid JSON in file: ${file}`, () => {
                        const p = jsonParser(data, depth);
                        const q = JSON.parse(data);
                        expect(p).toEqual(q);
                    })
                }
            });
        })
    });
});

describe('tests for index.js', () => {
    it('verifyJson', () => {
        validJsonValues.forEach((jsonValue) => {
            const parsedStringWithCustom = verifyJson(jsonValue, depth);
            expect(parsedStringWithCustom).toEqual(jsonValue);
        });
        validCodeJsonValues.forEach((codeJsonValue) => {
            const parsedStringWithCustom = verifyJson(codeJsonValue, depth);
            expect(parsedStringWithCustom).toEqual(JSON.parse(codeJsonValue));
        })
        invalidCodeJsonValues.forEach((codeJsonValue) => {
            const parsedStringWithCustom = verifyJson(codeJsonValue, depth);
            expect(parsedStringWithCustom).toBeInstanceOf(Error);
        })
    });

    it('verifyJsonFromPath', () => {
        directories.forEach((dir) => {
            const testDir = path.join(__dirname, dir);
            const parsedResults = verifyJsonFromPath(testDir, depth);
            parsedResults.forEach((result) => {
                if (result.error) {
                    expect(result.error).toBeNull();
                }
                else {
                    expect(result.data).not.toBeNull();
                }
            });
        });
    });
});
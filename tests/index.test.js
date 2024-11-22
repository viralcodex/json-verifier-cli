import fs from 'fs';
import path from 'path';
import jsonParser from '../index.js';

describe('JSON PARSING', () => {
    const directories = ['./step1/', './step2/', './step3/', './step4/', './step5/']

    function basicTests(jsonValue) {
        const parsedStringWithLibrary = JSON.stringify(jsonValue);
        test(`Custom Parser is able to correctly parse: ${parsedStringWithLibrary}`, () => {
            expect(jsonParser(parsedStringWithLibrary)).toEqual(jsonValue);
        });
    }

    describe('Standard tests', () => {
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
                        expect(()=>jsonParser(data)).toThrow();
                    });
                }
                else {
                    it(`successfully parse valid JSON in file: ${file}`, () => {
                        const p = jsonParser(data);
                        const q = JSON.parse(data);
                        expect(p).toEqual(q);
                    })
                }
            });
        })
    });

    basicTests([]);
    basicTests({});
    basicTests([{}]);
    basicTests(["A"]);
});


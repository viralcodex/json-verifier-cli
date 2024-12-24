import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import jsonParser from '../index.js';
export default function verifyFiles(dirPath, flag, maxDepth) {
    if (flag) {
        try {
            const data = fs.readFileSync(dirPath, "utf8");
            const parsedData = jsonParser(data, maxDepth);
            if (parsedData) {
                console.log(chalk.greenBright(`Valid Json`),"\n");
            }
        }
        catch (error) {
            console.log(chalk.redBright("Invalid JSON file: ",error.message));
        }
    }
    else {
        let valid = 0;
        let invalid = 0;
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            try {
                const filePath = path.join(dirPath, file);
                const data = fs.readFileSync(filePath, "utf8");
                const parsedData = jsonParser(data, maxDepth);

                if (parsedData) {
                    console.log(chalk.greenBright(`${file}: Valid Json\n`));
                }
                valid++;
            } catch (error) {
                invalid++;
                console.log(chalk.redBright(`${file} : ${error.message}`));
            }
        });
        console.log(chalk.bold.red('---------------------------------'));
        console.log(
            chalk.bold.magenta(`Total files verified: ${files.length}`),
            chalk.bold.green(`\nValid JSONs: ${valid}`),
            chalk.bold.red(`\nInvalid JSONs: ${invalid}`));
    }
}
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import jsonParser from '../index.js';

const dateTime = new Date();
const lineBreak = '---------------------------------';
export default function verifyFiles(dirPath, flag, maxDepth) {
    if (flag) {
        try {
            const data = fs.readFileSync(dirPath, "utf8");
            const parsedData = jsonParser(data, maxDepth);
            if (parsedData) {
                console.log(chalk.greenBright(`Valid Json`), "\n");
            }
        }
        catch (error) {
            console.log(chalk.redBright("Invalid JSON file: ", error.message));
        }
    }
    else {
        let allErrors = ``;
        let valid = 0;
        let invalid = 0;
        const files = fs.readdirSync(dirPath);
        console.log(chalk.bold.gray(lineBreak));
        files.forEach((file) => {
            try {
                const filePath = path.join(dirPath, file);
                const data = fs.readFileSync(filePath, "utf8");
                const parsedData = jsonParser(data, maxDepth);

                if (parsedData) {
                    console.log(chalk.greenBright(`${file}: Valid Json\n`)+`\n${lineBreak}\n`);
                }
                valid++;
            } catch (error) {
                invalid++;
                allErrors += `[${dateTime.toISOString()}]: ${file}\n${error.message}\n${lineBreak}\n`
                console.log(chalk.bold.redBright(`${file}\n`)
                    + chalk.redBright(`${error.message}\n`)
                    + chalk.bold.gray(`\n${lineBreak}\n`));
            }
        });
        console.log(
            chalk.bold.magenta(`Total files verified: ${files.length}\n`),
            chalk.bold.greenBright(`\nValid JSONs: ${valid}\n`),
            chalk.bold.redBright(`\nInvalid JSONs: ${invalid}`));

        //logging errors at last
        logErrorsInFile(allErrors);
    }
}

function logErrorsInFile(errors) {
    try {
        const logDir = path.join(process.cwd(), 'Logs'); //current working directory for node helped in getting logs at root directory level
        const logFileName = `${dateTime.toISOString().replace(/:/g, '-')}-json-log.txt`;
        if (!fs.existsSync(logDir))
            fs.mkdirSync(logDir, { recursive: true });
        fs.writeFileSync(path.join(logDir, logFileName), errors);
        console.log(`\n${lineBreak}\n\n` + chalk.cyanBright.bold('Please find the detailed log file created in LOGS folder:', logFileName, "\n"));
    }
    catch (error) {
        console.error(error);
    }
}
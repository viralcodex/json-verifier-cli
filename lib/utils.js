import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import jsonParser from '../index.js';
import {consoleConstants} from './constants.js';
const dateTime = new Date();

export default function verifyFiles(dirPath, flag, maxDepth, logging) {
    if (flag) {
        try {
            const data = fs.readFileSync(dirPath, "utf8");
            const parsedData = jsonParser(data, maxDepth);
            if (parsedData) {
                console.log(`\n${chalk.greenBright(`Valid Json`)}`);
                if (consoleConstants.loggingFlagsN.includes(logging)) console.log(`\n${consoleConstants.lineBreak}\n\n${chalk.bold.cyanBright()}\n`);
                if (consoleConstants.loggingFlagsY.includes(logging)) logErrorsInFile(`${path.basename(dirPath)}: Valid Json`, flag);
            }
        }
        catch (error) {
            console.log(`\n${chalk.redBright("Invalid JSON file: ", error.message)}`);
            if (consoleConstants.loggingFlagsN.includes(logging)) console.log(`\n${consoleConstants.lineBreak}\n\n${chalk.bold.cyanBright(consoleConstants.logMessage)}\n`);
            if (consoleConstants.loggingFlagsY.includes(logging)) logErrorsInFile(error.message, flag);
        }
    }
    else {
        let allFileLogs = ``;
        let valid = 0;
        let invalid = 0;
        const files = fs.readdirSync(dirPath);
        console.log(chalk.bold.gray(consoleConstants.lineBreak));
        files.forEach((file) => {
            try {
                const filePath = path.join(dirPath, file);
                const data = fs.readFileSync(filePath, "utf8");
                const parsedData = jsonParser(data, maxDepth);

                if (parsedData) {
                    console.log(chalk.greenBright(`${file}: Valid Json\n`) + `\n${consoleConstants.lineBreak}\n`);
                    allFileLogs += `${file}: Valid Json` + `\n${consoleConstants.lineBreak}\n`;
                }
                valid++;
            } catch (error) {
                invalid++;
                if (consoleConstants.loggingFlagsY.includes(logging)) allFileLogs += `[${dateTime.toISOString()}]: ${file}\n${error.message}\n${consoleConstants.lineBreak}\n`
                console.log(chalk.bold.redBright(`${file}\n`)
                    + chalk.redBright(`${error.message}\n`)
                    + chalk.bold.gray(`\n${consoleConstants.lineBreak}\n`));
            }
        });
        console.log(
            chalk.bold.magenta(`Total files verified: ${files.length}\n`),
            chalk.bold.greenBright(`\nValid JSONs: ${valid}\n`),
            chalk.bold.redBright(`\nInvalid JSONs: ${invalid}`));
        if (consoleConstants.loggingFlagsN.includes(logging))
            console.log(`\n${consoleConstants.lineBreak}\n\n${chalk.bold.cyanBright(consoleConstants.logMessage)}\n`);
        if (consoleConstants.loggingFlagsY.includes(logging))
            logErrorsInFile(allFileLogs, flag);
    }
}

function logErrorsInFile(logs, dirType) {
    try {
        const logDir = path.join(process.cwd(), 'Logs'); //current working directory for node helped in getting logs at root directory level
        const logFileName = `${dateTime.toISOString().replace(/:/g, '-')}-json-${dirType ? `file` : `folder`}-log.txt`;
        if (!fs.existsSync(logDir))
            fs.mkdirSync(logDir, { recursive: true });
        fs.writeFileSync(path.join(logDir, logFileName), logs);
        console.log(`\n${consoleConstants.lineBreak}\n\n` + chalk.cyanBright.bold('Please find the detailed log file created in LOGS folder:', logFileName, "\n"));
    }
    catch (error) {
        console.error(error);
    }
}
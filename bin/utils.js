import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import jsonParser from '../index.js';

const dateTime = new Date();
const loggingFlagsN = ["N", "n"];
const loggingFlagsY = ["Y", "y"];
const lineBreak = '---------------------------------';
export default function verifyFiles(dirPath, flag, maxDepth, logging) {
    if (flag) {
        try {
            const data = fs.readFileSync(dirPath, "utf8");
            const parsedData = jsonParser(data, maxDepth);
            if (parsedData) {
                console.log(`\n${chalk.greenBright(`Valid Json`)}`);
                if (loggingFlagsN.includes(logging)) console.log(`\n${lineBreak}\n\n${chalk.bold.cyanBright("Logging was disabled for this verification, please re-run it without any flag to log the results")}\n`);
                if (loggingFlagsY.includes(logging)) logErrorsInFile(`${path.basename(dirPath)}: Valid Json`);
            }
        }
        catch (error) {
            console.log(`\n${chalk.redBright("Invalid JSON file: ", error.message)}`);
            if (loggingFlagsN.includes(logging)) console.log(`\n${lineBreak}\n\n${chalk.bold.cyanBright("Logging was disabled for this verification, please re-run it without any flag to log the results")}\n`);
            if (loggingFlagsY.includes(logging)) logErrorsInFile(error.message);
        }
    }
    else {
        let allFileLogs = ``;
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
                    console.log(chalk.greenBright(`${file}: Valid Json\n`) + `\n${lineBreak}\n`);
                    allFileLogs += `${file}: Valid Json` + `\n${lineBreak}\n`;
                }
                valid++;
            } catch (error) {
                invalid++;
                if (loggingFlagsY.includes(logging)) allFileLogs += `[${dateTime.toISOString()}]: ${file}\n${error.message}\n${lineBreak}\n`
                console.log(chalk.bold.redBright(`${file}\n`)
                    + chalk.redBright(`${error.message}\n`)
                    + chalk.bold.gray(`\n${lineBreak}\n`));
            }
        });
        console.log(
            chalk.bold.magenta(`Total files verified: ${files.length}\n`),
            chalk.bold.greenBright(`\nValid JSONs: ${valid}\n`),
            chalk.bold.redBright(`\nInvalid JSONs: ${invalid}`));
        if (loggingFlagsN.includes(logging)) console.log(`\n${lineBreak}\n\n${chalk.bold.cyanBright("Logging was disabled for this verification, please re-run it without any flag to log the results")}\n`);
        //logging errors if enabled
        if (loggingFlagsY.includes(logging)) logErrorsInFile(allFileLogs);
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
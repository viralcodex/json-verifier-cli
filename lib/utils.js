import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import jsonParser from './jsonParser.js';
import { consoleConstants } from './constants.js';

const dateTime = new Date();
let allFileLogs = ``;
let allParsedData = [];
let valid = 0;
let invalid = 0;
let totalFiles = 0;

function verifyFiles(dirPath, dirType, maxDepth, logging, isCliCall = true) {
    if (dirType) {
        try {
            const data = fs.readFileSync(dirPath, "utf8");
            const parsedData = jsonParser(data, maxDepth);
            if (parsedData) {
                allParsedData.push({ fileName: path.basename(dirPath), data: parsedData });
                valid = 1;
            }
        }
        catch (error) {
            allParsedData.push({ fileName: path.basename(dirPath), error: error });
            invalid = 1;
        }
        totalFiles = 1;
    }
    else {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            try {
                const filePath = path.join(dirPath, file);
                const data = fs.readFileSync(filePath, "utf8");
                const parsedData = jsonParser(data, maxDepth);

                if (parsedData) {
                    allParsedData.push({ fileName: file, data: parsedData });
                }
                valid++;
            } catch (error) {
                invalid++;
                allParsedData.push({ fileName: file, error: error });
            }
        });
        totalFiles = valid + invalid;
    }
    if (isCliCall) {
        _handleConsoleAndLogging(allParsedData, dirType, logging)
        _handleVerificationSummary(totalFiles, dirType, valid, invalid, logging);
    }
    else
        return allParsedData;
}


function _handleConsoleAndLogging(allParsedData) {
    allParsedData.forEach(parsedData => {
        if (parsedData.data) {
            console.log(`${parsedData.fileName}\n\n${chalk.greenBright(consoleConstants.validJson)}`);
            allFileLogs += `${parsedData.fileName}\n\n${consoleConstants.validJson}\n\n${consoleConstants.lineBreak}\n\n`
        }
        else {
            console.log(`${parsedData.fileName}\n\n${chalk.redBright(consoleConstants.invalidJson, parsedData.error.message)}`);
            allFileLogs += `${parsedData.fileName}\n\n${parsedData.error.message}\n\n${consoleConstants.lineBreak}\n\n`
        }
        console.log(`\n${consoleConstants.lineBreak}\n`)
    });
}

function _handleVerificationSummary(totalFiles, dirType, valid, invalid, logging) {
    allFileLogs += `${consoleConstants.totalFilesVerified} ${totalFiles}\n${consoleConstants.totalValidJsons} ${valid}\n${consoleConstants.totalInvalidJsons} ${invalid}`
    console.log(
        chalk.bold.magenta(`${consoleConstants.totalFilesVerified} ${totalFiles}\n`),
        chalk.bold.greenBright(`\n${consoleConstants.totalValidJsons} ${valid}\n`),
        chalk.bold.redBright(`\n${consoleConstants.totalInvalidJsons} ${invalid}`));
    if (consoleConstants.loggingFlagsN.includes(logging))
        console.log(`\n${consoleConstants.lineBreak}\n\n${chalk.bold.cyanBright(consoleConstants.logMessageN)}\n`);
    if (consoleConstants.loggingFlagsY.includes(logging)) {
        const logFileName = _loggingInFile(allFileLogs, dirType);
        console.log(`\n${consoleConstants.lineBreak}\n\n` + chalk.cyanBright.bold(consoleConstants.logMessageY, logFileName, "\n"));
    }
}

function _loggingInFile(logs, dirType) {
    try {
        const logDir = path.join(process.cwd(), 'Logs'); //current working directory for node helped in getting logs at root directory level
        const logFileName = `${dateTime.toISOString().replace(/:/g, '-')}-json-${dirType ? `file` : `folder`}-log.txt`;
        if (!fs.existsSync(logDir))
            fs.mkdirSync(logDir, { recursive: true });
        fs.writeFileSync(path.join(logDir, logFileName), logs);
        return logFileName;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export { verifyFiles };
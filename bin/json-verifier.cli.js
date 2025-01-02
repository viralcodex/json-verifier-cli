#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import verifyFiles from './utils.js';

program.version("0.0.1")
    .description(
    chalk.cyanBright.bold.underline('JSON VERIFIER CLI v0.0.1\nCheck whether the JSON files are valid or not and parse one or all of them together.\nJust open the terminal in the directory your files/folders are present and use one of the following commands.'))
    .option("-f, --file <file_path>", "provide the file path for the JSON file to be checked")
    .option("-flr, --folder <folder_path>", "provide the folder path with JSON files to be checked")
    .option("-d, --max-depth <number>", "Set your max-depth for the JSON file(s) you want to check", 19)
    .option("-l --logging <Y/N>", "Choose if you want to log the results of this verification. By default it is enabled", "Y")
    .action((options) => {
        const maxDepth = parseInt(options.maxDepth, 10);
        if (isNaN(maxDepth) || maxDepth <= 0) {
            console.error(chalk.red.bold("Error: max-depth must be a positive integer."));
            process.exit(1);
        }
        verifyFiles(options.file || options.folder, !!options.file, maxDepth, options.logging);
    });
if (process.argv.length <= 2) {
    program.outputHelp();
    process.exit(0);
}

program.showHelpAfterError().parse(process.argv);

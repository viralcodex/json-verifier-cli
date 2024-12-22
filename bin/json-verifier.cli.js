#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import verifyFiles from './utils.js';

program.version("0.0.1")
    .description(
    chalk.cyanBright.bold.underline('JSON VERIFIER CLI v0.0.1\nCheck whether the JSON files are valid or not and parse one or all of them together.\nJust open the terminal in the directory your files/folders are present and use one of the following commands.'))
    .option("-f, --file <file_path>", "provide the file path for the JSON file to be checked")
    .option("-flr, --folder <folder_path>", "provide the folder path with JSON files to be checked")
    .action((options) => {
        verifyFiles(options.file || options.folder, !!options.file);
    });
if (process.argv.length <= 2) {
    program.outputHelp();
    process.exit(0);
}

program.showHelpAfterError().parse(process.argv);

#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { verifyFiles } from '../lib/utils.js';
import { consoleConstants } from '../lib/constants.js';


program.exitOverride();

program.version("0.0.1")
    .description(
        chalk.cyanBright.bold.underline(consoleConstants.packageDescription))
    .option(consoleConstants.options.file.command, consoleConstants.options.file.description)
    .option(consoleConstants.options.folder.command, consoleConstants.options.folder.description)
    .option(consoleConstants.options.maxDepth.command, consoleConstants.options.maxDepth.description, 19)
    .option(consoleConstants.options.logging.command, consoleConstants.options.logging.description, consoleConstants.yes)
    .action((options) => {
        if (options && (options.file || options.folder)) {
            const maxDepth = parseInt(options?.maxDepth, 10);
            if (isNaN(maxDepth) || maxDepth <= 0) {
                console.error(chalk.red.bold(consoleConstants.maxDepthError));
            }
            verifyFiles(options?.file || options?.folder, !!options?.file, maxDepth, options?.logging);
        }
        else {
            program.outputHelp();
            process.exit(0);
        }
    });

program.showHelpAfterError().parse(process.argv);

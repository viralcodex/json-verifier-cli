import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';
import { exec } from 'child_process';
import { consoleConstants } from '../lib/constants.js';

// CLI Path
const cliPath = path.resolve(__dirname, '../bin/json-verifier.cli.js');

// Helper to run the CLI
const runCLI = (args) => {
    return new Promise((resolve, reject) => {
        const sanitizedArgs = args.replace(/[^a-zA-Z0-9\-_.\/ ]/g, '');
        exec(`node ${cliPath} ${sanitizedArgs}`, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
};

describe('json-verifier CLI', () => {
    beforeEach(() => {
        vi.restoreAllMocks(); // Reset all mocks before each test
    });
    it('should display help when no arguments are passed', async () => {
        const { stdout } = await runCLI('');
        expect(stdout).toContain('Usage:');
        expect(stdout).toContain('--file');
        expect(stdout).toContain('--folder');
        expect(stdout).toContain('--max-depth');
        expect(stdout).toContain('--logging');
    });

    it('should call verifyFiles with file option', async () => {
        const { stdout } = await runCLI('--file ./tests/step5/pass1.json');
        expect(stdout).toContain(consoleConstants.validJson);
        expect(stdout).toContain(consoleConstants.logMessageY);
    });

    it('should call verifyFiles with folder option', async () => {
        const { stdout } = await runCLI('--folder ./tests/step1');
        expect(stdout).toContain(consoleConstants.validJson);
        expect(stdout).toContain(consoleConstants.invalidJson);
        expect(stdout).toContain(consoleConstants.totalFilesVerified);
        expect(stdout).toContain(consoleConstants.totalInvalidJsons);
        expect(stdout).toContain(consoleConstants.totalValidJsons);
    });

    it('should handle invalid max-depth option', async () => {
        try {
            await runCLI('--file ./tests/step5/fail1.json --max-depth -1');
        } catch ({ stderr }) {
            expect(stderr).toContain(consoleConstants.maxDepthError);
            expect(spy).not.toHaveBeenCalled();
        }
    });

    it('should handle logging option', async () => {
        const { stdout } = await runCLI('--file ./tests/step5/fail1.json --logging N')
        expect(stdout).toContain(consoleConstants.invalidJson);
        expect(stdout).toContain(consoleConstants.logMessageN);
    });

    it('should exit with an error for unknown arguments', async () => {
        try {
            await runCLI('--unknown-option');
        } catch ({ stderr }) {
            expect(stderr).toContain('error: unknown option');
        }
    });
});

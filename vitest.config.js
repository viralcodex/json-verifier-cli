import { defineConfig } from 'vitest/config';

/// <reference types="vitest" />


export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['./bin', './lib', './index.js'],
            exclude: ['./node_modules', './Logs', '*.md'],
            enabled: true,
            all: true,         
            provider: 'v8'
        },
    },
});
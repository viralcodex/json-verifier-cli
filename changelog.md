## Changelog - JSON-Verifier-CLI

### Version 0.4.1

#### Changed
 - Constants file is revamped to include all the constants fron the project
 - Refactored project structure
 - Updated Readme with new content and fixed some grammar
 - Changed references for the constants throghout the project
 - Changed some language structure in CLI options

### Version 0.4.0

#### Added

- Added a feature to log details of the verification of the JSON files of a folder
- Added CLI option for enabling/disabling logging in log files

#### Fixed

- CLI text changes for improved error logging and readability

#### Changed

- Error constants file by adding more descriptions in the errors (description, severity and remediation)
- Error codes grouped by error types (not in lexicographic order yet)

### Version 0.3.2

#### Fixed

- Fixed the issue where single character string having [ { , . } ] symbols threw invalid JSON.
- Refactored index.test.js

#### Added

- A few basic tests and new test JSON files

### Version 0.3.1

#### Added

- Added Option to set max depth for JSON files from CLI itself
- Minor changes to code for better CLI readability

### Version 0.3.0

#### Added

- Added error logging and reporting for each JSON file verified on CLI.

### Version 0.2.2

#### Added

- Minor code fixes and refactoring to improve readability

### Version 0.2.1

#### Added

- Major dependencies update and readme changes

### Version 0.2.0

#### Added

- CLI functionality added and refined tests for the codebase.

### Version 0.1.0

#### Added

<b>Initial Release</b>
-Basic code functionalities and tests

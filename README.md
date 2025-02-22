<section><h2>JSON Verifier (with CLI tool and Parser)</h2></section>
This is a JSON verifier and parser created as a simple project from <a href="https://github.com/CodingChallengesFYI">Coding challenges</a> but now being developed as a full fledged project/package.

<p></p>
This tool can be used to <b>verify</b> and <b>parse</b> JSON files. 
You can verify and parse a <b>single file</b> or a <b>folder</b> consisting of JSON files using the <b>CLI</b> tool or use the <b>exported functions</b>, in your own code (mentioned below).

<section><h2>How to Use</h2></section>

<section><h3>For Running in CLI</h3></section>
<li>Open your terminal and execute:</li>
<p></p> 
<pre><code>npm install -g json-verifier</code></pre>
<li>After installing, open your terminal and run <code>json-verifier</code>, you will get the options on how to use the tool as below.</li>
<p></p>

```markdown
  Options:
  -V, --version                   output the package version number
  -f, --file <file_path>          verify the JSON file for the file path given
  -fd, --folder <folder_path>     verify all the JSON files and parse them for the folder path given
  -d, --max-depth <number>        set the max depth for the JSON file(s) you want to check
  -l  --logging <Y/N>             Choose if you want to log the results of the verification. By default it is enabled.             
  -h, --help                      display help for available options
```

<section><h3>For importing as a library in code</h3></section>
<li>Install the package as above, then use as mentioned below</li>
<p></p>
<li>For verifying and parsing a json object string

```javascript
import { verifyJson, verifyJsonFromPath } from 'json-verifier-cli';

/**
 * for verifying and parsing a json object string directly from code
 */
const obj = `{"key":"value", "key2":true}`;
const maxDepth : number = 10 // (optional) any integer above 0 (default is 19) 
console.log(verifyJson(obj, maxDepth)); //output: {key:"value", list:true}
```
<li>For verifying and parsing JSON from file and folder path

```javascript
/**
 * absoluteFilePath.json
 * {
 *  "key":123,
 *  "key2": "value"
 *  }
 */

const filePath = './absoluteFilePath.json'
const maxDepth : number = 10 // (optional) any integer above 0 (default is 19) 
const enableLoggingToFile : boolean = false // (optional) Y, y, N, n (default is Yes or enabled)

/** outputs an object with filename and result (error or parsed JSON data)
 * { file: "file1.json", result: <data/error> },
*/
console.log(verifyJsonFromPath(filePath, maxDepth, enableLoggingToFile))

/**
 * absoluteFolderPath/
 *   - file1.json
 *   - file2.json
 *   - file3.json ... and so on
 */

const folderPath = './absoluteFolderPath'
/** outputs an array of object with filename and result (error or parsed JSON data)
 * [
 * { file: "file1.json", result: <data/error> },
 * { file: "file2.json", result: <data/error> },
 * ]
 */
console.log(verifyJsonFromPath(folderPath, maxDepth, enabledLoggingToFile)) 
```
<section><h2>Implementation</h2></section>
I would specially like to mention this repo by <a href="https://github.com/eliasm307/coding-challenges/tree/main/packages/json-parser">EliaSM</a> which helped me craft an approach and write a version of mine. Please check their code out written in Typescript and try it out too!!(I'm still learning).
<p></p>
For CLI support, I used <a href="https://www.npmjs.com/package/commander">Commander.js</a> and <a href="https://www.npmjs.com/package/chalk">Chalk</a>.
<p></p>
I use Javascript and go through character by character for the whole data and create tokens, then stop whenever there is an invalid character or pattern in the JSON data from the file.
This is similar to generator function used in the above repository and this approach helps in parsing large data by not parsing it all at once but one by one and stopping whenever there is an error or invalidity is found.
(Even though generator function is present in JS as well, I wrote a non-generator approach using OOPS to increase new)

<section><h2>Testing</h2></section>
I have used Jest for testing and test files are from <a href="https://codingchallenges.fyi/challenges/challenge-json-parser/">Coding Challenges</a> (folders step1 to step4) and from official <a href="https://www.json.org/">JSON website</a> (folder step5) which contains 40 <a href="https://www.json.org/JSON_checker/test.zip">standard tests</a> for checking whether a JSON is valid or not.

<h5>For Already Present Test Files in the project</h5>
<li>Clone the repo and install the dependencies by running the following command:</li>
<p></p>
<pre><code>npm install</code></pre>
<li>Execute the command to run the test files present in the repository</li>
<p></p> 
<pre><code>npm test</code></pre>
<li>Note: You can remove/add any test files you want and just change the <code>directories</code> array in <code>index.test.js</code> file if deleting/adding any new folder.</li>

<p></p>

<section><h2>Contribution and Issue reporting</h2></section>
<li>Please fork the repository and raise a pull request for the enhancement/bug-fix/feature/documentation. 
<li>For issue reporting and feature requests, please create a new issue with proper details of the requirements/steps to reproduce and proper screenshots/videos/logs, etc to help me resolve it quickly and properly. Use proper tags to help me sort and filter all the issues and it will be easy for me as well.

<p></p>

<b>Thanks for using my project and reading till here! Any help is much appreciated!!</b>

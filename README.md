<section><h2>JSON Verifier (and Parser)</h2></section>
This is a CLI JSON verifier and parser created for <a href="https://github.com/CodingChallengesFYI">Coding challenges</a>.
This tool can be used to check whether .json files are valid or not and also parse the JSON if it is valid through CLI.
You can verify a single file or a folder consisting of JSON files.
(Any improvements or suggestions are welcome! Please raise an issue and we can discuss)

<section><h2>How to run</h2></section>
<h3>For Running in CLI</h3>
<li>Open your terminal and execute:</li>
<p></p> 
<pre><code>npm install -g json-verifier</code></pre>
<li>After installing, open your terminal and run <code>json-verifier</code>, you will get the options on how to use the tool as below.</li>
<p></p>

```
  Options:
  -V, --version                   output the version number
  -f, --file <file_path>          verify the JSON file and parse it for the file path given
  -flr, --folder <folder_path>    verify all the JSON files and parse them for the folder path given
  -d, --max-depth <number>        set the max depth for the JSON file(s) you want to check
  -h, --help                      display help for command
```

<h3>For using the package in your code to check for JSON objects validity and parse it (work in progress)</h3>
<li>Install the package as above, then take reference from below to import and use it</li>
<p></p>

```javascript
import jsonParser from 'json-verifier-cli';

const obj = {"key":"value", "list":true}; //have to stringify before sending it as an input

console.log(jsonParser(JSON.stringify(obj))); //outputs: {"key":"value", "list":true}, as it is valid
```

<li>Note: Still is in development and may not work as intended./li>

<h3>For Already Present Test Files in the project</h3>
<li>Clone the repo and install the dependencies by running the following command: </li>
  <p></p>
  <pre><code>npm install</code></pre>
<li>Execute the command to run the test files present in the repository</li>
  <p></p> 
  <pre><code>npm test</code></pre>
<li>Note: You can remove/add any test files you want and just change the <code>directories</code> array in <code>index.test.js</code> file if deleting/adding any new folder.</li>

<section><h2>Implementation</h2></section>
I would specially like to mention this repo by <a href="https://github.com/eliasm307/coding-challenges/tree/main/packages/json-parser">EliaSM</a> which helped me craft an approach and write a version of mine. Please check their code out written in Typescript and try it out too!!(I'm still learning).
<p></p>
For CLI support, I used <a href="https://www.npmjs.com/package/commander">Commander.js</a> and <a href="https://www.npmjs.com/package/chalk">Chalk</a>.
<p></p>
I used Javascript and go through character by character for the whole data and create tokens, then stop whenever there is an invalid character or pattern in the JSON data from the file.
This is similar to generator function used in the above repository and this approach helps in parsing large data by not parsing it all at once but one by one and stopping whenever there is an error or invalidity is found.
(Even though generator function is present in JS as well, I tried to write a non-generator approach using class-object route to learn something new)

<section><h2>Testing</h2></section>
I have used Jest for testing and test files are from <a href="https://codingchallenges.fyi/challenges/challenge-json-parser/">Coding Challenges</a> (folders step1 to step4) and from official <a href="https://www.json.org/">JSON website</a> (folder step5) which contains 40 <a href="https://www.json.org/JSON_checker/test.zip">standard tests</a> for checking whether a JSON is valid or not.

<p></p>

<section><h2>Future Updates</h2></section>

<li>Better Error reporting and debugging support</li>
<li>Better Support to validate and parse your JSON objects in-code rather than just in CLI</li>
...and much more

<p></p>
Thanks for using my project and reading till here! Any help is much appreciated!!

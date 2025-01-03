<section><h2>JSON Verifier CLI (and Parser)</h2></section>
This is a CLI JSON verifier and parser created as a simple project from <a href="https://github.com/CodingChallengesFYI">Coding challenges</a> but now being developed as a full fledged project/package.

This tool can be used to check whether .json files are valid or not.
You can verify a single file or a folder consisting of JSON files.
(Any improvements or suggestions are welcome! Please raise an issue with detailed desription and requirements)

<section><h2>How to run</h2></section>
<h3>For Running in CLI</h3>
<li>Open your terminal and execute:</li>
<p></p> 
<pre><code>npm install -g json-verifier</code></pre>
<li>After installing, open your terminal and run <code>json-verifier</code>, you will get the options on how to use the tool as below.</li>
<p></p>

```
  Options:
  -V, --version                   output the package version number
  -f, --file <file_path>          verify the JSON file for the file path given
  -flr, --folder <folder_path>    verify all the JSON files and parse them for the folder path given
  -d, --max-depth <number>        set the max depth for the JSON file(s) you want to check
  -l  --logging <Y/N>             Choose if you want to log the results of the verification. By default it is enabled.             
  -h, --help                      display help for available options
```
<h3>Examples</h3>

![image](https://github.com/user-attachments/assets/2c89c426-064b-4b8c-9ab1-e71d2aff7c02)

![image](https://github.com/user-attachments/assets/b1ef6881-75a5-44fa-86a4-e71ac7c65714)

<h3>(WORK IN PROGRESS)For using the package in your code to check for JSON objects validity and parse it</h3>
<li>Install the package as above, then take reference from below to import and use it</li>
<p></p>

```javascript
import jsonParser from 'json-verifier-cli';

const obj = {"key":"value", "list":true}; //have to stringify before sending it as an input

console.log(jsonParser(JSON.stringify(obj))); //outputs: {"key":"value", "list":true}, as it is valid
```

<li>Note: Still is in development and may not work as intended./li>

<h3>For Already Present Test Files in the project</h3>
<li>Clone the repo and install the dependencies by running the following command:</li>
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
I use Javascript and go through character by character for the whole data and create tokens, then stop whenever there is an invalid character or pattern in the JSON data from the file.
This is similar to generator function used in the above repository and this approach helps in parsing large data by not parsing it all at once but one by one and stopping whenever there is an error or invalidity is found.
(Even though generator function is present in JS as well, I wrote a non-generator approach using OOPS to increase new)

<section><h2>Testing</h2></section>
I have used Jest for testing and test files are from <a href="https://codingchallenges.fyi/challenges/challenge-json-parser/">Coding Challenges</a> (folders step1 to step4) and from official <a href="https://www.json.org/">JSON website</a> (folder step5) which contains 40 <a href="https://www.json.org/JSON_checker/test.zip">standard tests</a> for checking whether a JSON is valid or not.

<p></p>

<section><h2>Future Updates</h2></section>

<li>Better support to validate your JSON objects in-code by importing rather than just in CLI</li>
Adding more updates soon...

<p></p>
<b>Thanks for using my project and reading till here! Any help is much appreciated!!</b>

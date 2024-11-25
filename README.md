<section><h2>JSON VERIFIER (AND PARSER)</h2></section>
This is a CLI JSON verifier and parser created as an exercise in Javascript for <a href="https://github.com/CodingChallengesFYI">Coding challenges</a> by John Crickett.
This code can be used to check whether .json files are valid or not and also parse the JSON if it is valid. 
You can verify a single file or a folder consisting of JSON files.
(Any improvements or suggestions are welcome! Please raise an issue and we can discuss)

<section><h2>How to run</h2></section>
<h3>For Running in CLI</h3>
<li>Open your terminal and execute <code>npm install -g json-verifier</code></li>
<li>After installing, open your terminal and run the command <code>json-verifier</code>, you will get the options on how to use the tool.</li>
<code>Options:
  -V, --version                 output the version number
  -f, --file <file_path>        provide the file path for the JSON file to be checked
  -flr, --folder <folder_path>  provide the folder patah with JSON files to be checked
  -h, --help                    display help for command</code>

<h3>For Already Present Test Files in the project</h3>
<li>Clone the repo and install the dependencies by running <code>npm install</code> in terminal.</li>
<li>Run <code>npm test</code> to run the test files present in the repository.</li>
<li>Note: You can remove/add any test files you want and just change the <code>directories</code> array in <code>index.test.js</code> file if deleting/adding any new folder.</li>

<section><h2>Implementation</h2></section>
I would specially like to mention this repo by <a href="https://github.com/eliasm307/coding-challenges/tree/main/packages/json-parser">EliaSM</a> which helped me understand the approach and write a version of mine. Please check their code out written in Typescript and try it out!!(I'm still learning).
<p></p>
For CLI support, I used <a href="https://www.npmjs.com/package/commander">Commander.js</a> and <a href="https://www.npmjs.com/package/chalk">Chalk</a>.
<p></p>
I used Javascript and go through character by character for the whole data and create tokens, then stop whenever there is an invalid character or pattern in the JSON data from the file.
This is similar to generator function used in the above repository and this approach helps in parsing large data by not parsing it all at once but one by one and stopping whenever there is an error or invalidity is found.
(Even though generator function is present in JS as well, I tried to write a non-generator approach using class-object route to learn something new)

<section><h2>Testing</h2></section>
I have used Jest for testing and test files are from <a href="https://codingchallenges.fyi/challenges/challenge-json-parser/">Coding Challenges</a> (step1 to step4) and from official json website (Step5) which contains 40 <a href="https://www.json.org/JSON_checker/test.zip">standard tests</a> for checking whether a JSON is valid or not.

<p></p>

Thanks for using my project and reading till here!

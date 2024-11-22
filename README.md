<section><h2>JSON PARSER</h2></section>
This is a JSON parser created as a exercise in Javascript for <a href="https://github.com/CodingChallengesFYI">Coding challenges</a> by John Crickett.
This code can be used to check whether .json files are valid or not.

<section><h2>Implementation</h2></section>
I would specially like to mention this repo by <a href="https://github.com/eliasm307/coding-challenges/tree/main/packages/json-parser">EliaSM</a> which helped me understand the approach and write a version of mine. Please check their code out written in Typescript and is much better in my opinion (I'm still learning).

I use Javascript and go through character by character for the whole data, then stop whenever there is an invalid character or pattern in the JSON data from the file.
This is similar to generator function used in the above repository and this approach helps in parsing large data by not parsing it all at once but one by one and stopping whenever there is an error or invalidity is found.
(Even though generator function is present in JS as well, I tried to write a non-generator approach using class-object route to learn something new)

<section><h2>How to run</h2></section>
Just clone the repo and install the dependencies by running <code>npm install</code> in terminal.
Then just run <code>npm test</code> to run the test files present in the repository.
You can remove/add any test files you want and just change the <code>directories</code> array in <code>index.test.js</code> file if deleting/adding any new folder.

<section><h2>Testing</h2></section>
I have used Jest for testing and test files are from <a href="https://codingchallenges.fyi/challenges/challenge-json-parser/">Coding Challenges</a> (step1 to step4) and from official json website (Step5) which contains 40 <a href="https://www.json.org/JSON_checker/test.zip">standard tests</a> for checking whether a JSON is valid or not.


<section><h2>Future work</h2></section>
I would work on making this program a CLI tool to directly run on CMD or terminal for a specific JSON file.


Thanks for reading till here!

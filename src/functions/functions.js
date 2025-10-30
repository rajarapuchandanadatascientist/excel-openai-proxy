// /* global clearInterval, console, setInterval */

// /**
//  * Add two numbers
//  * @customfunction
//  * @param {number} first First number
//  * @param {number} second Second number
//  * @returns {number} The sum of the two numbers.
//  */
// export function add(first, second) {
//   return first + second;
// }

// /**
//  * Displays the current time once a second
//  * @customfunction
//  * @param {CustomFunctions.StreamingInvocation<string>} invocation Custom function invocation
//  */
// export function clock(invocation) {
//   const timer = setInterval(() => {
//     const time = currentTime();
//     invocation.setResult(time);
//   }, 1000);

//   invocation.onCanceled = () => {
//     clearInterval(timer);
//   };
// }

// /**
//  * Returns the current time
//  * @returns {string} String with the current time formatted for the current locale.
//  */
// export function currentTime() {
//   return new Date().toLocaleTimeString();
// }

// /**
//  * Increments a value once a second.
//  * @customfunction
//  * @param {number} incrementBy Amount to increment
//  * @param {CustomFunctions.StreamingInvocation<number>} invocation
//  */
// export function increment(incrementBy, invocation) {
//   let result = 0;
//   const timer = setInterval(() => {
//     result += incrementBy;
//     invocation.setResult(result);
//   }, 1000);

//   invocation.onCanceled = () => {
//     clearInterval(timer);
//   };
// }

// /**
//  * Writes a message to console.log().
//  * @customfunction LOG
//  * @param {string} message String to write.
//  * @returns String to write.
//  */
// export function logMessage(message) {
//   console.log(message);

//   return message;
// }


// /**
//   * Gets the star count for a given Github repository.
//   * @customfunction 
//   * @param {string} userName string name of Github user or organization.
//   * @param {string} repoName string name of the Github repository.
//   * @returns {number} number of stars given to a Github repository.
//   */
//   export async function getStarCount(userName, repoName) {
//     try {
//       //You can change this URL to any web request you want to work with.
//       const url = "https://api.github.com/repos/" + userName + "/" + repoName;
//       const response = await fetch(url);
//       //Expect that status code is in 200-299 range
//       if (!response.ok) {
//         throw new Error(response.statusText)
//       }
//         const jsonResponse = await response.json();
//         return jsonResponse.watchers_count;
//     }
//     catch (error) {
//       return error.message;
//     }
//   }


/**
 * Sends a prompt to your backend proxy which calls OpenAI.
 * @customfunction
 * @param {string} prompt
 * @returns {string}
 */
export async function ASKAI(prompt) {
  try {
    if (!prompt || !prompt.toString().trim()) return "Provide a prompt.";

    // <-- Replace with the URL Vercel gives you after deploy
    const url = "https://your-vercel-project.vercel.app/api/openai";

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Server error ${resp.status}: ${text}`);
    }

    const j = await resp.json();
    return j.answer ?? "No answer";
  } catch (err) {
    // Excel cells expect a value, return readable error text
    return `Error: ${err.message}`;
  }
}

// Register (if your project uses automatic association, this may be optional)
if (typeof CustomFunctions !== "undefined") {
  CustomFunctions.associate("ASKAI", ASKAI);
}
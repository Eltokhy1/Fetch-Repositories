// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

let mainApi = `https://api.github.com/users/elzerowebschool/repos`;
getButton.addEventListener("click", (eo) => {
  let Username = theInput.value;
  getfetch(`https://api.github.com/users/${Username}/repos`, Username);
});

async function getfetch(api, Username) {
  if (theInput.value != "") {
    try {
      reposData.innerHTML = ``;
      let myData = await fetch(api);
      let dataClear = await myData.json();
      dataClear.forEach((repos) => {
        // create main div which have the name of repose
        let mainDiv = document.createElement("div");
        // create the text of main div
        let textOfMainDiv = document.createTextNode(`${repos.name}`);
        // set text of main div into main div
        mainDiv.appendChild(textOfMainDiv);
        // set maindiv into repos data to display data on web
        reposData.appendChild(mainDiv);
        // create anchor to visit repos
        let visit = document.createElement("a");
        // create text of anchor
        let textOfVisit = document.createTextNode("Visit");
        // set text of anchor into anchor
        visit.appendChild(textOfVisit);
        // create link of anchor to visit repos
        visit.href = `https://github.com/${Username}/${repos.name}`;
        // set attribute to anchor
        visit.setAttribute("target", "_blank");
        // set visit into repos data to display data on web
        mainDiv.appendChild(visit);
        // Create Stars Count Span
        let starsSpan = document.createElement("span");

        // Create The Stars Count Text
        let starsText = document.createTextNode(
          `Stars ${repos.stargazers_count}`
        );

        // Add Stars Count Text To Stars Span
        starsSpan.appendChild(starsText);

        // Append Stars Count Span To Main Div
        mainDiv.appendChild(starsSpan);

        // Add Class On Main Div
        mainDiv.className = "repo-box";

        // Append The Main Div To Container
        reposData.appendChild(mainDiv);
      });
    } catch {
      reposData.innerHTML = `<span>Error :- wrong Github Username !</span>`;
      console.log(Error("api not found"));
    }
  } else {
    reposData.innerHTML = `<span>Please Write Github Username</span>`;
  }
}

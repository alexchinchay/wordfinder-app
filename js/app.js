import { getPhonetic, getMeanings, getUrl, catchError } from "./functions.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const contentSection = document.getElementById("content");
const loader = document.getElementById("loader");

searchBtn.addEventListener("click", () => {
  loader.classList.toggle("active");
  contentSection.innerHTML = "";
  handlerInput();
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loader.classList.toggle("active");
    contentSection.innerHTML = "";
    handlerInput();
  }
});

function handlerInput() {
  let word = searchInput.value.toLowerCase();
  if (word === "" || !isNaN(word)) {
    alert("Enter a valid word, please.");
    loader.classList.toggle("active");
  } else {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const nouns = data[0].meanings[0] || null;
        const verb = data[0].meanings[1] || null;
        const adjective = data[0].meanings[2] || null;

        contentSection.appendChild(getPhonetic(data[0]));

        if (nouns) contentSection.appendChild(getMeanings(nouns));

        if (verb) contentSection.appendChild(getMeanings(verb));

        if (adjective) contentSection.appendChild(getMeanings(adjective));

        const URL = getUrl(data[0]);
        contentSection.appendChild(URL);
        loader.classList.toggle("active");
      })
      .catch(() => {
        contentSection.appendChild(catchError(word));
        loader.classList.toggle("active");
      });

    searchInput.value = "";
  }
}

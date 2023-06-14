function getPhonetic({ phonetic, word }) {
  const [phoneticHeader, h2, span, fragment] = [
    document.createElement("header"),
    document.createElement("h2"),
    document.createElement("span"),
    document.createDocumentFragment(),
  ];

  h2.textContent = word;
  span.textContent = phonetic;
  span.setAttribute("class", "phonetic");

  addElements(phoneticHeader, [h2, span]);
  fragment.appendChild(phoneticHeader);

  return fragment;
}

function getMeanings({ antonyms, definitions, partOfSpeech, synonyms }) {
  const [fragment, article, div, ul, p, synonymsList, antonymsList] = [
    document.createDocumentFragment(),
    document.createElement("article"),
    document.createElement("div"),
    document.createElement("ul"),
    document.createElement("p"),
    document.createElement("div"),
    document.createElement("div"),
  ];

  synonymsList.setAttribute("class", "specialWords");
  antonymsList.setAttribute("class", "specialWords");

  div.setAttribute("class", "titleContainer");
  div.innerHTML = `
      <h3 class="title">${partOfSpeech}</h3>
      <div class="line"></div>
    `;
  p.textContent = "Meaning";
  p.setAttribute("class", "meaning");

  if (definitions.length > 0) {
    definitions.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ${item.definition}
          <span class="example">${item.example || ""}</span>
        `;
      ul.appendChild(li);
    });
  }

  if (synonyms.length > 0)
    synonymsList.appendChild(getSA(synonyms, "Synonyms"));
  if (antonyms.length > 0)
    antonymsList.appendChild(getSA(antonyms, "Antonyms"));

  addElements(article, [div, p, ul, synonymsList, antonymsList]);
  fragment.appendChild(article);
  return fragment;
}

function getSA(arr, type) {
  const [fragment, typeOfWord] = [
    document.createDocumentFragment(),
    document.createElement("p"),
  ];

  typeOfWord.setAttribute("class", "typeOfWord");
  typeOfWord.textContent = type;
  fragment.appendChild(typeOfWord);

  arr.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.setAttribute("class", "word");
    fragment.appendChild(span);
  });

  return fragment;
}

function getUrl({ sourceUrls }) {
  const [fragment, footer] = [
    document.createDocumentFragment(),
    document.createElement("footer"),
  ];
  footer.setAttribute("class", "footerSection");

  footer.innerHTML = `
      <span class="source">
        Source
        <a href="${sourceUrls[0]}" target="_blank">${sourceUrls[0]}<i class="fa-solid fa-up-right-from-square"></i></a>
      </span>
    `;

  fragment.appendChild(footer);
  return fragment;
}

function catchError(word) {
  const [fragment, divErrorContainer] = [
    document.createDocumentFragment(),
    document.createElement("div"),
  ];

  divErrorContainer.setAttribute("class", "errorContainer");

  divErrorContainer.innerHTML = `
      <p class="errorPhrase">Oops! We're sorry.<br>
      We couldn't find any result for: <span class="errorWord">"${word}"</span>.</p>
  
      <p class="try">Try to:</p>
      <ul class="errorList">
        <li>Check the orthography.</li>
        <li>Make sure you are writing in English.</li>
        <li>Check your internet connection.</li>
      </ul>
  
      <img class="errorImg" src="res/error.jpg" alt="An error has ocurred">
    `;

  fragment.appendChild(divErrorContainer);
  return fragment;
}

function addElements(parent, children) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(children[i]);
  }
}

export { getPhonetic, getMeanings, getUrl, catchError };

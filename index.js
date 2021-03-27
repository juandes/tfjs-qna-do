let model;

// The text field containing the input text
let inputText;

// The text field containing the question
let questionText;

// The div where we will write the model's answer
let answersOutput;

// Sample texts. Taken from Wikipedia.
const teslaText = `Nikola Tesla (/ˈtɛslə/;[2] Serbo-Croatian: [nǐkola têsla]; Serbian Cyrillic: Никола Тесла;[a] 10
July 1856 – 7 January 1943) was a Serbian-American[4][5][6] inventor, electrical engineer, mechanical engineer,
and futurist who is best known for his contributions to the design of the modern alternating current (AC)
electricity supply system.[7] <br/>

Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a
degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the
new electric power industry. He emigrated in 1884 to the United States, where he would become a naturalized
citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own.
With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to
develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related
polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and
became the cornerstone of the polyphase system which that company would eventually market.<br/>

Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with
mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a
wireless-controlled boat, one of the first ever exhibited. Tesla became well known as an inventor and would
demonstrate his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at
public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless
electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado
Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla
tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental
wireless communication and power transmitter, but ran out of funding before he could complete it.[8]<br/>

After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of
success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills.
He died in New York City in January 1943.[9] Tesla's work fell into relative obscurity following his death, until
1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in
his honor.[10] There has been a resurgence in popular interest in Tesla since the 1990s.[11]
`;

const doText = `DigitalOcean, Inc. is an American cloud infrastructure provider[2] headquartered in New York City with data centers worldwide.[3] 
DigitalOcean provides developers cloud services that help to deploy and scale applications that run simultaneously on multiple computers.
DigitalOcean also runs Hacktoberfest which is a month-long celebration (October 1-31) of open source software run in partnership with GitHub and Twilio.
`;

const pikachuText = `Pikachu[c] is a species of Pokémon, fictional creatures that appear in an assortment of media of the Pokémon franchise by The Pokémon Company. 
Pikachu is a yellow mouse-like Pokémon with powerful electrical abilities. In most vocalized appearances, including the anime and certain video games, it is primarily voiced by Ikue Ōtani. 
A Pikachu also appears as part of the main cast in the live-action animated film Pokémon Detective Pikachu, played in CGI and voiced by Ryan Reynolds.

Pikachu's design was conceived by Atsuko Nishida and finalized by Ken Sugimori.[2] Pikachu first appeared in Pokémon Red and Green in Japan, and later in the first internationally released Pokémon video games, Pokémon Red and Blue, for the Game Boy.

Pikachu is the best-known species of Pokémon, largely due to its appearance in the anime series as the starter Pokémon of the protagonist, Ash Ketchum. 
Pikachu is a major character of the Pokémon franchise as well as its mascot, and has become an icon of Japanese pop culture in recent years, as well as one of the major mascots for Nintendo. 
`;

// This function creates a button and append it to a HTML element.
function createButton(innerText, id, listener, selector, disabled = false) {
  const btn = document.createElement('BUTTON');
  btn.innerText = innerText;
  btn.id = id;
  btn.disabled = disabled;

  btn.addEventListener('click', listener);
  document.querySelector(selector).appendChild(btn);
}

function setupButtons() {
  // Button to predict
  createButton('Answer!', 'answer-btn',
    async () => {
      model.findAnswers(questionText.value, inputText.value).then((answers) => {
        // Write the answers to the output div as an unordered list.
        // It uses map create a new list of the answers while adding the list tags.
        // Then, we use join to concatenate the answers as an array with a line break
        // between answers.
        const answersList = answers.map((answer) => `<li>${answer.text} (confidence: ${answer.score})</li>`)
          .join('<br>');

        answersOutput.innerHTML = `<ul>${answersList}</ul>`;
      }).catch((e) => console.log(e));
    }, '#answer-button', true);

  createButton('Tesla', 'test-case-tesla-btn',
    () => {
      document.getElementById('input-text').value = teslaText;
    }, '#test-buttons', false);

  createButton('DigitalOcean', 'test-case-do-btn',
    () => {
      document.getElementById('input-text').value = doText;
    }, '#test-buttons', false);

  createButton('Pikachu', 'test-case-pikachu-btn',
    () => {
      document.getElementById('input-text').value = pikachuText;
    }, '#test-buttons', false);
}

async function init() {
  setupButtons();
  answersOutput = document.getElementById('answer');
  inputText = document.getElementById('input-text');
  questionText = document.getElementById('question');

  model = await qna.load();
  document.getElementById('answer-btn').disabled = false;
}

init();

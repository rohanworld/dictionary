const input = document.getElementById('input');
const search_btn = document.getElementById('search_btn');
const apiKey = '2799ccf7-700b-4cb0-a22e-b79f759f9718';
const not_found = document.querySelector('.not_found');
const defination_box = document.querySelector('.def');

search_btn.addEventListener('click', e => {
    e.preventDefault();

    const word = input.value;
    if (word === "") {
        alert('Please type a word');
        return;
    }

    dataGet(word);
    not_found.innerText = "";
    defination_box.innerText = "";
});

async function dataGet(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=2799ccf7-700b-4cb0-a22e-b79f759f9718`);
    const data = await response.json();
    console.log(data);

    if (!data.length) {
        not_found.innerText = 'No result found';
        return;
    }

    if (typeof data[0] === 'string') { // if result is suggestions
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        not_found.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        })
        return;
    }

    let defination = data[0].shortdef[0];
    defination_box.innerText = defination;
}
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search_btn").click();
    }
    });
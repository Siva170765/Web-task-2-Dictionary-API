// get all the references
// search form reference
let form = document.querySelector('.dictform');

// input box -> search box
let wordInput = document.querySelector('.wordinput');

// word info div
let wordInfo = document.querySelector('.meaningforward');

// get the reference of the button
let searchButton = document.querySelector('.searchButton');


// getmeaning function
async function getmeaning(word) {
    // make a api request with the word
    try {

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        // get the meaning
        // parse the json to js object
        let data = await response.json();

        // show the details below the input box
        // create a paragraph
        let paragraph = document.createElement('p');

        // reset the wordInfo
        wordInfo.innerHTML = '';
        console.log(data)

       

       

        // get the audio data
        let audioSource=[];

        for(let i=0;i<data[0].phonetics.length;i++){
            let audio=data[0].phonetics[i].audio
            if(audio.length>0){
                audioSource.push(data[0].phonetics[i].audio)
              
            }
        }

        // set the content of the paragraph element
        paragraph.innerHTML = `
        <span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
            <source src=${audioSource[0]} type='audio/mpeg'>
        </audio>
        Word: <b>${data[0].word}</b>`;

        // append the created paragraph to the wordInfo
        wordInfo.appendChild(paragraph);

        document.querySelector('.audio-icon').addEventListener('click', event => {
            document.querySelector('.audio').play();
        });

        // create a list
        let list = document.createElement('ul');
        list.style.listStyleType = 'none';

        let meanings = data[0].meanings;

        for (let meaning of meanings) {
            // create a list item
            let listItem = document.createElement('li');

            // set the content of the list item
            listItem.innerHTML = `${meaning.partOfSpeech}`;

            // create a sublist to display the meanings in every 
            // category
            let subList = document.createElement('ul');
            subList.style.listStyleType = 'disc';

            // get the definitions
            let definitions = meaning.definitions;

            for (let definition of definitions) {
                // create a list item
                let subListItem = document.createElement('li');

                // set the content of the list item
                subListItem.innerHTML = `<em>${definition.definition}</em>`;

                // append the list item to the list
                subList.appendChild(subListItem);
            }

            listItem.appendChild(subList);
            // append the list item to the list
            list.appendChild(listItem);
        }

        wordInfo.appendChild(list);

        

    } catch (error) {
        console.error('error fetching the meaning of the word');

       wordInfo.innerHTML=`
       <p>"Data not found"</p> <br>
       <p>"Sorry pal, we couldn't find definitions for the word you were looking for."</p><br>
       <p>"You can try the search again at later time"</p>
       `
    }
}

function handleSubmit(event) {
    event.preventDefault();

    let word = wordInput.value;

    // make a api request to get the meaning
    // of the word
    // and show it below the input box
    getmeaning(word);
}

form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit);
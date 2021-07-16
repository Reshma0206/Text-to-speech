//Init speechSynthesis API

var synth = window.speechSynthesis;
//DOM elements

const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')
const volume = document.querySelector('#volume')
const volumeValue = document.querySelector('#volume-value')
const icon = document.querySelector('.whole-icon');
icon.style.display = "none";


//Init voices array

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    //Loop through the voices and create an option for each one
    voices.forEach(voice => {

        //create option element 
        var option = document.createElement('option');
        //Fill option with name and language of the voice 
        option.textContent = voice.name + '(' + voice.lang + ')';

        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }
        //set needed option Attributes

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })

}


populateVoiceList();

// wait on voices to be loaded before fetching list

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

function speak() {

    //check if speaking 
    if (synth.speaking) {
        console.error("Already speaking");
        return;
    }
    if (textInput.value !== '') {

        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        console.log(speakText.pitch);

        //speak end 
        speakText.onend = e => {
            console.log("Done speaking...");
            icon.style.display = "none";

        }
        //speak error 
        speakText.onerror = e => {
            console.log("Something Went Wrong!")
        }
        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        
        //loop through the voices 
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })


        //set pitch and rate
        speakText.pitch = pitch.value;
        speakText.volume = volume.value;

        speakText.rate = rate.value;
        //Add background animation
        icon.style.display = "block";
        synth.speak(speakText);

    }
}

//Event listeners 

//Text form submit 

textForm.onsubmit = function (event) {
    event.preventDefault();
    speak();
    textInput.blur();
}

//Rate value change

rate.onchange = function () {
    rateValue.textContent = rate.value;
}

//pitch value change
pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
}

//volume value change
volume.onchange = function () {
    volumeValue.textContent = volume.value;
    
}


//voice select change 
voiceSelect.onchange = function () {
    speak();
}
//init Speech API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];
const getVoices = () => {
voices = synth.getVoices();
//Loop thourgh voices and option for each one
voices.forEach(voice=>{
    //create option element
    const option = document.createElement('option');
    //Fill option with voices and languages
    option.textContent = voice.name + '('+ voice.lang +')';
    //Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name',voice.name);
    voiceSelect.appendChild(option);
    });
}

if(synth.onvoiceschanged !== undefined){
synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {

//check if speaking
if (synth.speaking) {
    console.error('Already speaking...');
    return;
}
if (textInput.value !== '' ) {
    //Add background animtaion
    body.style.background = '#141414 url(../img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak end
    speakText.onend = e => {
        console.log('Done speaking....');
        body.style.background = '#141414';
    }

    //Speak error
    speakText.onerror = (e) =>{
        console.error("Somerthing went wrong");
    }

    //Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop thourgh voices
    voices.forEach(voice=>{
        if(voice.name === selectedVoice){
            speakText.voice = voice;
        }
    });

    //Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText);
}
};

/*Event Listeners*/
//Text form submit
textForm.addEventListener('submit', e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change
rate.addEventListener('change',(e)=>{
rateValue.textContent = rate.value;
});

//Pitch value change
pitch.addEventListener('change',(e)=>{
    pitchValue.textContent = pitch.value;
    });
    

//Voice selet change
voiceSelect.addEventListener('change',e => speak());
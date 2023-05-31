// Your script here.
 const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Fetch the available voices and populate the dropdown
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // Set the voice for speech synthesis
  function setVoice() {
    const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
    msg.voice = selectedVoice;
    toggleSpeakButton();
  }

  // Start speaking
  function speak() {
    speechSynthesis.cancel(); // Cancel any ongoing speech
    msg.text = document.querySelector('[name="text"]').value;
    speechSynthesis.speak(msg);
  }

  // Stop speaking
  function stop() {
    speechSynthesis.cancel();
  }

  // Toggle the availability of the speak button based on voice selection and text content
  function toggleSpeakButton() {
    speakButton.disabled = !msg.voice || !msg.text;
  }

  // Event listeners
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', () => {
    msg[option.name] = option.value;
    toggleSpeakButton();
  }));
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);
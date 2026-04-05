export function speakWithSpelling(name: string, hindi: string) {
  window.speechSynthesis.cancel();

  const wordUtterance = new SpeechSynthesisUtterance(name);
  wordUtterance.rate = 0.85;
  wordUtterance.pitch = 1.2;

  const letters = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("");
  const spellingUtterances = letters.map((letter) => {
    const u = new SpeechSynthesisUtterance(letter);
    u.rate = 0.7;
    u.pitch = 1.3;
    return u;
  });

  const hindiUtterance = new SpeechSynthesisUtterance(hindi);
  hindiUtterance.rate = 0.8;
  hindiUtterance.pitch = 1.1;
  hindiUtterance.lang = "hi-IN";

  wordUtterance.onend = () => {
    let idx = 0;
    const speakNext = () => {
      if (idx < spellingUtterances.length) {
        spellingUtterances[idx].onend = speakNext;
        window.speechSynthesis.speak(spellingUtterances[idx]);
        idx++;
      } else {
        window.speechSynthesis.speak(hindiUtterance);
      }
    };
    speakNext();
  };

  window.speechSynthesis.speak(wordUtterance);
}

export function speakWord(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  u.pitch = 1.2;
  window.speechSynthesis.speak(u);
}

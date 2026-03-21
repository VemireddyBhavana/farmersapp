// Mapping of languages to BCP-47 codes
const langMap: Record<string, string> = {
  'English': 'en-IN',
  'Hindi': 'hi-IN',
  'Telugu': 'te-IN',
  'Tamil': 'ta-IN',
  'Marathi': 'mr-IN',
  'Gujarati': 'gu-IN',
  'Kannada': 'kn-IN',
  'Malayalam': 'ml-IN',
  'Punjabi': 'pa-IN',
  'Bangla': 'bn-IN'
};

export const speakText = (text: string, language: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langMap[language] || 'en-IN';
  utterance.rate = 0.9;
  
  window.speechSynthesis.speak(utterance);
};

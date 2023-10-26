document.addEventListener('DOMContentLoaded', function() {
    var translateButton = document.getElementById('translateButton');
    var saveButton = document.getElementById('saveButton');
  
    translateButton.addEventListener('click', function() {
      // Implement translation logic here
    });
  
    saveButton.addEventListener('click', function() {
      // Implement saving logic here
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    var translateButton = document.getElementById('translateButton');
    var saveButton = document.getElementById('saveButton');
    var wordElement = document.getElementById('word');
  
    // Function to translate a selected word or phrase
    function translateSelectedText() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (selectedText) => {
            // You can customize the translation API you want to use here
            // This example uses Google Translate
            // You'll need to replace 'YOUR_API_KEY' with an actual API key
            const apiKey = 'YOUR_API_KEY';
            const targetLanguage = 'fr'; // Target language (French)
  
            fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
              method: 'POST',
              body: JSON.stringify({
                q: selectedText,
                source: 'auto',
                target: targetLanguage,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                const translatedText = data.data.translations[0].translatedText;
                // Send the translated text to the popup
                chrome.runtime.sendMessage({ translation: translatedText });
              })
              .catch((error) => {
                console.error('Translation error:', error);
              });
          },
          args: [window.getSelection().toString()],
        });
      });
    }
  
    // Function to save a word or phrase for future learning
    function saveWordForLearning(word) {
      // You can use the Chrome storage API to save the word here
      // For this example, let's just display an alert
      alert('Saved: ' + word);
    }
  
    translateButton.addEventListener('click', translateSelectedText);
  
    saveButton.addEventListener('click', function() {
      const selectedWord = wordElement.textContent.trim();
      if (selectedWord) {
        saveWordForLearning(selectedWord);
      }
    });
  
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.selectedText) {
        // Display the selected text in the popup
        wordElement.textContent = request.selectedText;
      }
    });
  });
  
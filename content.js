// content.js

// Function to send the selected text to the extension popup
function sendSelectedText(selectedText) {
    chrome.runtime.sendMessage({ selectedText });
  }
  
  // Listen for text selection on the page
  document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText.length > 0) {
      sendSelectedText(selectedText);
    }
  });
  
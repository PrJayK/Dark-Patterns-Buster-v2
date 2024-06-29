// content.js

// Function to extract text content and their IDs
function extractTexts() {
    // Select all elements in the document
    let allElements = document.querySelectorAll('*:not(script):not(noscript):not(style):not(br):not(img):not(option)');

    let textData = [];

    allElements.forEach((element, index) => {
        let id = element.id;
        let text = '';

        // Iterate through child nodes
        element.childNodes.forEach(node => {
            // Check if it's a text node and exclude whitespace nodes
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                text += node.nodeValue.trim() + ' ';
            }
        });

        // Remove trailing whitespace and log the result
        text = text.trim();

        if(text) {
            if (!id) {
                // If element doesn't have an id, generate a unique id
                id = `generated-id-${index + 1}`; // Example: generated-id-1, generated-id-2, etc.
                element.id = id; // Assign the generated id to the element
            }
        
            // Create an object with id and text properties
            let entry = { id: id, text: text };
    
            // Push the entry object into the textData array
            textData.push(entry);
        }
    });

    return textData;
}

  
// Listener for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_TEXT') {
        let textData = extractTexts();
        sendResponse({ textData: textData });
    } else if (message.type === 'HIGHLIGHT_TEXTS') {
        message.ids.forEach(id => {
            let element = document.getElementById(id);
            if (element) {
                element.style.backgroundColor = 'red';
            }
        });
    }
});
  
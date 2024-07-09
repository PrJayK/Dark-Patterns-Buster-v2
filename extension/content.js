// content.js
const css = `
.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1000; /* Ensure the tooltip is on top */
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none; /* Disable pointer events to avoid blocking interactions */
}

.tooltip-visible {
  visibility: visible;
  opacity: 1;
}
`;

const style = document.createElement('style');
style.textContent = css;

document.head.appendChild(style);


function extractTexts() {
    let allElements = document.querySelectorAll('*:not(script):not(noscript):not(style):not(br):not(img):not(option)');

    let textData = [];

    allElements.forEach((element, index) => {
        let id = element.id;
        let text = '';

        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                text += node.nodeValue.trim() + ' ';
            }
        });

        text = text.trim();

        if(text) {
            if (!id) {
                id = `generated-id-${index + 1}`;
                element.id = id;
            }
        
            let entry = { id: id, text: text };
    
            textData.push(entry);
        }
    });

    return textData;
}

  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_TEXT') {
        let textData = extractTexts();
        sendResponse({ textData: textData });
    } else if (message.type === 'HIGHLIGHT_TEXTS') {
        let c = 0;
        message.ids.forEach(darkElement => {
            let element = document.getElementById(darkElement.id);
            if (element) {
                element.style.backgroundColor = 'red';
                let tooltiptext = '';
                if(darkElement.svm_prediction !== 'Not Dark Pattern') {
                    tooltiptext = darkElement.svm_prediction;
                } else {
                    tooltiptext = darkElement.random_forest_prediction;
                }

                // Create the tooltip text element
                let tooltipText = document.createElement('span');
                tooltipText.className = 'tooltiptext';
                tooltipText.textContent = tooltiptext;
                document.body.appendChild(tooltipText);

                // Event listener to show tooltip on hover
                element.addEventListener('mouseenter', () => {
                    const rect = element.getBoundingClientRect();
                    tooltipText.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                    tooltipText.style.top = `${rect.top + window.scrollY - tooltipText.offsetHeight}px`;
                    tooltipText.classList.add('tooltip-visible');
                });

                // Event listener to hide tooltip when not hovering
                element.addEventListener('mouseleave', () => {
                    tooltipText.classList.remove('tooltip-visible');
                });
        
            }
            c++;
        });
        console.log(c);
    }
});
  
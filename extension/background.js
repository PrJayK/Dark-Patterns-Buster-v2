// background.js

// chrome.action.onClicked.addListener((tab) => {
// 	chrome.scripting.executeScript({
// 		target: { tabId: tab.id },
// 		files: ['content.js']
// 	});

// 	chrome.tabs.sendMessage(tab.id, { type: 'GET_TEXT' }, (response) => {
// 		fetch('http://localhost:3000/check_dark_patterns', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ texts: response.texts })
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_TEXTS', ids: data.darkPatternIds });
// 		})
// 		.catch(error => console.error('Error:', error));
// 	});
// });
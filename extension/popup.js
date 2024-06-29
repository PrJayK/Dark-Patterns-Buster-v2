document.getElementById('highlight-dark-patterns').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true },async (tabs) => {
		await chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			files: ['content.js']
		});

		await chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_TEXT' }, (response) => {
			fetch('http://localhost:3000/check_dark_patterns', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ texts: response.textData })
			})
			.then(res => res.json())
			.then(data => {
				chrome.tabs.sendMessage(tabs[0].id, { type: 'HIGHLIGHT_TEXTS', ids: data.darkPatternIds });
			})
			.catch(error => console.error('Error:', error));
		});
    });
});
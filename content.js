let data = document.body.textContent;
chrome.runtime.sendMessage({message: data});

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-dark-mode') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
      const url = new URL(tab.url);
      const domain = url.hostname;
      
      // Toggle dark mode for this domain
      chrome.storage.sync.get(['darkModeSites'], function(result) {
        const darkModeSites = result.darkModeSites || {};
        const currentState = darkModeSites[domain] || false;
        const newState = !currentState;
        
        darkModeSites[domain] = newState;
        chrome.storage.sync.set({ darkModeSites: darkModeSites }, function() {
          // Update icon
          updateIcon(tab.id, newState);
          
          // Send message to content script
          chrome.tabs.sendMessage(tab.id, {action: 'toggleDarkMode', enabled: newState})
            .catch(error => {
              // If content script isn't loaded, inject it
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
              }).then(() => {
                chrome.tabs.sendMessage(tab.id, {action: 'toggleDarkMode', enabled: newState});
              });
            });
        });
      });
    });
  }
});

// Update icon when tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      const url = new URL(tab.url);
      const domain = url.hostname;
      
      chrome.storage.sync.get(['darkModeSites'], function(result) {
        const darkModeSites = result.darkModeSites || {};
        const isEnabled = darkModeSites[domain] || false;
        updateIcon(activeInfo.tabId, isEnabled);
      });
    }
  });
});

// Update icon when tab URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    const domain = url.hostname;
    
    chrome.storage.sync.get(['darkModeSites'], function(result) {
      const darkModeSites = result.darkModeSites || {};
      const isEnabled = darkModeSites[domain] || false;
      updateIcon(tabId, isEnabled);
    });
  }
});

// Function to update the extension icon
function updateIcon(tabId, isEnabled) {
  const iconPath = isEnabled ? 'images/icon-active' : 'images/icon';
  
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      16: `${iconPath}16.png`,
      48: `${iconPath}48.png`,
      128: `${iconPath}128.png`
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleDarkMode');
  
  // Get current tab's domain and check its dark mode state
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;
    
    // Check current state for this domain
    chrome.storage.sync.get(['darkModeSites'], function(result) {
      const darkModeSites = result.darkModeSites || {};
      const isEnabled = darkModeSites[domain] || false;
      updateButtonText(isEnabled);
    });
    
    // Toggle dark mode when button is clicked
    toggleButton.addEventListener('click', function() {
      chrome.storage.sync.get(['darkModeSites'], function(result) {
        const darkModeSites = result.darkModeSites || {};
        const currentState = darkModeSites[domain] || false;
        const newState = !currentState;
        
        // Update storage for this domain
        darkModeSites[domain] = newState;
        chrome.storage.sync.set({ darkModeSites: darkModeSites }, function() {
          updateButtonText(newState);
          
          // Update extension icon
          const iconPath = newState ? 'images/icon-active' : 'images/icon';
          chrome.action.setIcon({
            tabId: tabs[0].id,
            path: {
              16: `${iconPath}16.png`,
              48: `${iconPath}48.png`,
              128: `${iconPath}128.png`
            }
          });
          
          // Send message to content script to toggle dark mode
          chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleDarkMode', enabled: newState})
            .catch(error => {
              // If content script isn't loaded, inject it manually
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
              }).then(() => {
                // Try sending the message again after injection
                chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleDarkMode', enabled: newState});
              });
            });
        });
      });
    });
  });
  
  function updateButtonText(isEnabled) {
    toggleButton.textContent = isEnabled ? 'Disable Dark Mode' : 'Enable Dark Mode';
    // Change button color based on state
    if (isEnabled) {
      toggleButton.style.backgroundColor = '#2196F3'; // Blue when active
    } else {
      toggleButton.style.backgroundColor = '#4CAF50'; // Green when inactive
    }
  }
});

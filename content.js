// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleDarkMode') {
    toggleDarkMode(request.enabled);
  }
});

// Check if dark mode is enabled for this domain when page loads
const currentDomain = window.location.hostname;
chrome.storage.sync.get(['darkModeSites'], function(result) {
  const darkModeSites = result.darkModeSites || {};
  if (darkModeSites[currentDomain]) {
    toggleDarkMode(true);
  }
});

function toggleDarkMode(enable) {
  if (enable) {
    // Create style element if it doesn't exist
    if (!document.getElementById('dark-mode-style')) {
      const style = document.createElement('style');
      style.id = 'dark-mode-style';
      style.textContent = `
        html {
          filter: invert(1) hue-rotate(180deg) !important;
          background-color: #fff !important;
        }
        
        /* Revert inversion for images, videos, and iframes */
        img, video, iframe, [style*="background-image"] {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        
        /* Handle SVGs and icons */
        svg, [class*="icon"], [class*="Icon"] {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    // Remove the style element if it exists
    const styleElement = document.getElementById('dark-mode-style');
    if (styleElement) {
      styleElement.remove();
    }
  }
}

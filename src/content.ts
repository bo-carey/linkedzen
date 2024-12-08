import { debounce, logger } from './utils/general';
import { hideSponsoredMessages } from './utils/messages';

logger.debug('content script loaded');

function setupMessagingObserver(retryDelay = 0) {
  setTimeout(() => {
    logger.debug('attempting messaging observer setup');
    // Setup Message Observer
    const messagingContainer = document.querySelector<HTMLDivElement>(
      'aside div.msg-overlay-list-bubble'
    );
    if (!messagingContainer) {
      logger.debug('messaging container not found, retrying...');
      setupMessagingObserver(retryDelay + 100);
      return;
    }
    const observer = new MutationObserver(debounce(hideSponsoredMessages, 100));
    observer.observe(messagingContainer, { childList: true, subtree: true });

    logger.debug('messaging observer setup complete');

    // Clean up the observer when the page is unloaded
    window.addEventListener('unload', () => {
      logger.debug('unloading messaging observer');
      observer.disconnect();
    });
  }, retryDelay);
}

if (document.readyState === 'loading') {
  logger.debug('waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', () => setupMessagingObserver());
} else {
  logger.debug('DOM already loaded');
  setupMessagingObserver();
}

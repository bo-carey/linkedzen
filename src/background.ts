import { logger } from './utils/general';

let isEnabledByDefault = false;

browser.storage.sync.get().then((settings) => {
  logger.debug('settings', settings);
  isEnabledByDefault = settings.enabled;
});

const handleActionClick = async (tab: browser.tabs.Tab) => {
  logger.debug('handleActionClick -> checking storage', {
    sync: await browser.storage.sync.get(),
    session: await browser.storage.session.get(),
  });
  if (tab.id === undefined) {
    logger.error('handleActionClick: Tab ID not found');
    return;
  }

  const sessionData = await browser.storage.session.get(tab.id.toString());
  let enabled = sessionData[tab.id.toString()]?.enabled;
  logger.debug('handleActionClick:tab', tab.id, { enabled });

  if (enabled !== undefined) {
    enabled = !enabled;
    isEnabledByDefault = enabled;
  } else {
    enabled = !isEnabledByDefault;
  }

  handleStateChange(tab, enabled);
};

const handleStateChange = async (tab: browser.tabs.Tab, enabled: boolean) => {
  if (tab.id === undefined) {
    logger.error('handleStateChange: Tab ID not found');
    return;
  }
  logger.debug('handleStateChange:tab', tab.id, { enabled });

  browser.storage.session.set({ [tab.id.toString()]: { enabled } });
  browser.storage.sync.set({ enabled });

  logger.debug('setting icon', { enabled });
  browser.action.setIcon({
    path: {
      16: enabled ? 'icons/logo-16.png' : 'icons/disabled-16.png',
      32: enabled ? 'icons/logo-32.png' : 'icons/disabled-32.png',
      48: enabled ? 'icons/logo-48.png' : 'icons/disabled-48.png',
      128: enabled ? 'icons/logo-128.png' : 'icons/disabled-128.png',
      512: enabled ? 'icons/logo-512.png' : 'icons/disabled-512.png',
    },
  });

  if (enabled) {
    logger.debug('handleStateChange:enabled', tab.id);
    browser.scripting
      .insertCSS({
        target: { allFrames: true, tabId: tab.id },
        files: ['css/hide-all.css'],
      })
      .catch((error) => {
        logger.error('handleStateChange:insertCSS', tab.id, error);
      });
  }
  if (!enabled) {
    logger.debug('handleStateChange:disabled', tab.id);
    browser.scripting
      .removeCSS({
        target: { allFrames: true, tabId: tab.id },
        files: ['css/hide-all.css'],
      })
      .catch((error) => {
        logger.error('handleStateChange:removeCSS', tab.id, error);
      });
  }
};

browser.action.onClicked.addListener(function handleClick(tab) {
  handleActionClick(tab);
});

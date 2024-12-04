/**
 * This file is not currently being used. extension.config.ts is not supported by extension-js yet.
 * extension.config.js is only experimentally supported.
 *
 * This file is being used as a guideline for the eventual extension.config.ts file.
 *
 * You can use a custom .env file to set your binary paths and development target.
 * This can help if you are getting errors due to missing browsers.
 * WSL users can use their Windows binary paths by setting the environment variables in the .env file to
 * something like /mnt/c/Program Files/Google/Chrome/Application/chrome.exe
 */

import { FileConfig } from 'extension';

const chromiumBinary = process.env.CHROMIUM_BINARY;
const firefoxBinary = process.env.FIREFOX_BINARY;
const devTarget = process.env.DEV_TARGET || 'chrome';

function buildConfig() {
  console.log('Generating extension config...');

  const extensionConfig: FileConfig = {
    browser: {
      chrome: {
        browser: 'chrome',
        startingUrl: 'https://www.linkedin.com/feed/',
      },
      firefox: {
        browser: 'firefox',
        startingUrl: 'https://www.linkedin.com/feed/',
      },
    },
    config: (config) => ({
      ...config,
      cache: false,
    }),
  };

  if (chromiumBinary) {
    console.log('Chromium binary found:', chromiumBinary);
    extensionConfig.browser!.chrome!.chromiumBinary = chromiumBinary;
  } else {
    console.log('Using default Chromium binary.');
  }

  if (firefoxBinary) {
    console.log('Firefox binary found:', firefoxBinary);
    extensionConfig.browser!.firefox!.geckoBinary = firefoxBinary;
  } else {
    console.log('Using default Firefox binary.');
  }

  if (devTarget === 'firefox') {
    console.log(
      'Development target is Firefox. Adding Firefox build commands.'
    );
    extensionConfig.commands!.build = {
      browser: 'firefox',
      zip: true,
      polyfill: true,
      zipFilename: 'linkedzen.zip',
    };
  }

  console.log('Generated extension configuration:', extensionConfig);
  return extensionConfig;
}

export default buildConfig();

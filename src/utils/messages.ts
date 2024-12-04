import { logger } from './general';

export const hideSponsoredMessages = () => {
  logger.debug('hideSponsoredMessages');
  let count = 0;
  const messages = document.querySelectorAll<HTMLDivElement>(
    'div.msg-overlay-list-bubble__convo-card-content-wrapper'
  );
  messages.forEach((message) => {
    const messageText = message.textContent;
    const spamHeaders = ['Sponsored', 'InMail', 'via LinkedIn'];
    if (spamHeaders.some((header) => messageText?.includes(header))) {
      const entryPoint = message.closest<HTMLDivElement>('div.entry-point');
      if (entryPoint) {
        count++;
        entryPoint.classList.add('linkedzen-hide');
      }
    }
  });
  logger.debug(`hideSponsoredMessages: ${count} messages hidden`);
};

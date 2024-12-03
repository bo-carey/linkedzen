// Messages cleanup
// We just want to hide the sponsored messages for now.
// In the future, we will add an option to automatically move sponsored messages and inmails to other
// folders or delete them.

function getMessages() {
  return document.querySelectorAll<HTMLDivElement>('div.msg-overlay-list-bubble__convo-card-content-wrapper');
}

const hideSponsoredMessages = () => {
  const messages = getMessages();
  messages.forEach((message) => {
    const messageText = message.textContent;
    const spamHeaders = ['Sponsored', 'InMail', 'via LinkedIn'];
    if (spamHeaders.some((header) => messageText?.includes(header))) {
      const entryPoint = message.closest<HTMLDivElement>('div.entry-point');
      if (entryPoint) entryPoint.style.display = 'none';
    }
  });
};

const observer = new MutationObserver(hideSponsoredMessages);
observer.observe(document.body, { childList: true, subtree: true });
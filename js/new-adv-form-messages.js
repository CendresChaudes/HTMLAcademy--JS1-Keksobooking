const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onMessageModalClick = (evt) => {
  if ((evt.target.closest('.success') || evt.target.closest('.error')) && !evt.target.closest('.error__button')) {
    closeMessage();
  }
};

const onMessageButtonClick = () => closeMessage();

const addMessageListeners = (type) => {
  document.body.addEventListener('keydown', onDocumentKeydown);
  document.querySelector(`.${type}`).addEventListener('click', onMessageModalClick);

  if (type === 'error') {
    document.querySelector(`.${type}__button`).addEventListener('click', onMessageButtonClick);
  }
};

const removeDocumentListener = () => document.body.addEventListener('keydown', onDocumentKeydown);

const createSuccessMessage = () => document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const renderSuccessMessage = () => {
  document.body.append(createSuccessMessage());
  addMessageListeners('success');
};

const createErrorMessage = () => document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const renderErrorMessage = () => {
  document.body.append(createErrorMessage());
  addMessageListeners('error');
};

function closeMessage() {
  removeDocumentListener();

  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
}

export { renderSuccessMessage, renderErrorMessage };

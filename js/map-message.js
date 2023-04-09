const ERROR_MESSAGE = 'Не удалось загрузить данные!';
const ERROR_MESSAGE_SHOW_TIME = 5000;

const createErrorMessage = () => {
  const errorMessage = document.createElement('div');
  errorMessage.style.zIndex = '100';
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = '0';
  errorMessage.style.top = '0';
  errorMessage.style.right = '0';
  errorMessage.style.padding = '10px';
  errorMessage.style.fontSize = '20px';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.backgroundColor = 'red';
  errorMessage.textContent = ERROR_MESSAGE;

  document.body.append(errorMessage);

  setTimeout(() => errorMessage.remove(), ERROR_MESSAGE_SHOW_TIME);
};

export { createErrorMessage };
